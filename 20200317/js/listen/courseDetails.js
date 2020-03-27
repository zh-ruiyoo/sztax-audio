/*
    页面音频播放
*/

var audio;
$(function () {
    AudioControl();
    function AudioControl() {
        let musiclist = new Array();
        //歌单
        musiclist = ["../../courseware/audio/example-2.mp3", "../../courseware/audio/audio-course-01.mp3"];
        // 当前曲目号
        let num = 0;

        let timeline = document.getElementsByClassName('timeline')[0];
        audio = document.getElementById('js-video');
        audio.src = musiclist[num];

        // 下一首
        $('#MyAudio').on('click', '#btn-next', function () {
            musicNext();
        });

        // 上一首
        $('#MyAudio').on('click', '#btn-pre', function () {
            musicPre();
        });

        // 时间控制
        $('#MyAudio').on('click', '.timeline', function (event) {
            let disX = event.clientX - timeline.offsetLeft;
            disX = disX > 0 ? disX : 0;
            let time = disX / timeline.offsetWidth * audio.duration;
            audio.currentTime = time;
            setTimeShow(time);
        });

        // 播放
        $('#MyAudio').on('click', '#btn-play', function () {
            playOrPause();
        });

        $(audio).on('loadedmetadata', function () {
            // 进度条控制
            $('#MyAudio').on('touchend', '.timeline', function (e) {
                var x = e.originalEvent.changedTouches[0].clientX - this.offsetLeft;
                var X = x < 0 ? 0 : x;
                var W = $(this).width();
                var place = X > W ? W : X;
                audio.currentTime = (place / W).toFixed(2) * audio.duration
                $(this).children().css({
                    width: (place / W).toFixed(2) * 100 + "%"
                })
            });

            // 自动播放下一首
            audio.addEventListener('ended', function () {
                musicNext();
            }, false);
        })
        setInterval(function () {
            var currentTime = audio.currentTime;
            setTimeShow(currentTime);
        }, 1000);
        // 设置播放时间
        function setTimeShow(t) {
            t = Math.floor(t);
            var playTime = secondToMin(audio.currentTime);
            $(".size").html(playTime);
            $('.timeshow').text(secondToMin(audio.duration))
            $('.timeline').children().css({
                width: (t / audio.duration).toFixed(4) * 100 + "%"
            })
        }
        // 计算时间
        function secondToMin(s) {
            var MM = Math.floor(s / 60);
            var SS = s % 60;
            if (MM < 10)
                MM = "0" + MM;
            if (SS < 10)
                SS = "0" + SS;
            var min = MM + ":" + SS;
            return min.split('.')[0];
        }

        // 下一曲
        function musicNext() {
            if (num + 1 < musiclist.length) {
                num++;
            } else {
                // 到最后一首就回到第一首
                num = 0;
            }
            audio.src = musiclist[num];
            audio.play();
        }

        // 上一曲
        function musicPre() {
            if (num - 1 >= 0) {
                num--;
            } else {
                // 到第一首就回到最后一首
                num = musiclist.length - 1;
            }
            audio.src = musiclist[num];
            audio.play();
        }

        // 播放暂停
        function playOrPause() {
            if (audio.paused) {
                audio.play();
                // 在这里改播放和暂停时的按钮状态
                $('#btn-play img')[0].src = '../../image/stop.svg';
            } else if (audio.played) {
                audio.pause();
                $('#btn-play img')[0].src = '../../image/play.svg';
            }
        }
    }
})

// 列表点击展开
$("#listBtn").click(function(){
    $("#maskBox").css("display","block");
    $("#popupBox").css({"display":"block","height":"6.4rem"});
})

// 列表点击关闭
$("#closeBtn").click(function(){
    $("#maskBox").css("display","none");
    $("#popupBox").css({"display":"none","height":"0"});
})

// 点赞
$("#likeBtn").click(function(){
    $("#likeBtn img").addClass("animated rubberBand");
    $("#likeBtn img")[0].src = "../../image/give_a_like_blue.png";
    $("#likeBtn").css("color","#188eee");
})

//collection_blue.png
// 收藏
$("#collectionBtn").click(function(){
    $("#collectionBtn img").addClass("animated rubberBand");
    $("#collectionBtn img")[0].src = "../../image/collection_blue.png";
    $("#collectionBtn").css("color","#188eee");
})