/*
 * @Description: we share 公益页面
 * @Author: Tovi
 * @Date: 2020-02-26 09:27:39
 * @LastEditTime: 2020-04-21 16:35:08
 * @LastEditors: Tovi
 */
import '../css/we-share.less';
import Video from '../components/video/video'
import { IMAGE_DOWNLOAD_PATH } from '../config/api-config';
import { message } from '../utils/msgPackage';
import { loadLanguage } from '../utils/loadProperties';
import photo_1 from '../assets/image/we-share/photo_1.jpg';
import photo_2 from '../assets/image/we-share/photo_4.jpg';
const App = ($) => {
    message.listen();
    // 加载语言
    message.on('siteName',(val) => {
        loadLanguage('we_share','en_US','../assets/language/we-share/').then(() => {
            $("[data-site]").each(function(){
                if(val) {
                    $(this).html(val);  
                }
            });
        })
    });
    let photoList = [photo_1,photo_2];
    const renderTag = () => {
        let html = ``;
        photoList.forEach(item => {
            html += `
            <li class="item">
                <img src="${item}" width="173" height="102">
            </li>`
        })
        $('.photos').html(html);

    }
    
    // 渲染页面加载后的标签
    renderTag();
    // video
    const video = new Video({
        src:`${IMAGE_DOWNLOAD_PATH}/video/static/weshare/weshare_home_phone.mp4`
    })
    
    // video相关
    $('#video').on('click',()=>{
        video.mount()
    })
}
App($);