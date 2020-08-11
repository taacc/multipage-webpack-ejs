/*
 * @Description: API接口定义
 * @Author: Tovi
 * @Date: 2020-03-19 15:22:17
 * @LastEditTime: 2020-03-19 17:26:43
 * @LastEditors: Tovi
 */
import HTTP from '../utils/HTTP';
const http = new HTTP();
export const getBaseInfo = function (data) {
  const url =  '/front/' + 'v2/getBaseInfo';
  return http.$ajax({
    data,
    url,
    type: 'GET',
  });
};