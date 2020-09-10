/*
 * @Descripttion: 什么值得买签到程序
 * @Author: xuess<wuniu2010@126.com>
 * @Date: 2019-06-04 18:00:15
 * @LastEditors: 午休
 * @LastEditTime: 2020-09-09 20:50:57
 */

const fu = require("./lib/fu.js"); //文件操作
const smzdm = require("./smzdm");
const schedule = require("node-schedule"); //定时器
const { getRandom, sleep } = require("./lib/utils"); //工具类
const { sendMailForImage, sendMailErr } = require("./lib/mail"); //发邮件
const { cookieListValKey } = require("./config"); //配置文件

(async () => {
  //延迟执行签到
  const setTimeSign = async (userinfo, index) => {
    // 随机
    await sleep(getRandom(100000, 300000));

    // 执行签到
    if (userinfo.type == "smzdm") {
      await smzdm(userinfo.cookies, userinfo.username);
    }

    // TODO 这里可以执行其他签到程序

    // 执行到最后一个 发送邮件 
    // TODO 这里可以执行完就发送邮件
    if (cookieListValKey.length - 1 == index) {
      // await sendMailForImage("签到截图");
      console.log("打完收工！");
    }
  };

  const doSign = async () => {
    // 删除截图目录
    await fu.delete(["./screenshot/smzdm"]);
    // 新建目录
    await fu.mkdir(["./screenshot/smzdm"]);

    try {
      // 立即执行 签到
      for (let i = 0; i < cookieListValKey.length; i++) {
        await setTimeSign(cookieListValKey[i], i);
      }
    } catch (e) {
      sendMailErr("主签到报错", e);
    }
  };

  //每天9点 30 执行 定时执行签到
  schedule.scheduleJob("40 30 9 * * *", async () => {
    await doSign();
  });

  //每天12点 10 执行 定时执行签到
  schedule.scheduleJob("30 10 12 * * *", async () => {
    await doSign();
  });

  //每天20点 10 执行 定时执行签到
  schedule.scheduleJob("30 10 20 * * *", async () => {
    await doSign();
  });

  // 立即执行
  doSign();
  // sendMailForImage("签到截图");

  //每天18点30执行 发邮件 发送签到截图
  schedule.scheduleJob("10 30 18 * * *", () => {
    //发邮件 签到截图
    sendMailForImage("签到截图");
  });
})();
