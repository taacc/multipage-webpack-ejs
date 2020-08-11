/*
 * @Description: Prime Member 会员介绍
 * @Author: Tovi
 * @Date: 2020-03-10 11:57:01
 * @LastEditTime: 2020-04-29 10:31:32
 * @LastEditors: Tovi
 */
import '../css/PrimeMember.less';
import data from '../mock/primeMemberMock';
import yesIcon from '../assets/image/PrimeMember/icon_yes.png'
import noIcon from '../assets/image/PrimeMember/icon_no.png'
import { message } from '../utils/msgPackage';
const App = ($) => {
    const renderTag = () => {
        let html = '';
        data.forEach(item => {
            html += `
                <div class="member-line comm-pd bg-white">
                    <span class="member-item tb-pd15">${item.itemTitle}</span>
                    <span class="member-item tb-pd15 ">
                        <img src="${item.primeHas ? yesIcon : noIcon}" alt="">
                    </span>
                    <span class="member-item tb-pd15">
                        <img src="${item.freeHas ? yesIcon : noIcon}" alt="">
                    </span>
                </div>
            `
        })
        $('#memberCon').html(html)
    }
    renderTag();
    $('#toPurchaseCredits').on('click',() => {
        message.send({path:'Recharge',param:{}})
    })
}   
App($);
