/*
 * @Description: AboutUs
 * @Author: Tovi
 * @Date: 2020-03-04 18:08:17
 * @LastEditTime: 2020-04-29 10:30:13
 * @LastEditors: Tovi
 */
import '../css/help-center.less'
import '../css/aboutUs.less';
import { message } from '../utils/msgPackage'
const App = ($) => {
    $("[goLiveChat]").on('click',function(){
        message.send({path:'ContactUs',param:{}})
    })
};
App($);