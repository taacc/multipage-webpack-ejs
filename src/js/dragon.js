/*
 * @Description: 端午节
 * @Author: Tovi
 * @Date: 2020-01-13 16:54:55
 * @LastEditTime: 2020-04-03 17:45:52
 * @LastEditors: Tovi
 */
import HTTP from '../utils/HTTP.js'
const debug = process.env.NODE_ENV !== 'production';
// import Activity from  '../class/Activity.js';
import '../css/dragon.less';
class Activity extends HTTP {
    constructor() {
        super();
        this.origin = '';
        this.source = ''
    }
    /**
     * @Description: 查询轮盘中奖记录
     * @Author: Tovi
     * @return: Promise
     */
    showAwardList(data = {}) {
        return this.$ajax({
            // beforeSend:(xhr) => {
            //     xhr.setRequestHeader("enable-token",1)
            //     xhr.setRequestHeader("authorization",data.token);
            // },
            type : 'GET',
            url : '/front/' + 'event/manager/showAwardList',
            data,
        })
    }
    /**
     * @Description: 抽奖资格检测
     * @Author: Tovi
     * @return: Promise
     */
    checkEventDrawChance(data = {}){
        return this.$ajax({
            type : 'POST',
            url : '/front/' + 'event/manager/checkEventDrawChance',
            data,
        })
    }
    /**
     * @Description: 执行活动
     * @Author: Tovi
     * @return: Promise
     */
    excuteEvent(data = {}){
        return this.$ajax({
            type : 'POST',
            url : '/front/' + 'event/manager/excuteEvent',
            data
        })
    }
    /**
     * @Description: 文件转字符串
     * @Author: Tovi
     * @return: Promise
     */
    fileToString (data = {}){
        return this.$ajax({
            type: 'POST',
            url: '/front/' + 'event/manager/fileToString',
            data,
            requestType : 'formData'
            // contentType: 'application/json'
        });
    }

    // 接收来源信息
    receiveMessage(cb){
        console.log('-------开始监听-------')
        document.addEventListener('message',(e)=>{
            console.log(e.data,'eeeeeeeeeeeee')
            let state ;
            if(typeof e.data === 'string') {
                state = JSON.parse(e.data);
            }else {
                state = e.data;
                this.origin = state.origin;
                this.source = state.source;
            }

            cb(state);
        })
        
    }
    /**
     * @Description: 触发自定义事件
     * @Author: Tovi
     * @return: void
     */
    dispatch(event,params = {}){
        const customEvent = new CustomEvent(event,{
            detail:params
        })
        this.source.dispatchEvent(customEvent);
    }
    /**
     * @Description: 给来源返回信息
     * @Author: Tovi
     * @return: void
     */
    sendMessage(data){
        if(!this.origin){
            throw new Error('No source information');
            return ;
        }
        this.source.postMessage(data,this.origin);
    }

}

class Dragon extends Activity {
    constructor($) {
        super();
        this.$ = $;
        this.activityData = '';
        this.init();
    }
    init() {
        console.log('端午节')
        // 监听页面传值
        this.receiveMessage(this.receive());
        this.App();
    }
    /**
     * @Description: 渲染页面
     * @Author: Tovi
     * @return: void
     */
    renderPage() {
        console.log(this.activityData,'activytyData')
        const entity = {
            'filePath': this.activityData.popup.redirectUrl
        }
        this.fileToString(entity).then(res=>{
            this.$('.maskbox').html(res.data.innerPage)
        })
    }
    /**
     * @Description: 接收postmessage传值
     * @Author: Tovi
     * @return: void
     */
    receive() {
        return (e)=>{
            let data = e.data;
            if(data.source === 'http://m.wpdev.com') {
                console.log(data)
                this.activityData = data.activityData;
                this.renderPage();
            }
        }
    }
    App() {

    }
}
new Dragon($);