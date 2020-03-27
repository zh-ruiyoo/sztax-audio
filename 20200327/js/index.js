const audioList = [
    { src: './audio/16css.mp3' },
    { src: './audio/audio.mp3' },
    { src: './audio/xuezhimeng-2.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
    { src: './audio/16css.mp3' },
];

const domList = [
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_02.jpg"
    },
    {
        type: "audio",

    },
    {
        type: "img",
        src: "./image/image_05.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_04.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_08.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_09.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_12.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_13.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_10.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_14.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_16.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_17.jpg"
    },
    {
        type: "audio",
    },
    {
        type: "img",
        src: "./image/image_18.jpg"
    },
]



// 分析重复的和不重复的部分 => 根据音频和视频分两个模板 => 再根据消息类型选择使用哪个模板
// dom结构渲染
var html = "";
var audioTmp = "";
var imgTmp = "";
for (i in domList) {
    if (domList[i].type == 'audio') {
        audioTmp = `
        <div class="weixinAudioBox">
            <div class="heade-img">
                <img src="./image/2.png" alt="">
            </div>
            <p class="audioObj">
                <audio src="" class="media" width="1" height="1" preload></audio>
                <span class="db audio_area">
                    <span class="audio_wrp db">
                        <span class="audio_play_area">
                            <i class="icon_audio_default"></i>
                            <i class="icon_audio_playing"></i>
                        </span>
                        <span class="audio_length tips_global"></span>
                        <span class="progress_bar audio_progress" style="width: 0%;"></span>
                    </span>
                </span>
            </p>
        </div>
        `
        html += audioTmp;
    } else if (domList[i].type == 'img') {
        imgTmp = `
        <div class="pic">
            <img src="` + domList[i].src + `" alt="">
        </div>`
        html += imgTmp;
    }
}
$(".content").html(html);

// audio渲染
$(function () {
    const audioObjList = $('.audioObj');
    for (let index = 0; index < audioObjList.length; index++) {
        const item = $(audioObjList[index]);
        item.weixinAudio(audioList[index]);
    }
})