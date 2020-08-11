/*
 * @Description: 入口文件
 * @Author: Tovi
 * @Date: 2019-12-31 18:32:06
 * @LastEditTime: 2020-04-29 10:29:39
 * @LastEditors: Tovi
 */
import './css/reset.less';
import fastclick from 'fastclick';
import { message } from './utils/msgPackage';
message.listen();
message.on('siteName',(val) => {
    $("[data-site]").each(function(){
        if(val) {
            $(this).html(val);
        }
    });
})
// new VConsole();
require('./utils/REM.js');
fastclick.attach(document.body);