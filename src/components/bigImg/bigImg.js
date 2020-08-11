/*
 * @Description: 查看大图
 * @Author: Tovi
 * @Date: 2020-03-05 16:57:02
 * @LastEditTime: 2020-03-06 13:54:12
 * @LastEditors: Tovi
 */
import './bigImg.less';
export default class BigImg {
    constructor(options) {
        if (typeof options !== 'object') {
            throw new Error(`${options} is not a Object`);
        }
        this.options = {
            src : options.src
        };
        
        this.html = `
            <div class="big-img">
                <div class="big-img-inner">
                    <div class="big-img-indicators"></div>
                        <img src="${this.options.src}"/>
                </div>
                <span class="img-close-btn" id="closeImg">X</span>
            </div>
        `
    }
    // 定义模板
    setTemplate(fragment) {
        this.template = document.createElement('div');
        this.template.setAttribute('id','bigImg')
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
        $(".big-img").on('touchmove',(e) => {
            e.preventDefault();
        })
    }
    checkEl() {
        let check = document.querySelector('#bigImg');
        return check === null
    }
    destory() {
        $('#bigImg').remove();
    }
}