const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { cookiesData } = require("./data");

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  //   page.setUserAgent(userAgent)
  await page.setViewport({
    width: 1920,
    height: 3080
  });
  await page.setCookie(...cookiesData);
  await page.once("load", () => console.log("Page loaded!"));
  await page.goto("https://www.smzdm.com");
  //   await page.tap("#J_search_input");
  //   await page.keyboard.type("Hello World!", { delay: 100 });
  //   await page.click('.J_feed_za');
  //   await page.keyboard.type("World", { delay: 100 });

  var data = await page.content();

  let $ = cheerio.load(data);

  let id = $("#feed-main-list")
    .find("li")
    .eq(0)
    .attr("articleid");
  console.log(
    $("#feed-main-list")
      .find("li")
      .eq(0)
      .attr("articleid")
  );


  await page.goto(`https://www.smzdm.com/p/${id.split("_")[1]}/#hfeeds`);

  await page.tap("#textareaComment");
  await page.keyboard.type("又要解读的吗，。。!", { delay: 100 });
  await page.tap("#textCommentSubmit");

  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
