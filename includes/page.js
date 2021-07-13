module.exports = (data) => {

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ data.shortURL }</title>
    <style>
      
      main,
      header,
      footer {
        text-align: center;
      }
      
      img {
        width: 80%;
        margin: 3em auto;
      }

      main {
        
      }
    .dest {
      color:#666;
    }

    </style
  </head>
  <body>
    <header>
      <h1><a href="${ data.shortURL }">${ data.shortURL }</a></h1>
    </header>    
    <main>
      <img src='data:image/svg+xml;utf8,${ data.svg }'>
      <a class="dest" href="${ data.destinationURL }">${ data.destinationURL }</a>
    </main>
    <footer>
      A URL shortener made with Netlify Redirects by <a href="https://twitter.com/philhawksworth">Phil Hawksworth</a>. Read how to make your own in <a href="https://findthat.at">this blog post</a>
    </footer>
  </body>
  </html>`;

}
