/*
 * @Description: 成功案例
 * @Author: Tovi
 * @Date: 2020-02-28 09:33:15
 * @LastEditTime: 2020-03-27 15:52:03
 * @LastEditors: Tovi
 */
import Video from '../components/video/video';
import '../css/testimonial.less';
import { IMAGE_DOWNLOAD_PATH } from '../config/api-config';
import swipe00 from '../assets/image/testimonial/success_case/swipe00.jpg';
import swipe01 from '../assets/image/testimonial/success_case/swipe01.png';
import swipe02 from '../assets/image/testimonial/success_case/swipe02.png';
import swipe03 from '../assets/image/testimonial/success_case/swipe03.png';
import swipe04 from '../assets/image/testimonial/success_case/swipe04.png';
import swipe05 from '../assets/image/testimonial/success_case/swipe05.png';
import swipe06 from '../assets/image/testimonial/success_case/swipe06.png';
import swipe07 from '../assets/image/testimonial/success_case/swipe07.png';
import swipe08 from '../assets/image/testimonial/success_case/swipe08.png';
import swipe09 from '../assets/image/testimonial/success_case/swipe09.png';
const App = ($) => {
    // 轮播对象
    function swipeFn () {
        let startN = 0;
        let endN = 0;
        this.setter = (start,end) => {
            startN = start;
            if(end) {
                endN = end
            }
        };
        this.requestId;
        return {
            createAnimate : (start,end) => {
                this.setter(start,end);
                let moved = false;
                if(!moved) {
                    if(startN >= endN) {
                        startN = 447;
                    }
                    moved = true;
                    this.requestId = window.requestAnimationFrame(()=>{
                        startN += 1;
                        $('#swipeBox').scrollLeft(startN);
                        moved = false;
                        createAnimate(startN,end);
                    })  
                }
            },
            removeAnimate: () => {
                window.cancelAnimationFrame(this.requestId)
                // startN = null;
                // endN = null;
                // setter = null;
            }
        }
    }
    const renderTag = () => {
        let html = '';
        let swipeImageList = [swipe07,swipe08,swipe09,swipe00,swipe01,swipe02,swipe03,swipe04,swipe05,swipe06,swipe07,swipe08,swipe09,swipe00,swipe01,swipe02];
        swipeImageList.forEach(item => {
            html += `
            <div class="swipe-box">
                <img src="${item}" class="swipe-img" >
            </div>
            `
        });
        $('#swipeWrap').html(html);
    }
    renderTag();
    const {createAnimate,removeAnimate} = new swipeFn();
    let endNum = $('#swipeWrap').width()-447;
    // 创建动画
    createAnimate(447,endNum);
    $('#swipeBox').on('touchstart' , (e) => {
        removeAnimate();
    })
    $('#swipeBox').on('touchend' , (e) => {
        createAnimate($('#swipeBox').scrollLeft(),endNum);
    })
    $('#swipeBox').on('scroll' , (e) => {
        let scrollLeft = $('#swipeBox').scrollLeft();
        if(scrollLeft === 0) {
            $('#swipeBox').scrollLeft(endNum - 447)
        }
        if(scrollLeft >= endNum) {
            $('#swipeBox').scrollLeft(447)
        }
    })
    $('.story-item').on('click',function(){
        location.href = `${location.protocol}//${location.host}/h/static/pages/successList.html`;
    })
    const video = new Video({
        src:`${IMAGE_DOWNLOAD_PATH}/success_case/video/0-1.mp4`
    })
    // video相关
    $('#video').on('click',()=>{
        video.mount();
    })
}
App($);
