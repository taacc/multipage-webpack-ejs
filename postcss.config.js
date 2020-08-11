/*
 * @Description: postcss 配置
 * @Author: Tovi
 * @Date: 2020-01-03 17:30:14
 * @LastEditTime : 2020-01-04 10:03:53
 * @LastEditors  : Tovi
 */
module.exports = {
    plugins: {
      'autoprefixer': {},
      'postcss-px2rem': {
          rootValue: 75, // 设计稿宽度的1/10,（JSON文件中不加注释，此行注释及下行注释均删除）
          propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
          selectorBlackList: [/^\.van-/], // 以这个为前缀的类不转
          minPixelValue: 2, // 小于2px的不转换
      },
      // '@mozheng-neal/postcss-bem':{},
      // 'postcss-nested':{}
    }
}
