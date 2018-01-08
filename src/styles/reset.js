//获取窗口的宽  设置字体大小
window.onload = window.onresize = function () {
    var dw  = document.documentElement.clientWidth;
    //iphone5 ——> 320 10
    var htmlPx = dw / 320 * 10

    document.documentElement.style.fontSize = htmlPx + "px"
}