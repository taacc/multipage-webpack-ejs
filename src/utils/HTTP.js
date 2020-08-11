/*
 * @Description: HTTP封装
 * @Author: Tovi
 * @Date: 2020-01-07 10:02:38
 * @LastEditTime: 2020-03-20 16:58:23
 * @LastEditors: Tovi
 */
const NODE_ENV = process.env.NODE_ENV;
const config = require('../config/app-config.js');
const config_item = config[NODE_ENV];

// if(config_item.isUseHttps){
//     config_item.apiHost = 'https://' + config_item.apiHost
// }else{
//     config_item.apiHost = 'http://' + config_item.apiHost
// }
export default class HTTP {
    constructor(){
        this.options = {}
    }
    /**
     * @Description: ajax 方法
     * @Author: Tovi
     * @return: Promise
     */
    $ajax(options){ 
        return new Promise((resolve,reject)=>{
            this.options.type = options.type || "GET",
            this.options.url = options.url || "",
            this.options.async = options.async || "true",
            this.options.data = options.data || null,
            this.options.dataType = options.dataType || "text",
            this.options.contentType = options.contentType || "application/json; charset=utf-8",
            this.options.beforeSend = options.beforeSend || function(){},
            this.options.requestType = options.requestType || 'json',
            // this.options.success = options.success || function(){},
            // this.options.error = options.error || function(){}
            this.sendAjax(this.options,resolve,reject);
        })
    }
    /**
     * @Description: 发送ajax请求
     * @Author: Tovi
     * @return: void
     */
    sendAjax(ajaxData,resolve,reject){
        const xhr = this.createxmlHttpRequest();
        let contentType = ajaxData.contentType;
        let methods = ajaxData.type.toUpperCase();
        let token = ajaxData.data.token ? ajaxData.data.token : '';
        delete ajaxData.data.token;
        if(methods === 'GET'){
            ajaxData.url += '?' + this.convertData(ajaxData.data)
            ajaxData.data = null
        }
        if(methods === 'POST'){
            if(ajaxData.requestType === 'formData'){
                ajaxData.data = this.convertData(ajaxData.data)
                contentType = 'application/x-www-form-urlencoded';
            }else{
                ajaxData.data = JSON.stringify(ajaxData.data)
            }
        }
        xhr.responseType=ajaxData.dataType;
        xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
        ajaxData.beforeSend(xhr);
        xhr.setRequestHeader("Content-Type",contentType);
        xhr.setRequestHeader("Accept",'application/json, text/plain, */*, application/json');
        xhr.setRequestHeader("enable-token",1)
        // xhr.setRequestHeader("authorization",data.token);
        xhr.setRequestHeader("authorization",token);
        xhr.setRequestHeader("Cache-Control",'no-cache');
        xhr.setRequestHeader("X-Requested-With",'XMLHttpRequest');
        xhr.withCredentials = true;
        xhr.send(ajaxData.data)

        // xhr.send(this.convertData(ajaxData.data)); 
        xhr.onreadystatechange = () => {
            try{
                if (xhr.readyState == 4) {
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(JSON.parse(xhr.response));
                    }
                }
            }catch(error) {
                console.error(error);
            }

        }
    }
    /**
     * @Description: 格式化参数
     * @Author: Tovi
     * @return: String
     */
    convertData(data){
        if( typeof data === 'object' ){
            let convertResult = "" ;
            for(let c in data){
                convertResult+= c + "=" + data[c] + "&"; 
            }
            convertResult=convertResult.substring(0,convertResult.length-1)
            return convertResult;
        }else{
            return data;
        }
    }
    /**
     * @Description: 处理IE兼容
     * @Author: Tovi
     * @return: XMLHttpRequest
     */
    createxmlHttpRequest() {
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP"); 
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
}