const contentBox = $('#contentBox');
    const relatedAudioList = [
        {
            src: "../../image/figure.png",
            title: "新办纳税人套餐简介",
            time: "2019-09-21",
            playNumber: "542"
        },
        {
            src: "../../image/pic_01.png",
            title: "每月工资一样，为什么个税变多了",
            time: "2019-09-21",
            playNumber: "542"
        },
        {
            src: "../../image/pic_03.png",
            title: "增值税发票综合服务平台操作指引",
            time: "2019-09-21",
            playNumber: "542"
        },
        {
            src: "../../image/pic_04.png",
            title: "耕地占用税法中你必须要知道的那些事！",
            time: "2019-09-21",
            playNumber: "542"
        }
    ]

    // 渲染数据
    function relatedAudio(data) {
        function randomsort(a, b) {
            return Math.random()>.5 ? -1 : 1; 
        }
        data.sort(randomsort);
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            contentBox.append(`
            <li class="animated fadeIn">
                <div class="pic">
                    <img src="`+item.src+`" alt="">
                </div>
                <div class="text">
                    <p>`+item.title+`</p>
                    <div>
                        <span><img src="../../image/time.png" alt="">`+item.time+`</span>
                        <span><img src="../../image/listen.svg" alt="">`+item.playNumber+`</span>
                    </div>
                </div>
            </li>
            `);
        }
    }

    // 点击按钮触发事件
    function anotherAudioAjax() {
        // 清空旧的dom
        contentBox.empty();
        // 出现加载动画
        // 此处模拟ajax
        // ajax回调：成功 => 渲染页面数据，关闭加载动画
        // ajax回调：失败 => 返回错误信息，关闭加载动画
        let data = relatedAudioList;
        relatedAudio(data);
    }

    $("#anotherAudio").click(function(){
        anotherAudioAjax();
    });

    $(function(){
        anotherAudioAjax();
    });