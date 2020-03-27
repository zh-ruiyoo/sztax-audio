/*------------设置音频播放变量 edit 20190602-1 把这些变量放到前面-------------*/
var media = document.getElementById('audio'); //音频对象 //edit 20190602-1 把变量audio改成media
var mp3Root = 'mp3/'; //音频根路径
var audioArr = [];
var mp3Arr = ['你有新短消息.mp3', '新的询价请回复.mp3', '新的询价委托.mp3', '新的在线消息.mp3'];
for (var i = 0; i < mp3Arr.length; i++) {
    audioArr.push(mp3Root + mp3Arr[i]);
}
mp3Arr = audioArr;
 
/**:::::::::::::::::::::::::
 * [函数:自动播放音频]
 * @param string mp3 音频文件路径
 * edit 20190602-1
 :::::::::::::::::::::::::*/
function autoPlayAudio(mp3) {
    if (typeof(mp3) == 'undefined') mp3 = "";
    //alert("声音文件111:\n"+mp3);
 
    //1.电脑端、安卓这样就可以自动播放了
    $('#audio source')[0].src = mp3; //音频赋值 
 
    //2.准备开始播放时(这段代码并非必须,加上比较保险)
    media.oncanplay = function() {
        media.play();
        //alert("hi,声音准备开始播放了");
    }
 
    //3.自动播放兼容：苹果iphone(ios)中内置浏览器safri直接播放音频
    //实测：对大部分ios版本用内置浏览器或在微信中打开网页都有效
    //说明1：iphone浏览器safri需等待用户交互动作后才能播放media,即如果你没有得到用户的action就播放的话就会被safri拦截
    //说明2：本方案其实是个障眼法，因为一般人打开手机网站手指总会不经意就碰到屏幕
    if (/iphone|ipod|mac|ipad/i.test(navigator.userAgent.toLocaleLowerCase())) {
        //$('html,body').on('touchstart', function() { //总是
        $('html,body').one('touchstart', function() { //只一次        
            media.play();
        })
    }
 
    //4.自动播放兼容：苹果iphone(ios)部分ios版本可能要先load下才能播放       
    media.load();
 
    //5.自动播放兼容：微信中打开时在苹果iphone(ios)中自动播放音频
    //一般须在head标签中引入微信的js：http://res.wx.qq.com/open/js/jweixin-1.0.0.js，且在微信Weixin JSAPI的WeixinJSBridgeReady才能生效。
    //注意1：WeixinJSBridgeReady只会触发一次，若微信已经ready了，但还没执行到你监听这个ready事件的代码，那么你的监听是没用的，
    //注意2：WeixinJSBridgeReady只适合一开始就自动播放声音，若你是做那种微信场景（打开页面模拟收到很多条微信，每条微信都要播放那段音效）或初始化故意延时几秒才播放声音，实际上这种兼容方案也是无效的
    //注意3：若监听里面添加alert调试,一般在微信中打开链接是不会alert的，而是刷新页面时才会alert出来
    //注意4：若删了下面代码,在微信中部分iphone(ios)版本是不会自动播放声音的     
    document.addEventListener("WeixinJSBridgeReady", function() {
        media.play();
        //alert("Hi,微信中的部分苹果iphone(ios)版本");
    }, false);
 
}
 
/**:::::::::::::::::::::::::
 * [函数：解决音频自动播放Bug]
 * 此Bug一般出现在苹果iphone(ios)中
 * bug1：无法同时播放多个音频
 * bug2：单个音频想要延迟N秒后才自动播放，却发现不会自动播放了
 * @param string mp3 音频文件路径
 * add 20190602-1
 :::::::::::::::::::::::::*/
function iosPlayBugs(mp3) {
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
            media.play();
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function() {
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                media.play();
            });
        }, false);
    }
    autoPlayAudio(mp3);
    media.play(); //必须,否则在非微信中(即手机内置浏览器中)打开时不会播放
}