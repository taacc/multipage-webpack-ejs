/*
 * @Description: faq
 * @Author: Tovi
 * @Date: 2020-03-04 11:10:10
 * @LastEditTime: 2020-05-07 14:22:43
 * @LastEditors: Tovi
 */
import data from '../mock/faqMock';
import { faqCompiler } from '../utils/help-center-compiler';
import { message } from '../utils/msgPackage';
import BigImg from '../components/bigImg/bigImg';
import MaskTip from '../components/mask-tips/mask-tips';
import exampleSrc from '../assets/image/faq/example.jpg';
import {IMBRA_DOWNLOAD_URL , IMBRA_DOWNLOAD_URL_ROMANCE_MEET} from '../config/api-config';
import { getBaseInfo } from '../API/API';
const App = ($) => {
    const html = faqCompiler(data);
    let isVerify = false;
    let isLoad = false;
    let email = '';
    message.listen();
    message.on('token',(token) => {
        getBaseInfo({token:token}).then(res => {
            console.log(res,'resresres')
            if (res.message === "Success" && res.status === "200") {
                isVerify = res.data.isVerify;
                email = res.data.currentMember.email;
                isLoad = true;
            }
        });
    })

    $('#Faq').html(html);
    // 处理高度让transition生效
    $('.c-item-answer').each(function() {
        // padding 获取错误 +10
        $(this).attr('h',$(this).outerHeight() + 10);
        $(this).attr('style','height:0');
        // toogleHeight($(this));
    })
    $('.c-item-title').on('click',function() {
        toogleHeight($(this).next());
    })

    $('[data-action]').each(function() {
        $(this).on('click',function(){
            const fn = action($(this).data('action'), message);
            fn();
        })
    })
    $('[goVerify]').on('click',function(){
        if(isLoad) {
            isVerify === 'Y' ? message.send({path:'EditEmail',param:{email,isVerify}}) : 
            message.send({path:'VerifyEmail',param:{email,isVerify}});
        }
    })
    $('[letter]').on('click',function(){
        message.send({path:'Letter',param:{}})
    })
    $('[online]').on('click',function(){
        message.send({path:'Home',param:{}})
    })
    $('[privacy-policy]').on('click',function(){
        location.href = `${location.protocol}//${location.host}/h/static/pages/PrivacyPolicy.html`;
    })
    $('[changepassword]').on('click',function() {
        message.send({path:'ChangePassword',param:{}})
    })
    $('[customerService]').on('click',function() {
        message.send({path:'Consultation',param:{}})
    })
    $('[gift]').on('click',function() {
        // message.send({path:'Gift',param:{}})
        alert('Coming soon');
    })
    function toogleHeight(target) {
        // target.parent().toggleClass('item-show');
        if(target.height() === 0) {
            target.attr('style',`height:${target.attr('h')}px`);
            target.parent().addClass('c-item-show');
            return;
        }
        target.attr('style','height:0');
        target.parent().removeClass('c-item-show');
    }

    function action (directive , messageObj) {
        const actionFn = [
            () => {
                const maskTip = new MaskTip();
                maskTip.mount();
                setTimeout(() => {
                    maskTip.destory();
                    new BigImg({src:exampleSrc}).mount();
            },300)},
            () => messageObj.send({path:'PdfView',param :{url:IMBRA_DOWNLOAD_URL}}),
            () => alert('Coming soon'),
            () => messageObj.send({path:'PdfView',param:{url:IMBRA_DOWNLOAD_URL_ROMANCE_MEET}}),
            () => alert('Coming soon'),
        ]
        return actionFn[directive];
    }
}
App($);