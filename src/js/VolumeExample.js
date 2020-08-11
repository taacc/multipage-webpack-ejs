/*
 * @Description: 聊天券说明(What are Vouchers)
 * @Author: Tovi
 * @Date: 2020-03-10 10:23:53
 * @LastEditTime: 2020-03-10 11:51:03
 * @LastEditors: Tovi
 */
import '../css/VolumeExample.less'
import data from '../mock/VolumeExample'
const App = ($) => {
    const renderTag = () => {
        let html = '';
        data.forEach(item => {
            html += `
            <div class="vch-item">
                <h4 class="vch-title">${item.title}</h4>
                ${item.content}
            </div>
            `
        })
        $('#vchContent').html(html)
    }
    renderTag();
}
App($);