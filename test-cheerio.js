const cheerio = require('cheerio');
fetch('https://api.allorigins.win/raw?url=https://www.worldofshowjumping.com/en/News').then(r => r.text()).then(html => {
  const $ = cheerio.load(html);
  const articles = [];
  $('article, .news-item, .post').slice(0, 3).each((i, el) => {
     console.log($(el).text().substring(0, 50));
  });
  console.log("Found:", $('article').length, $('.news-item').length);
});
