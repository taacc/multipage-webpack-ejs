/*
 * @Description: 用于接收postMessage传值
 * @Author: Tovi
 * @Date: 2020-03-10 17:11:36
 * @LastEditTime: 2020-04-21 16:58:30
 * @LastEditors: Tovi
 */

/*
 * 参数定义
 *  language : 'zh' | 'en' ...
 *  siteName : 'whispark' | 'cutefate'
 *  token : string
 *  
*/
class Message {
    constructor() {
        // 参数定义
        this.params = {};
        this.evQueue = [];
        this.origin = '';
        this.source = '';
        this.allcb = null;
        // setTimeout(() => {
        //     this.sendTitleName();
        // },100)
    }
    // regist () {

    // }
    listen(){
        const notice = ()=> {
            Object.keys(this.params).forEach(name=>localStorage.setItem(name,this.params[name]));
            this.evQueue.forEach(item => {
                console.log(item,'item')
                let value = this.params[item.name];
                if(value === undefined || value === null) return;
                item.callback(value);
            })
        }
        document.addEventListener('message',(e) => {
        // window.addEventListener('message',(e) => {
            console.log(e)
            // 状态分发
            let state;
            if(typeof e.data === 'string') {
                state = JSON.parse(e.data)
            }else {
                state = e.data;
                // state = e.data.data;
                this.origin = e.origin;
                this.source = e.source;
            }
            console.log('state log:========',state)
            this.params = state;
            if(this.allcb){this.allcb(this.params);}
            notice();
            // if(this.checkOrigin(e.origin)) {

            //     // alert(e);
            //     console.log('message log ========',e)
            //     const state = e.data;
                
            // }
        })
    }
    sendTitleName() {
        let pathName = location.pathname;
        alert(pathName,'pathName')
        let result = pathName.replace(/.*pages\//,"").replace('.html',"");
        this.send({titleName:result})
    }
    /**
     * @Description: 监听一个参数变化
     * @Author: Tovi
     * @return: void
     */
    on (name,callback) {
        const value = localStorage.getItem(name);
        if(value) {
            setTimeout(()=>{
                callback(value);
            },100)
        }
        this.evQueue.push({
            name,
            callback
        })
    }
    /**
     * @Description: 校验来源
     * @Author: Tovi
     * @return: Boolean
     */
    checkOrigin() {
        return true
    }
    all (callback) {
        this.allcb = callback;
    }
    /**
     * @Description: 检测上层环境
     * @Author: Tovi
     * @return: Window
     */
    checkUpper() {
        return window.ReactNativeWebView || window.parent
    }
    send(params = {}) {
        const parent = this.checkUpper();
        console.log(parent,'parent')
        parent.postMessage(JSON.stringify(params))
    }
}
export const message = new Message();