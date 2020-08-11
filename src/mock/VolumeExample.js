// 在volume/example页面引用的数据
let textCredit= process.env.VUE_APP_SITE === 'wp'?'70':'50';
export default Object.freeze([
    {
        title: 'ABOUT CHAT VOUCHERS',
        content: `
      <h4 style="font-weight: initial;font-size: 16px;">1). What are chat vouchers?</h4>
      <p>Chat vouchers are Whispark's special gift for gentleman members to help establishing a romantic relationship. Chat vouchers are applicable to chat service. You can initiate chat  free of charge with a new member you first try to approach. (During holidays or promotion period, the duration of voucher vary upon conditions)</p>
      <br>
      <h4 style="font-weight: initial;font-size: 16px;">2). How to obtain chat vouchers?</h4>
      <p>You may obtain free chat vouchers by registering Whispark and verifying your email address. Some of our promotional activities may also be offering free chat vouchers.</p>
      <br>
      <h4 style="font-weight: initial;font-size: 16px;">3). How do I use the chat vouchers?</h4>
      <p>When you first try to approach a new friend, the chat voucher will automatically applied and you will be able to enjoy the free conversation without a fuzz. Once the free period of one voucher ends, chatter pass or credits will be deducted thereafter.</p>
    `
    },
    {
        title: 'ABOUT VIP MEMBERSHIP',
        content: `
        <h4 style="font-weight: initial;font-size: 16px;">1). What is VIP Membership?
        </h4>
        <p>VIP Membership allows you to exchange instant messages free of charge with any lady who catches your attention with validated chatter pass, unlimited free first letters sent to all new ladies, and unlimited free first letter read from all new ladies. All other benefits are also granted with VIP Membership.
        </p>
        <br>
        <h4 style="font-weight: initial;font-size: 16px;">2). What is chatter pass and how do I use?</h4>
        <p>Upgrade to our VIP Membership, and you are able to obtain 70 chatter pass per day which allows free instant text messages for full enjoyment of the free services. Chatter pass is for text only and any add-on services are excluded. The content received and sent during chat communication will be counted in the chatter pass. When you have validated chatter pass in your account, and try to approach ladies caught your attention, free and instant conversation can be started right away. Once the limit is reached, credits will be billed thereafter. And your another ${textCredit} chatter pass will be auto-on on the following day.</p>
        `
    }
]);