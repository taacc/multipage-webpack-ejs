/*
 * @Description: 成功案例列表
 * @Author: Tovi
 * @Date: 2020-03-03 10:37:51
 * @LastEditTime: 2020-05-07 14:22:51
 * @LastEditors: Tovi
 */
import '../css/successList.less'
import { IMAGE_DOWNLOAD_PATH } from '../config/api-config'
import { caseData , definedPath} from '../mock/successCase'
import iconVideo from '../assets/image/testimonial/success_case/icon_Video.png'
import MaskTip from '../components/mask-tips/mask-tips'
import BigImg from '../components/bigImg/bigImg'
import Video from '../components/video/video';
const App = ($) => {
    const videoPath =  `${IMAGE_DOWNLOAD_PATH}/success_case/video/`;
    const renderTag = () => {
        let html = '';
        caseData.forEach(item => {
            html += `
                <div class="content">
                    <div class="top-contain">
                        <div class="top">
                            ${item.year === '2020' ? 
                            `<img class="top-img" src="${definedPath.headImagePath_2020 + item.headImg}">` 
                            : `<img class="top-img" src="${definedPath.headImagePath + item.headImg}" >`}
                            <span>${item.fromUser}</span>
                        </div>
                        ${ item.text ? `<div class="top-tip">${item.text}</div>` : ''}
                        ${ item.text ? `<div class="main-name">--${item.fromUser}</div>` : ''}
                    </div>
                    <div class="video-contain" id="video-contain">
                        ${ item.Video.length>0 ? `
                            <div class="swipe-self">
                                ${forVideoByTag(item.Video)}
                            </div>
                        ` : ''}
                        ${ item.ListImage.length>0 ? `
                            <div class="swipe-self" v-if="item.ListImage.length>0">
                                ${forImageByTag(item.ListImage)}
                            </div>  
                        ` : ''}
                    </div>
                    <div class="top-contain">
                        ${`<div class="story-name">${item.storyName}</div>`}
                    <div class="story-content">${item.story}</div>
                    <div class="story-more">Read more</div>
                </div>
                </div>
            `
        });
        $('.success-case').html(html);
    }
    renderTag();
    // 跳转详情页
    $('.story-more').on('click',function() {
        location.href = `${location.protocol}//${location.host}/h/static/pages/successDetail.html?idx=${$(this).index('.story-more')}`;
    })

    // 播放视频
    $('.swipe-video').on('click',function() {
        new Video({src:videoPath + $(this).attr('vsrc')}).mount();
    })
    $('.swipe-img').on('click',function() {
        const maskTip = new MaskTip();
        maskTip.mount();
        setTimeout(() => {
            maskTip.destory();
            new BigImg({src:$(this).attr('src')}).mount();
        },300)
    })
    // 渲染视频
    function forVideoByTag (data) {
        let html = '';
        data.forEach(item => {
            html += `
                <div class="contain-video" >
                    <img  class="swipe-video" src="${definedPath.smallImagePath + item.image}" vsrc="${item.src}">
                    <img class="start-btn" src="${iconVideo}">
                </div>
            `
        })
        return html
    }
    // 渲染图片
    function forImageByTag (data) {
        let html = '';
        data.forEach(item => {
            html += `
                ${item.year === '2020' ? `
                    <img src="${definedPath.smallImagePath_2020}${item}" class="swipe-img">
                ` : `
                    <img src="${definedPath.smallImagePath}${item}" class="swipe-img">
                `}
            `
        })
        return html;
    }
}
App($);
