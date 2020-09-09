/**
 * 发邮件 工具类
 * xuess
 * 2018年03月29日 修改
 */

const nodemailer = require('nodemailer');//发邮件
const moment = require("moment"); //日期
const fu = require('./fu.js'); //文件操作
const { emailName , emailPassword ,toEmail } = require('../config.js'); //配置
const { ascii2native } = require('./utils'); //工具类


const transporter = nodemailer.createTransport({
	//https://nodemailer.com/smtp/well-known/ 支持列表
	//https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json 配置
	//126 邮箱参考 https://cnodejs.org/topic/55629a8a8f294e213d10b8e7
	host: "smtp.126.com",
    secureConnection: true, 
    port: 465, 
	auth: {
		user: emailName,
		pass: emailPassword
	}
});


/**
 * 发邮件 带截图
 * @param {Object} title 标题
 * @param {Object} text 内容
 */
function sendMailForImage(text) {
	//今天日期
	let now = moment();
	let today = now.clone().add(0, 'days').format('YYYY-MM-DD');
	//	let today = moment().format('LL');

	//图片路径
	let imgPath = [];

	//查找 TODO 这里路径要写 当前 有点this 作用域的问题。 上层调用的
	fu.each('./screenshot/smzdm', function(item) {
		imgPath.push(item);
	});
	//查找 TODO 这里路径要写 当前 有点this 作用域的问题。 上层调用的
	fu.each('./screenshot/tf8', function(item) {
		imgPath.push(item);
	});
	
	let attachmentsList = [],
		htmlImg = '';
	
		console.log('process.cwd()',process.cwd());
	//数字不能用 直接用i ，会造成只能发十个，到第十一个 就是第一个图了
	for(let i = 0; i < imgPath.length; i++) {
		htmlImg += `<h2>${imgPath[i].filename}</h2><br/><img src="cid:img${i+123}" id="img${i+123}" style="width:375px;"><br /><hr /><br />`;
		let temp = {
			filename: imgPath[i].filename, //图片名称
			// path: process.cwd() + "/screenshot/" + imgPath[i], //图片来源
			path: imgPath[i].name, //图片来源
			cid: `img${i + 123}` //插入图片标识
		};
		attachmentsList.push(temp);
	}

	let html = `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><br/>
		你好:<br/>
		&nbsp;&nbsp;下面为【浏览器签到】日报汇报（${today}）的内容<br />
		${htmlImg}	
	`;

	//邮件内容选项设定
	let mailOptions = {
		from: `自己 <${emailName}>`, // 发件地址
		to: toEmail, // 收件列表
		cc: '', //抄送人
		bcc: '', //密抄送人
		subject: `【浏览器签到】日报汇报（${today}）`, //邮件主题
		text: `【浏览器签到】日报汇报（${today}）`, // plaintext body
		html: html, //html内容
		attachments: attachmentsList
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if(error) {
			return console.log(error);
		}
		console.log(`今天是${today},签到日报已发!  ---   Message sent: ${info.response}`);
	});
}

/**
 * 发邮件 错误信息
 * @param {Object} title 标题
 * @param {Object} errStr 内容
 */
function sendMailErr(title, errStr) {

	let now = moment();
	let today = now.clone().add(0, 'days').format('YYYY-MM-DD');

	let html = `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><br/>
		${title} <br />
		${errStr}<br />
		`;

	//邮件内容选项设定
	let mailOptions = {
		from: `自己 <${emailName}>`, // 发件地址
		to: toEmail, // 收件列表
		cc: '', //抄送人
		bcc: '', //密抄送人
		subject: `${title}（${today}）`, //邮件主题
		text: `${title}（${today}）`, // plaintext body
		html: html //html内容
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if(error) {
			return console.log(error);
		}
		console.log(`今天是${today},错误信息已发!  ---   Message sent: ${info.response}`);
	});
}

module.exports = {
	sendMailForImage,
	sendMailErr
};