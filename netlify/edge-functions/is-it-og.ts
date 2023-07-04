import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import type { Config, Context } from "https://edge.netlify.com";
import page from "../og-page.js";


// Prod domain or domain for testing with netlify dev
const rootDomain = "https://findthat.at";
// const rootDomain = "https://test--findthatat.netlify.live"; 


export default async (request: Request, context: Context) => {

  // What is being requested
  const url = new URL(request.url);

  // if the request is for an image
  // just let Netlify handle it as usual. We're done here.
  if(url.pathname.startsWith("/image/")) {
    context.log("Serve an image - ", url.pathname);
    return;
  }
  
  // User agents of referrers that we server an OG image to 
  // include these strings
  const unfurlers = [
    "slack",
    "Twitterbot",
    "LinkedInBot",
    "Mastodon",
    // "Mozilla" // for testing
  ];

  // the requesting user agent
  const agent = request.headers.get("user-agent");
    
  // if this is unfurling an OG
  // return a page with the correct OG data and image link
  if (unfurlers.some(v => agent?.includes(v))) {
    
    // get the title and description from the final destination page
    const destination = await fetch(`${rootDomain}/${url.pathname}`);
    const html = await destination.text();
    const $ = cheerio.load(html);
    const title =  $('meta[property="og:title"]').attr('content') || "";
    const description =  $('meta[property="og:description"]').attr('content') || "";
    const site =  $('meta[property="og:site_name"]').attr('content') || "";
    const og_og =  $('meta[property="og:image"]').attr('content') || "";
      
    // do we have a custom image?
    // no image? Pass the request on 
    // Twitter downgrades YouTube URLs to small cards, so let's offer 
    // a large card even if we don't have a custom OG image of our own
    const image = await fetch(`${rootDomain}/image${url.pathname}.png`);
    if((image.status == 404) && (site !== "YouTube")) {
      context.log(`No custom image for ${url.pathname}`);
      return;
    }
    
    // Populate our OG page template
    // and return it as HTML
    const ogPage = page({
      site: site,
      title: title,
      description: description,
      path: url.pathname,
      domain: rootDomain,
      original_og: site == "YouTube" ? og_og : null
    });

    return new Response(ogPage, {
      headers: { "content-type": "text/html" },
    });

    
  } else {
    // Regular link visitors can just pass by 
    // and be handled by the redirect rules
    return;
  }

};

// All requests to this domain come through here
export const config: Config = {
  path: "/*",
  onError: "bypass"
};
