/*
 * @Description: 成功案例详情
 * @Author: Tovi
 * @Date: 2020-03-03 10:41:15
 * @LastEditTime: 2020-03-06 15:02:11
 * @LastEditors: Tovi
 */
import { caseData , definedPath} from '../mock/successCase';
import { IMAGE_DOWNLOAD_PATH } from '../config/api-config'
import '../css/successDetail.less';
import iconVideo from '../assets/image/testimonial/success_case/icon_Video.png';
import MaskTip from '../components/mask-tips/mask-tips';
import BigImg from '../components/bigImg/bigImg';
import Video from '../components/video/video';
const App = ($) => {
    let index = $.query.get('idx');
    let curCase = caseData[index];  
    const videoPath =  `${IMAGE_DOWNLOAD_PATH}/success_case/video/`;
    const renderTag = () => {
        let html = '';
        // caseData.forEach(item => {
            html += `
                <div class="content">
                    <div class="top-contain">
                        <div class="top">
                            ${curCase.year === '2020' ? 
                            `<img class="top-img" src="${definedPath.headImagePath_2020 + curCase.headImg}">` 
                            : `<img class="top-img" src="${definedPath.headImagePath + curCase.headImg}" >`}
                            <span>${curCase.fromUser}</span>
                        </div>
                        ${ curCase.text ? `<div class="top-tip">${curCase.text}</div>` : ''}
                        ${ curCase.text ? `<div class="main-name">--${curCase.fromUser}</div>` : ''}
                    </div>
                    <div class="video-contain" id="video-contain">
                        ${ curCase.Video.length>0 ? `
                            <div class="swipe-self">
                                ${forVideoByTag(curCase.Video)}
                            </div>
                        ` : ''}
                        ${ curCase.ListImage.length>0 ? `
                            <div class="swipe-self">
                                ${forImageByTag(curCase.ListImage)}
                            </div>
                        ` : ''}
                    </div>
                    <div class="top-contain">
                        ${`<div class="story-name">${curCase.storyName}</div>`}
                    <div class="story-content">${curCase.story}</div>
                </div>
                </div>
            `
        // })
        $('#successDetail').html(html)
    }
    renderTag();
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
                <div class="contain-video" ">
                    <img class="swipe-video" src="${definedPath.smallImagePath + item.image}" vsrc="${item.src}">
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
        return html
    }
}
App($);