/*
 * @Description: 轮盘抽奖
 * @Author: Tovi    
 * @Date: 2020-01-03 16:20:31
 * @LastEditTime: 2020-05-09 14:30:57
 * @LastEditors: Tovi
 */
import HTTP from '../utils/HTTP.js';
const debug = process.env.NODE_ENV !== 'production';
import '../css/lotter.less'
// import Activity from  '../class/Activity.js'
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

class Lotter extends Activity{
    constructor($){
        super();
        this.$ = $;
        this.activityData = '';
        this.turnplate = {
            restaraunts: [], //大转盘奖品名称
            colors: [], //大转盘奖品区块对应背景颜色
            images: [], //圆盘对应图标
            widths: "",
            outsideRadius: "", //大转盘外圆的半径
            textRadius: "", //大转盘奖品位置距离圆心的距离
            insideRadius: "", //大转盘内圆的半径
            startAngle: 0, //开始角度
            bRotate: false, //false:停止;ture:旋转
            start: 20,
            bRotate: false
        }
        this.rotate_angle = 250;
        this.arr = [245, 565, 525, 485, 445, 405, 365, 325, 285]; //中奖区域
        this.getGoodsList = "";
        this.getname = "";
        this.showMingtianChou = false;//定义今天是否抽过奖
        this.isExcute = false;
        this.start = 20;
        this.showGuoqi = false;
        this.startTime = null;
        this.overTimeTip = "";
        this.isHaveLoad = true;
        this.ishaveUserInfo = true;
        this.token = '';
        this.init();
    }
    init(){
        console.log('init')
        // 监听页面传值
        this.receiveMessage(this.receive());
        // this.receive()();
        this.setWidths();
        this.App();
    }
    setWidths(){
        this.widths = this.$(window).width()- 26;
        if(this.widths>700){//适应ipad的宽度
            this.widths=400
        }
        this.$("#minwheel").css({
            width: this.widths / 4.1,
            height: this.widths / 3.15,
            position: "absolute",
            top: (this.widths -this.widths/3.9) / 2,
            left:(this.widths -this.widths/3.9) / 2,
            // margin:"0 auto",
            "z-index": "100002"
        });
    }
    /**
     * @Description: 在画布上画出圆盘
     * @Author: Tovi
     * @return: void
     */
    drawWheel(){
        console.log('画出圆盘')
        var canvas = this.$('#wheelcanvas').get(0);
        this.widths = this.$(window).width() - 26;
        if(this.widths>700){
          this.widths=400
        }
        this.height = this.$(window).width();
        canvas.width = this.widths;
        canvas.height = this.widths;
        this.turnplate.outsideRadius = this.widths / 2 - 11;
        this.turnplate.textRadius = this.widths / 2 - 33;
        1;
        this.turnplate.insideRadius = this.widths / 2 - 400;
        var ctx = canvas.getContext("2d");
        if (canvas.getContext) {
          //根据奖品个数计算圆周角度
          var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
          //在给定矩形内清空一个矩形
          ctx.clearRect(0, 0, this.widths, this.widths);
          //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
          ctx.strokeStyle = "#ffe770";
          //font 属性设置或返回画布上文本内容的当前字体属性
          ctx.font = "bold 14px Microsoft YaHei";
          for (let i = 0; i < this.turnplate.restaraunts.length; i++) {
            var imgObj = new Image();
            imgObj.src = this.turnplate.images[i];
            //待图片加载完后，将其显示在canvas上
            var that = this;
            imgObj.onload = function() {
              //ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
              var angle = that.turnplate.startAngle + i * arc;
              ctx.fillStyle = that.turnplate.colors[i];
              ctx.beginPath();
              if (that.turnplate.insideRadius < 0) {
                that.turnplate.insideRadius = 0;
              }
              //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
              ctx.arc(
                that.widths / 2,
                that.widths / 2,
                that.turnplate.outsideRadius,
                angle,
                angle + arc,
                false
              );
              ctx.arc(
                that.widths / 2,
                that.widths / 2,
                that.turnplate.insideRadius,
                angle + arc,
                angle,
                true
              );
              ctx.stroke();
              ctx.fill();
              //锁画布(为了保存之前的画布状态)
              ctx.save();
              //改变画布文字颜色
              (i + 2) % 2
                ?
                (ctx.fillStyle = "#ff4c4c") :
                (ctx.fillStyle = "#ff4c4c");
              //----绘制奖品开始----
              var text = that.turnplate.restaraunts[i];
              var line_height = 17;
              //translate方法重新映射画布上的 (0,0) 位置
              ctx.translate(
                that.widths / 2 +
                Math.cos(angle + arc / 2) * that.turnplate.textRadius,
                that.widths / 2 +
                Math.sin(angle + arc / 2) * that.turnplate.textRadius
              );
              //rotate方法旋转当前的绘图
              ctx.rotate(angle + arc / 2 + Math.PI / 2);
              /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
              if (text.length > 13) {
                //判断字符进行换行
                var ts = text.substring(0, 12) + "||" + text.substring(12);
                var texts = ts.split("||");
                for (var j = 0; j < texts.length; j++) {
                  if (j == 0) {
                    ctx.fillText(
                      texts[j], -ctx.measureText(texts[j]).width / 2,
                      j * line_height
                    );
                  } else {
                    ctx.fillText(
                      texts[j], -ctx.measureText(texts[j]).width / 2,
                      j * line_height * 1.2
                    ); //调整行间距
                  }
                }
              } else {
                //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
              }
              ctx.drawImage(this, -20, 30); //this即是imgObj,保持图片的原始大小：470*480
              ctx.restore();
            };
          }
        }
    }
    /**
     * @Description: 获取轮盘奖品数据
     * @Author: Tovi
     * @return: void
     */
    getDataList(){
        this.activityData.baseVO.eventAwardList.forEach(item => {
          this.turnplate.restaraunts.push(item.enName);
          this.turnplate.colors.push(item.colour);
          console.log(this.activityData.imagePath)
          this.turnplate.images.push(
            this.activityData.imagePath + "/" + item.iconPath
          );
        });
        this.setWidths();
        this.drawWheel();
    }
    /**
     * @Description: 渲染获奖记录
     * @Author: Tovi
     * @return: void
     */
    renderAwardList(){
        console.log('渲染活动记录')
        if(this.getGoodsList){
            let html = '';
            this.getGoodsList.forEach(item => {
                html += `<div class="num">
                    <span>${item.memberNo}</span>
                    <span>${item.awardTitle}</span>
                    <span>${item.createDateStr}</span>
                </div>`
            })
            this.$('#re-column').html(html)
        }
    }
    /**
     * @Description: 获取记录的最新数据
     * @Author: Tovi
     * @return: void
     */
    getUserDatalist(){
        const entity = {
            "eventInfo.id" : 3,
            token:this.token
        }
        this.showAwardList(entity).then(res=>{
            if (res.status == '200') {
                console.log('res',res)
                this.getGoodsList = res.data.luckyGameEventRecordList;
                this.renderAwardList();
            }
        })
    }
    /**
     * @Description: 根据抽奖类型弹出不同弹窗
     * @Author: Tovi
     * @return: void
     */
    showDataBlick(awardType) {
        const self = this;
        this.$('.con-tip').each(function() {
            if(self.$(this).attr('awardType') == awardType) {
                if(self.$(this).find(".fon-name")){
                    self.$(this).find(".fon-name").text(self.getname)
                }
                self.$(this).show();
            }
        })
    }
    /**
     * @Description: 点击抽奖
     * @Author: Tovi
     * @return: Function
     */
    runWheel(){
        return ()=>{
            console.log('点击抽奖')
            const entity = {
                'clientType':2,
                "eventInfo" :{
                    id: 3
                },
                token: this.token
            }
            if(this._getChance()){
                sessionStorage.setItem('showWheel', JSON.stringify(true));
                if(this.isExcute) {
                    return;
                }
                this.excuteEvent(entity).then(res=>{
                    this.isExcute = true;
                    if (res.status == '200') {
                        let getnum = res.data.eventVO.baseVO.eventAward.groups - 1; //返回的抽奖坐标
                        this.getname = res.data.eventVO.baseVO.eventAward.title; //获取抽中的奖品
                        var ready = false;
                        var oH = document.getElementsByTagName("head")[0];
                        var oS = document.createElement("style");
                        oH.appendChild(oS);
                        let datanum = (1080 + this.arr[getnum]);
                        oS.innerHTML = `@keyframes rotate{from{
                            -webkit-transform:rotate(${this.start}deg);
                            -moz-transform:rotate(${this.start}deg);
                            -o-transform:rotate(${this.start}deg);
                            -ms-transform:rotate(${this.start}deg);
                            }to{
                            -webkit-transform:rotate(${datanum}deg);
                            -moz-transform:rotate(${datanum}deg);
                            -o-transform:rotate(${datanum}deg);
                            -ms-transform:rotate(${datanum}deg);
                            }};`;
                        var obj = document.getElementById("wheelcanvas");
                        this.$("#wheelcanvas").on('animationend',()=>{
                            if (ready) return;
                                ready = true;
                            if (document.getElementsByTagName("head")[2]) {
                                document.getElementsByTagName("head")[2].removeChild(oS);
                            }
                        })
                        // obj.addEventListener(
                        // "animationend",function() {
                        //     if (ready) return;
                        //         ready = true;
                        //     if (document.getElementsByTagName("head")[2]) {
                        //         document.getElementsByTagName("head")[2].removeChild(oS);
                        //     }
                        // });
                        this.rotate_angle = (3 * 360 + this.arr[getnum]);
                        // `transform:rotate(${this.rotate_angle}deg);animation:rotate 6s ease 0s 1 forwards`
                        this.$('#wheelcanvas').css({"transform":`rotate(${this.rotate_angle}deg)`,"animation":"animation:rotate 6s ease 0s 1 forwards"})
                        setTimeout(() => {
                            this.showDataBlick(res.data.eventVO.baseVO.eventAward.awardType) //根据返回类型显示不同的结果
                            this.getUserDatalist(); //重新渲染左边抽奖用户列表,查出最新数据
                            // if(!this._getChance()){
                                this.$('.promote').show();
                                this.isExcute = false;
                                this.$('#canvas').hide();
                            // }
                        }, 6000)
                    }
                    // else if(res.status == 500){
                    //             sessionStorage.removeItem('showWheel');
                    //             this.$('.promote').show();
                    //             this.showCanvas = false;
                    //             this.showMingtianChou = true;
                    // }
                }).catch(() => {
                    this.$('.promote').show();
                    this.$('#canvas').hide();
                    this.isExcute = false;
                })
            }

        }
    }
    /**
     * @Description: 接收postmessage传值
     * @Author: Tovi
     * @return: void
     */
    receive(){
        return (e)=> {
            // if(data.source === 'http://m.wpdev.com'){
                sessionStorage.removeItem('showWheel');
                console.log('获取数据 ------')
                let {token , language ,siteName ,param} = e;
                // if(!param.eventVO) {
                //     alert('没有奖品')
                // }
                this.token = token;
                this.activityData = param;
                this.activityData.imagePath = process.env.IMAGE_HOST;
                this.getDataList();
                this.getUserDatalist();
                if(!this._getChance()){
                    this.$('.promote').show();
                    this.$('#canvas').hide();
                }
            // }
        }
    }
    /**
     * @Description: 检测是否有抽奖机会
     * @Author: Tovi
     * @return: Boolean
     */
    _getChance(){
        // let haveShowWheel = JSON.parse(sessionStorage.getItem('showWheel'));
        return this.activityData.baseVO.flag;
    }
    /**
     * @Description: 入口函数
     * @Author: Tovi
     * @return: void
     */
    App(){
        const self = this;
        // 初始化一些点击事件
        this.$('.record').on('click',()=>{
            this.$('#re-list').toggle();
        })
        this.$('.close-icon').on('click',()=>{
            this.$('#re-list').hide();
        })
        this.$('#minwheel').on('click',this.runWheel())
        this.$('.tip-close').on('click',function(){
            self.$('.con-tip').eq(self.$(this).index()).hide();
        })
    }
}
new Lotter($);