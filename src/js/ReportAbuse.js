/*
 * @Description: reportAbuse
 * @Author: Tovi
 * @Date: 2020-03-04 15:34:21
 * @LastEditTime: 2020-04-29 10:24:09
 * @LastEditors: Tovi
 */
import data from '../mock/reportAbuse';
import '../css/help-center.less';
import { compiler } from '../utils/help-center-compiler';
import { message } from '../utils/msgPackage';
const App = ($) => {
    let html = compiler(data);
    $('#ReportAbuse').html(html);

    // 处理高度让transition生效
    $('.item-answer').each(function() {
        // padding 获取错误 +10
        $(this).attr('h',$(this).outerHeight() + 10);
        $(this).attr('style','height:0');
        // toogleHeight($(this));
    })
    $('.item-title').on('click',function() {
        toogleHeight($(this).next());
    })
    $('[reportAbuse]').on('click',function() {
        message.send({path:'ReportAbuse',param:{}})
    })
    function toogleHeight(target) {
        // target.parent().toggleClass('item-show');
        if(target.height() === 0) {
            target.attr('style',`height:${target.attr('h')}px`);
            target.parent().addClass('item-show');
            return;
        }
        target.attr('style','height:0');
        target.parent().removeClass('item-show');
    }
}
App($);