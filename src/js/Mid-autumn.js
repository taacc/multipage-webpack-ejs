/*
 * @Description: 中秋节活动
 * @Author: Tovi
 * @Date: 2020-01-04 15:51:57
 * @LastEditTime: 2020-04-03 17:47:24
 * @LastEditors: Tovi
 */
import '../css/Mid-autumn.less'
import HTTP from '../utils/HTTP.js'
const debug = process.env.NODE_ENV !== 'production';
// import Activity from  '../class/Activity.js'
import {getDebounce} from '../utils/utils'

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
class MidAutumn extends Activity {
    constructor($){
        super();
        this.$ = $;
        this.activityData = '';
        this.dataList =  [];
        this.lottery =  {
          count :  0, //抽奖次数
          index :  0, //选中的开始位置
          speed :  50, //初始化加速度
          prize :  "", //奖品位置
          rotation :  5, //旋转圈数
          nowcount :  0, //当前变化位置
          play :  true, //开始抽奖
          dsq :  "", //定时器
        };
        this.showLottery= false;
        this.getGoodsList= [];
        this.showResult= [false, false,false]; //第一个表示抽中的礼品 第二个表示谢谢参与 第三个表示没有抽奖机会
        this.getname= "";
        this.canRoll= "";
        this.remainCount= "";
        this.conWelfareText= "";  
        this.init();
    }
    /**
     * @Description: 初始化
     * @Author: Tovi
     * @return: void
     */
    init(){
        console.log('MidAutumn init')
        this.receiveMessage(this.receive());
        this.App();
    }
    /**
     * @Description: 初始化转盘
     * @Author: Tovi
     * @return: void
     */
    _getChance() {
        this.madeRandomPrize();
        this.dataList = this.activityData.baseVO.eventAwardList;
        this.canRoll = this.activityData.baseVO.flag;
        this.remainCount = this.activityData.baseVO.count;
        this.$('.start-icon').html(this.remainCount)
        // let layerCout = JSON.parse(sessionStorage.getItem('midLayerCount'))
        // if(layerCout){
        //  this.remainCount = layerCout.count
        //  console.log(this.remainCount,'reamincount')
        //  this.canRoll = layerCout.flag
        // }else{
        //   this.canRoll = this.activityData.baseVO.flag
        // }
        let html = '';
        this.dataList.forEach((item,index) => {
            html += `
            <div class="gift-part gift-part${index}">
              <img class="gift-img" src="${this.activityData.imagePath}/${item.iconPath}" >
            </div>
            `
        })
        this.$('.gift-contain').html(html);
        this.renderGoodList();
    }
    /**
     * @Description: 点击抽奖
     * @Author: Tovi
     * @return: Function
     */
    startRoll() {
        return () => {
            if (!this.canRoll) {
                this.showResult=[false,false,true];
                this.setResultState(this.showResult);
                return;
            }
            if (!this.lottery.play) {
                return;
            }
            getDebounce(this,this.excuteSquare(), 500);
        }
    }
    excuteSquare(){
        return () => {
            let options = {
                'eventInfo': {
                    'id': this.activityData.eventInfo.id
                },
                'clientType': '2'
            }
            this.lottery.play = false;
            this.excuteEvent(options).then(result => {
                if (result.message === "Success" && result.status === "200") {
                this.lottery.prize = result.data.eventVO.baseVO.eventAward.groups; //返回的抽奖坐标
                this.getname = result.data.eventVO.baseVO.eventAward.title; //获取抽中的奖品
                this.$('.tip-des').eq(0).html(`
                    <span>You’ve won ${this.getname}!</span>
                    <span>Share the luck with your lady!</span>
                `)
                this.canDraw = result.data.eventVO.baseVO.flag; //表示是否还有抽奖机会
                this.remainCount = result.data.eventVO.baseVO.count;
                this.$('.start-icon').html(this.remainCount);
                this.lottery.count = this.lottery.prize + this.lottery.rotation * 10;
                this.timeout(50);
                let midData = {
                    'count': result.data.eventVO.baseVO.count,
                    'flag': result.data.eventVO.baseVO.flag
                }
                this.dispatch('midActivityCount',midData)
                //Bus.$emit('midActivityCount', midData) //向中秋节横幅传递剩余抽奖次数
                }
                if (result.status == 500 && result.errorCode == "EVENT1006") { //表示没有剩余抽奖次数
                    this.showResult=[false,false,true];
                    this.setResultState(this.showResult);
                    this.remainCount = 0
                    sessionStorage.setItem('midLayerCount', JSON.stringify({
                        'count': 0
                    })); //在九宫格中显示剩余抽奖次数
                    // Bus.$emit('midActivityCount') //重新渲染online页面横幅4
                    this.sendMessage('midActivityCount');
                    this.dispatch('midActivityCount')
                }
                if (result.status == 500 && result.errorCode == "EVENT1007") { //表示活动已过期
                    this.$refs.conWelfare.show()
                    this.conWelfareText = result.message
                    // Bus.$emit('midActivityCount') //重新渲染online页面横幅
                    this.dispatch('midActivityCount')
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    timeout(time) {
        this.lottery.dsq = setTimeout(() => {
          this.lottery.nowcount++;
          this.$('.gift-part' + this.lottery.index).addClass('active').siblings().removeClass('active');
          this.lottery.index++;
          if (this.lottery.nowcount == this.lottery.count) { //抽中奖后  清除数据
            clearTimeout(this.lottery.dsq);
            this.lottery.dsq = null;
            this.lottery.speed = 50;
            this.lottery.nowcount = 0;
            this.lottery.count = 0;
            this.lottery.rotation = 5;
            this.lottery.index = 0;
            this.canRoll=this.canDraw;
            setTimeout(() => {
              if (this.lottery.prize == 7) {
                this.showResult=[false,true,false];
                this.setResultState(this.showResult)
              } else if (this.lottery.prize == "") {
                this.showResult=[false,false,true];
                this.setResultState(this.showResult)
              } else {
                this.showResult=[true,false,false];
                this.setResultState(this.showResult)
              }
              this.lottery.prize = "";
              this.lottery.play = true;

            }, 200)
            return;
          }
          if (this.lottery.index == 10) {
            this.lottery.index = 0;
            this.lottery.rotation--;
          }
          if (this.lottery.rotation < 2) {
            this.lottery.speed += 10;
          }
          this.timeout(this.lottery.speed);
        }, time)
    }
    /**
     * @Description: 更新结果状态
     * @Author: Tovi
     * @return: void
     */
    setResultState(state = []) {
        if(!state){
            return;
        }
        const self = this;
        this.$('.obt-mask').each(function(index){
            if(state[index]){
                self.$(this).show();
            }else{
                self.$(this).hide();
            }
        })
        // this.$('.obt-mask').eq(state.findIndex(item => item)).show().siblings().hide();
    }
    /**
     * @Description: 渲染获奖名单
     * @Author: Tovi
     * @return: void
     */
    renderGoodList(){
        let html = '';
        this.getGoodsList.forEach(item => {
            html += `
            <div class="mar-con">
                ${item.createDateStr}<span class="mar-text">M${item.memberNo}****${item.lastNo}</span>${item.awardTitle}
            </div>`
        })
        this.$('marquee').html(html)
    }
    /**
     * @Description: 生成1~9的随机数(用于拼接男士编号)
     * @Author: Tovi
     * @return: String
     */
    memberNum() {
        return Math.ceil(Math.random() * 1000000000 % 9).toString();
    }
    /**
     * @Description: 生成获奖礼物
     * @Author: Tovi
     * @return: String
     */
    gift() {
        const toMap = (arr,num) => {
            let giftMap = {};
            arr.forEach((item,index) => {
                giftMap[index] = item
            })
            return giftMap[num - 1];
        }
        const giftList = [
            ' got ' + 3 + ' Credits.',
            ' got ' + 5 + ' Video Vouchers.',
            ' got ' + 3 + ' -Day VIP.',
            ' got ' + 2 + ' Photo Vouchers.',
            ' got ' + Math.floor(Math.random() * 2 + 2) + ' Chat Vouchers.',
            ' got ' + 10 + ' Credits.',
            ' got 1-Month VIP.',
            ' got ' + 5 + ' Credits.',
            ' got ' + 7 + ' -Day VIP.',
            ' got ' + 5 + ' -Day VIP.'
        ]
        let num = Math.floor(Math.random() * 11 + 1);
        if (num === 11) {
            const giftList2 = [
                ' got $30 Cash Coupon.',
                ' got 100 Credits.',
                ' got Mooncake Gift Set.'
            ];
            let num2 = Math.floor(Math.random() * 50 + 1);
            return toMap(giftList2 , num2) || ' got 5 Credits.';
        }
        return toMap(giftList , num);
    }
    /**     
     * @Description: 随机中奖名单
     * @Author: Tovi
     * @return: void
     */
    madeRandomPrize() {
        const date = new Date();
        const nowDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        for (let i = 0; i < 30; i++) {
          let cur = {
            'createDateStr': nowDate,
            'memberNo': this.memberNum(),
            'lastNo': this.memberNum(),
            'awardTitle': this.gift()
          }
          this.getGoodsList.push(cur);
        };
    }
    /**
     * @Description: 接收postMessage传值
     * @Author: Tovi
     * @return: void
     */
    receive(){
        return (e)=>{
            let data = e.data;
            if(data.source === 'http://m.wpdev.com') {
                this.activityData = data.activityData;
                this._getChance();
            }
        }
    }
    /**
     * @Description: 入口函数
     * @Author: Tovi
     * @return: void
     */
    App(){
        const self = this;
        // 初始化一些事件
        this.$('.draw-lottery').on('click', this.startRoll());
        this.$('.close-btn').on('click',function(){
            self.$('.obt-mask').eq(self.$(this).attr('closeTip')).hide();
        });
        this.$('.join-btn , .rule-btn').on('click',()=>{
            console.log('111')
            this.dispatch('goPurchase')
        })
    }
}
new MidAutumn($);