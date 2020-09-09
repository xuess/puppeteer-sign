/*
 * @Descripttion:  项目配置表 
 * @Author: xuess<wuniu2010@126.com>
 * @Date: 2019-06-04 17:29:18
 * @LastEditors: 午休
 * @LastEditTime: 2020-09-09 21:02:05
 */

// email 登陆账号 如：xxxx@126.com  默认使用的是 126的邮箱登录的。可以自行配置
const emailName = 'xxxx@126.com';
// email 登陆密码
const emailPassword = '123456';

// 接收者 邮箱
const toEmail = 'xxxx@qq.com';

//用于签到的 账号信息 列表
const cookieListValKey = [
	{	
		type: 'smzdm',
		username: '账号1',
		phone: '账号1',
		// 数组类型的 cookies
		cookies: [{xxx:'xxx'}]
	},
	{	
		type: 'smzdm',
		username: '账号2',
		phone: '账号2',
		// 数组类型的 cookies
		cookies: [{xxx:'xxx'}]
	},
];


//回复列表 用于发表评论的内容
let commitList = [
	'感谢爆料，很不错啊',
	'感谢爆料，价格不错~~',
];

module.exports = {
	emailName,
	emailPassword,
	toEmail,
	cookieListValKey,
	commitList
};