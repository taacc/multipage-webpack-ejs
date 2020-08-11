/*
 * @Description: HelpCenter
 * @Author: Tovi
 * @Date: 2020-03-16 10:30:26
 * @LastEditTime: 2020-05-08 11:00:48
 * @LastEditors: Tovi
 */
import '../css/help-center.less';
import { message } from '../utils/msgPackage';
const App = ($) => {
        $('.list>li').each(function() {
            $(this).on('click',function () {
                skipTo($(this));
            })
        })
        function skipTo(obj) {
            const skipList = ['TermsOfUse','PrivacyPolicy','SafetyTips','Faq','ReportAbuse','AboutUs',()=> {
                message.send({
                    path:'ContactUs'
                })
            }];
            const target = skipList[obj.index()];
            if(typeof target === 'function') {
                target();
                return;
            }
            location.href = `${location.protocol}//${location.host}/h/static/pages/${target}.html`;
        }

}
App($);