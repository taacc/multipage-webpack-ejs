/*
 * @Description: 配置项
 * @Author: Tovi
 * @Date: 2020-01-09 09:47:49
 * @LastEditTime: 2020-05-09 12:04:30
 * @LastEditors: Tovi
 */

const APP_SITE = process.env.APP_SITE
const config = {
	wp:{
		name:'whispark',
		sysType:1,
		development:{
			isUseHttps:true,
			apiHost:"m.test.whispark.com",
			// imgHost:"http://image.wpdev.com/",
			imgHost:"https://image1.test.whispark.com/",
			// chatHost:"http://chat.wpdev.com/f/sockjs/",
			// appVerUrl:"https://m.test.whispark.com/app/update.json"
		},
		test:{
			isUseHttps:true,
			apiHost:"m.test.whispark.com",
			imgHost:"https://image1.test.whispark.com/",
			// chatHost:"https://chat.test.whispark.com/f/sockjs/",
			// appVerUrl: "https://m.test.whispark.com/app/update.json",
			moniId:"913990"
		},
		production: {
			isUseHttps:true,
			apiHost:"m.whispark.com",
			imgHost:"https://image2.whispark.com/",
			// chatHost:"https://chat.whispark.com/f/sockjs/",
			// appVerUrl:"https://m.whispark.com/app/update.json",
			moniId:"913977"
		}
	},
}
module.exports = config[APP_SITE]