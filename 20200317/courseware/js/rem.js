// rem初始化设置 基于750px宽设计稿
function setRem() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
}
setRem();
window.addEventListener('resize', setRem);