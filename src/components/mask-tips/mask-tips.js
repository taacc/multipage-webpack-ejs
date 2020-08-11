/*
 * @Description: mask tip
 * @Author: Tovi
 * @Date: 2020-02-26 19:09:16
 * @LastEditTime: 2020-03-06 14:00:20
 * @LastEditors: Tovi
 */
import './mask-tips.less';
export default class MaskTip {
    constructor (options) {
        if (typeof options !== 'object' && options !== undefined) {
            throw new Error(`${options} is not a Object`);
        }
        this.default =  {
            bgStyle: 'bg-loading',
            title: 'Loading...'
        }
        this.options = options ? Object.assign(this.default,options) : this.default
        // options ? this.options = {
        //     title : options.title ? options.title : '',
        //     bgStyle: 'bg-loading'
        // } : {}
        
        this.html = `
            <div class="mask-tips">
                <div class="mask-tips-content">
                    <div class="icon ${this.options.bgStyle}"></div>
                    <div class="title">${this.options.title}</div>
                </div>
                
                <span class="tips-close-btn" id="closeImg">X</span>
            </div>
        `
                //         <div class="prompt" v-if="Prompt && Prompt !== null">
                //     <div class="jump-text">please <span @click.stop="jumpPage">click here</span> {{Prompt}}</div>
                // </div>
    }
    // 定义模板
    setTemplate(fragment) {
        this.template = document.createElement('div');
        this.template.setAttribute('id','maskTip')
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
        $('#closeImg').on('click',() => {
            this.destory();
        });
        $(".mask-tips").on('touchmove',(e) => {
            e.preventDefault();
        })
        
    }
    checkEl() {
        let check = document.querySelector('#maskTip');
        return check === null
    }
    destory() {
        $('#maskTip').remove();
    }
    /**
     * @Description: 改变背景颜色
     * @Author: Tovi
     * @return: void
     */
    setBackground(className) {
        this.options.bgStyle = className
    }
}