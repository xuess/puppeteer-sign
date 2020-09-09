/**
 * 什么值得买签到程序
 * 支持自动签到，自动评论3条，自动错误邮件提醒
 * xuess<wuniu2010@126.com>
 */

const puppeteer = require("puppeteer");
const { getRandom, sleep } = require("./lib/utils"); //工具类
const { sendMailErr } = require("./lib/mail"); //发邮件

const smzdm = async (cookiesData, userName) => {
  // const browser = await puppeteer.launch({
  //   // headless: false,
  //   slowMo: 100
  // });
  // linux 环境 执行
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    slowMo: 150
  });

  const page = await browser.newPage();

  // await page.setUserAgent(userAgent)
  await page.setViewport({
    width: 1080,
    height: 1920
  });
  await page.setCookie(...cookiesData);
  await page.once("load", () => console.log("Page loaded!"));

  try {
    await page.goto("https://www.smzdm.com/", {
      timeout: 60 * 1000,
      waitUntil: [
        "load", //等待 “load” 事件触发
        "domcontentloaded", //等待 “domcontentloaded” 事件触发
        "networkidle0", //在 500ms 内没有任何网络连接
        "networkidle2" //在 500ms 内网络连接个数不超过 2 个
      ]
    });
    // 等待元素出现
    await page.waitForSelector(".J_punch");
    // 点击
    await page.tap(".J_punch");

  } catch (error) {
    console.log("签到报错！");
    // sendMailErr(`smzdm 签到报错${userName}`, error);
  }
  //   await page.tap("#J_search_input");
  //   await page.keyboard.type("Hello World!", { delay: 100 });
  //   await page.click('.J_feed_za');
  //   await page.keyboard.type("World", { delay: 100 });

  // 签到

  console.log(userName, " 签到成功！");

  await sleep(3000);

  await page.screenshot({
    path: `./screenshot/smzdm/${userName}-sign-${new Date().Format(
      "yyyy-MM-dd"
    )}.png`
  });

  // TODO 评论
  // await page.goto("https://faxian.smzdm.com/");

  // let pageDom = await page.content();

  // let tempPostIdList = [],
  //   hrefUrl = "https://www.smzdm.com/p/14144125/",
  //   maxTime = 3;

  // let $ = cheerio.load(pageDom);

  // $(".feed-ver-title").each(function(i, e) {
  //   if (i > 20) {
  //     return false;
  //   }
  //   let href = $(e)
  //     .find("a")
  //     .eq(0)
  //     .attr("href");
  //   tempPostIdList.push(href);
  // });

  // console.log(userName, ": 候选-->", tempPostIdList);

  // for (let i = 0; i < maxTime; i++) {
  //   hrefUrl = tempPostIdList[Math.floor(Math.random() * tempPostIdList.length)];
  //   console.log(userName, ": 选择-->", hrefUrl);
  //   // 等待半小时
  //   // await sleep(getRandom(100000,300000));
  //   await sleep(getRandom(15000,25000));

  //   try {
  //     await page.goto(`${hrefUrl}#hfeeds`);
  //     await page.tap("#textareaComment");
  //     await page.keyboard.type(
  //       commitList[Math.floor(Math.random() * commitList.length)],
  //       { delay: 100 }
  //     );

  //     await page.tap("#textCommentSubmit");

  //     await sleep(15000);

  //     await page.screenshot({
  //       path: `./screenshot/smzdm/${userName}-${i}-${new Date().Format("yyyy-MM-dd")}.png`
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     maxTime++;
  //   }
  // }

  // await page.goto(`https://www.smzdm.com/p/${id.split("_")[1]}/#hfeeds`);

  // await page.tap("#textareaComment");
  // await page.keyboard.type(
  //   commitList[Math.floor(Math.random() * commitList.length)],
  //   { delay: 100 }
  // );
  // await page.tap("#textCommentSubmit");

  // await sleep(3000);

  // await page.screenshot({
  //   path: `./screenshot/smzdm/${userName}-${index}.png`
  // });
  await page.close();
  await browser.close();
};
module.exports = smzdm;
// smzdm(cookieListValKey[5].cookies, cookieListValKey[5].username);
