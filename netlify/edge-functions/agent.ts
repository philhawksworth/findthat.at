import type { Config, Context } from "https://edge.netlify.com";
import page from "../og-page.js";


export default async (request: Request, context: Context) => {
  
  // The domain for this URL shortener as provided by Netlify's environment
  // or a live local URL for testing. 
  const rootDomain = context.site.url; 
  // const rootDomain = `https://test--${context.site.name}.netlify.live`;  // Running with `npm start` to access Netlify Dev Live

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
  
  if (unfurlers.some(v => agent?.includes(v))) {

    // Populate our OG page template
    // and return it as HTML
    const ogPage = page({
      site: "Findthat.at",
      title: "This user-agent is:",
      description: agent,
      original_og: `${rootDomain}/image/checking-the-user-agent.png`
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
// If something fails, just get out of the way
export const config: Config = {
  path: "/agent",
  onError: "bypass"
};
