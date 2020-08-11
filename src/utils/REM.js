/*  rem适配相关 start **************************************************/
var designWidth = 750; // 设计图的宽度
var baseSize = designWidth / 10; // 基准大小
function setRem() {
    var scale = document.documentElement.clientWidth / designWidth;
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
setRem();
window.onresize = function() {
    setRem();
};