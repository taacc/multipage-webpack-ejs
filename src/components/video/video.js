/*
 * @Description: 视频组件
 * @Author: Tovi
 * @Date: 2020-02-26 18:54:05
 * @LastEditTime: 2020-03-06 11:20:29
 * @LastEditors: Tovi
 */
import './video.less'
export default class Video {
    constructor(options) {
        if (typeof options !== 'object') {
            throw new Error(`${options} is not a Object`);
        }
        this.options = {
            src : options.src
        }
        this.element = ''
        window.addEventListener('contextmenu', function(e){
	        e.preventDefault();
		});

        this.html = `
            <section class="video-box">
                <div class="case-video">
                    <div class="close" @click="_close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div class="vid-wrapper">
                    <video class="video-con" controls preload="none" autoplay controlsList='nodownload noremote footbar'>
                        <source src="${this.options.src}" type="video/mp4" @canplay="setMaskShow" @error="setMaskShow">
                    </video>
                    </div>
                </div>
                <mask-tips title="Loading..." bgImage='loading.gif' class="mask-tips" v-show="maskShow"></mask-tips>
                <div class="video-close-btn" id="closeVideo"></div>
                <!--<div class="mask" @click.stop="_close"></div>
            </section>
        `
        // this.template = document.createDocumentFragment();
        
        // this.setTemplate(el);
        
    }
    // 定义模板
    setTemplate(fragment) {
        this.template = document.createElement('div');
        this.template.setAttribute('id','videoBox')
        this.template.innerHTML = this.html;
        // this.template.appendChild(fragment);
    }
    mount(element) {
        if(!this.checkEl()) {
            return
        }
        this.setTemplate(this.html);
        let el;
        el = document.body;
        if(element) {
            this.element = element;
            el = document.querySelector(this.element);
        }
        if(!el) {
            throw new Error(`can't not find element ${el}`);
        }
        el.appendChild(this.template);
        
        $('#closeVideo').on('click',() => {
            this.destory();
        });
        $(".video-box").on('touchmove',(e) => {
            e.preventDefault();
        })
    }
    checkEl() {
        let check = document.querySelector('#videoBox');
        return check === null
    }
    // show() {
    //     this.mount();
    // }
    destory() {
        $('#videoBox').remove();
    }
}