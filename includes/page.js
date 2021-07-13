module.exports = (data) => {

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ data.shortURL }</title>
    <style>
      img {
        width: 80%;
        margin: 3em auto;
      }
    </style
  </head>
  <body>
    <h1><a href="${ data.shortURL }">${ data.shortURL }</a></h1>
    <a href="${ data.destinationURL }">${ data.destinationURL }</a><h2></h2>
    <img src='data:image/svg+xml;utf8,${ data.svg }'>

    <footer>
      A URL shortener made with Netlify Redirects by <a href="https://twitter.com/philhawksworth">Phil Hawksworth</a>. Read how to make your own in <a href="https://findthat.at">this blog post</a>
    </footer>
  </body>
  </html>`;

}
