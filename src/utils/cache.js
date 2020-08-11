/*
 * @Description: cookie封装
 * @Author: Tovi
 * @Date: 2020-01-09 10:39:17
 * @LastEditTime : 2020-01-09 10:40:12
 * @LastEditors  : Tovi
 */
// 设置cookie缓存
export const setCookie = function setCookie(cname, value, expireTimes,path='/') {
  let exdate = new Date();
  exdate.setTime(exdate.getTime() + expireTimes);
  document.cookie = `${cname}=${escape(value)};path=${path}${(expireTimes == null) ? '' : `;expires=${exdate.toGMTString()}`}`;
  console.log('cookie:' + `${cname}=${escape(value)}${(expireTimes == null) ? '' : `;expires=${exdate.toGMTString()}`}`);
};

export const getCookie = function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);

  if (arr) {
    return arr[2];
  }
  return null;
};

export const delCookie = function delCookie(name) {
  setCookie(name, '', -1);
};
