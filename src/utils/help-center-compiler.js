/*
 * @Description: 帮助中心解析文件forDom
 * @Author: Tovi
 * @Date: 2020-03-03 16:33:19
 * @LastEditTime: 2020-03-05 10:47:48
 * @LastEditors: Tovi
 */
function checkType (target) {
    return Object.prototype.toString.call(target);
}
function compilerDom (data) {
    let html = '';
    data.forEach(item => {
        html += `
            <li class="item" >
                <div class="item-title">
                    <h3>${item.itemTitle}</h3>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="item-answer" h="">${item.itemContent}</div>
            </li>
        `
    })
    return html
}
/**
 * @Description: 普通说明转Dom
 * @Author: Tovi
 * @return: void
 */
export function compiler (data) {
    if (checkType(data) !== '[object Object]') {
        throw new Error(`${data} is not a Object`)
    }
    let html = `
        <ul >
            ${compilerDom(data.list)}
        </ul>
    `;
    return html;
}
/**
 * @Description: faq转Dom
 * @Author: Tovi
 * @return: void
 */
export function faqCompiler (data) {
    // if (checkType(data) !== '[object Object]') {
    //     throw new Error(`${data} is not a Object`);
    // }
    let html = '';
    data.forEach(item => {
        html += `
            <div class="item">
                <h3 class="item-title-faq">${item.title}</h3>
                <ul class="item-list">
                    ${item.guide ? `<p>${item.guide}</p>` : ''}
                    ${faqInnerCompiler(item.cList)}
                </ul>
            </div>
        `
    });
    return html;
}
function faqInnerCompiler (upperData) {
    let html = '';
    upperData.forEach(item => {
        html += `
            <li class="c-item">
                <div class="c-item-title" @click.stop=" _toggle ">
                    <h3>${item.cTitle}</h3>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </div>
                <div class="c-item-answer">${item.cAnswer}</div>
            </li>
        `
    })
    return html;
}

// function itemAnswerCompiler(upperData,curData) {
//     let html = '';
//     if(upperData.title=='Romance Meet' && curData.cTitle=='How does it work?') {
//         html = `<div class="c-item-answer">
//                 Romance Meet provides you with an opportunity to scheduling your date with potential local match. When you decide to travel somewhere and meet someone local, simply submit a meeting request, choose your destination city and date, then submit your invitation.<br><br>            Our system will send out your invitation to lady members from the destination city. For lady members who are available to meet, they will confirm. And you will be notified in the “Lady Confirms” tab. <br><br> You and your lady schedule the
//               specific expected date and time to meet. Each Romance Meet order costs $150 USD. You may receive a romantic candlelight dinner or a delicate present as a love testimony. A special translation services for 1.5 hours will also be arranged for
//               you and your lady.<br><br> Once the meeting request is scheduled, a translator will help arrange and assist the meeting.<br><br> You need to undergo photo verification in order to proceed the meeting <a @click="action(0)">(Check photo sample)</a>.
//               United States citizens or residents are required to complete and upload the IMBRA personal disclosure background form <a @click="action(3)">(Download it)</a>.
//             </div>`
//     }
//     if(upperData.title=='She Calls' && curData.cTitle=='How to authorize She Calls?') {
//         html = `<div class="c-item-answer">
//               She Calls allows authorized members to initiate a call at a specified time. Please follow the below steps to make an authorization:<br/> Go to " She Calls" page and click “Authorize She Calls”, <a @click="action(4)">click here</a>,<br/> You
//               will be redirected to submit an authorization form with information including:<br/> - Lady’s ID you wish to authorize to call you.<br/> -Your time zone.<br/> - Calling period (the lady can only call you during this period).<br/> - Days the
//               member can call you (Monday to Sunday).<br/> - Your contact number.<br/> Once the authorization confirms, the authorization is complete and valid.</br>
//             </div>`
//     }
//     if(upperData.title=='Live Chat' && curData.cTitle=='How does Live Chat cost?') {
//         html = `<div class="c-item-answer">
//               Live chat is billed at 1 credit per 1 minute for text chat. Billing starts as soon as you initiate the chat or respond to an invitation.<br> Extra credits are applied for extra application:<br> Promotion Price:<br> Photos: <span class="per-credit">10 credits</span>            ----5 credits (Sending Each) / 10 credits (Viewing Each)
//               <br><span class="tipColor">Tips: Photos paid can be viewed unlimited times for free within 1 year.</span>
//               <br> Melodies: <span class="per-credit">10 credits</span> ----Free listening / 5 credits (Sending Each) <br> Virtual Gifts: <span class="per-credit">10 credits</span> ----Free viewing
//               / 5 credits (Sending Each)<br> Videos: 20 credits for viewing each
//             </div>`
//     }
//     return html === '' ? `<div class="c-item-answer">${curData.cAnswer}</div>` : html
// }