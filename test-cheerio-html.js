const cheerio = require('cheerio');
fetch('https://api.allorigins.win/raw?url=https://www.worldofshowjumping.com/en/News').then(r => r.text()).then(html => {
  console.log(html.substring(0, 1500));
  const $ = cheerio.load(html);
  console.log($('h2').text());
});
