module.exports = (data) => {

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ data.shortURL.split("://")[1] }</title>
    <style>
      
      * {
        margin:0;
        padding:0;
      }
    
      html,
      body {
        background-color: #eeeeee;
        font-family: sans-serif;
        font-size: 18px;
        line-height:1.4
      } 

      main,
      header,
      footer {
        text-align: center;
        display:block;
      }
      img {
        display:block;
        width: 60vh;
        max-width: 80%;
        margin: 3em auto;
        border-radius: 10px;
        padding: 10px;
        background-color: #fff;
      }
      h1 {
        font-size: 3em;
        padding-top: 1em;
      }
      a:link,
      a:visited {
        color: #333;
        text-decoration-color:#999999;
      }
      main {
        
      }
      .dest {
        color:#666;
        width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style
  </head>
  <body>
    <header>
      <h1><a href="${ data.shortURL }">${ data.shortURL.split("://")[1] }</a></h1>
      <a class="dest" href="${ data.destinationURL }">${ data.destinationURL }</a>
    </header>    
    <main>
      <img src='data:image/svg+xml;utf8,${ data.svg }'>
    </main>
    <footer>
      <p>
        <a href="https://findthat.at">findthat.at</a> is a URL shortener made with <a href="https://docs.netlify.com/routing/redirects/?utm_campaign=devex-ph&utm_source=findthat.at&utm_medium=blog&utm_content=redirect-mission">Netlify Redirects</a> by <a href="https://twitter.com/philhawksworth">Phil Hawksworth</a>.  
      </p>
      <p>
        Read how to <a href="https://findthat.at">make your own</a>.
      </p>
    </footer>
  </body>
  </html>`;

}
