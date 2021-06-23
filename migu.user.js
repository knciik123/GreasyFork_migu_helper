// ==UserScript==
// @name         咪咕音乐PC网页增强
// @namespace    com.knciik
// @version      1.0.0
// @copyright    2021 @knciik
// @license      Apache-2.0
// @collaborator knciik
// @author       knciik
// @match        *://music.migu.cn/v3/music/player/audio*
// @icon         data:image/webp;base64,UklGRlIDAABXRUJQVlA4IEYDAABwDwCdASotAC0APm0ykkgkIqGhJzgKSIANiWwAxQvCvAfEcgXwhEEUt8wG6AdIjvIH7RekBocSenK2n1SJvIJvp1sqx0+i1nF+nPYK6Tf7R+yMs3n03D64MeVTnJQSdYbGaiAAqlz2u7OenFZ/7/0Ei0OlQSE1M4SCyu5+mo6p/gNnVIAA/vz2GZenYlitWYxE5qOVQCLcfKwG6NhXU9Ac7tASNGX5hXe9iuMD2qWNcZ596+WRSFSCv2Mya/wYvjVyat3/+e//3X9IfqX/vYL+9AL8hxImzzAE1x+2rfkFX2Mu7k+yjNCiAgTmrVZOYXpsbQCA2M+8fcbwi5xSosHpMgHerfSG3aC+qbmJb1RVKexs1C7eWN10SX73ER/noTD8VqIV/XXieWGaHNw03xyOER/I1JfJ8+05EdGQ6p8AC58jD7W9IhfQY8lruHEYYR025QhY5t1/EICXfOmidsWuaAKdWXv5H1KrdFfyw9fq/Qzc3e6wxc37JxUE/K5z+So6JZ26Kh9b/+Wr4RWIVCzypMUhcw/Cvn7TdE5jG8AGM7qML5WAmeuaDeA26L9tLCoPIR+SYWRoy2U0JQbKxd2XFGN9JbY6TAZLBKR8Na+5/UCNy34J0ap7f0TSCaHOL/K6w3szvxfNzilf4aZBO3FGIc/Cvf+bxiq2MNYZ7//6AcHOyoiq8XGuYP7U1zG7ma6Vrnirz1nSktS9iZRTDhbAR3UfoU2A010Y329TC/sXUJJILeU0Bc/auyBcdA+Ldc0Y9fgkTZRvEE8PSBPvjZvI9kk9PrRje9Az2GYcpOLn2IdN1oDGn9qL5zoSoahIIyBP5U6v/I/Wm/7BCJ4s8gpzSn+McqP72h8A/cEToBgX83vt0q3r03nA8Mmb8S9Cfb6dSva+wXylQ918EUG1q6EDmz6nNxUVJkJ6G1WeruJC6OYB8Y1fy+DOj0WCuqRcMJNaO0YQVwTc1F93Zfy0vOwsWvjpP0sjbU+riwKUY6G4DT/DjTxmrL728WulW65C0z5dvL73UBcprOneCADTniPqdrJ5//uk/5q7u6/zi1oBLIhtKXksfrvq/LhVQpiymp1kZDriqpcgX2w4w9kIWcUnrv+rNgAA
// @grant        none
// @homepageURL url
// @supportURL url
// @contributionURL url
// @updateURL https://openuserjs.org/meta/knciik/migu.user.js
// @description  针对咪咕音乐PC网页( https://music.migu.cn/v3/music/player/audio )，提供快捷键功能，一键下载
// ==UserScript==

/*  快捷键说明：
 *  右边数字小键盘
 *  0：   暂停\播放
 *  del： 静音

 *  1： 快退5秒
 *  3:  快进5秒

 *  4:  上一首
 *  6： 下一首

 *  5： 音量提高
 *  2： 音量降低

 *  7： 设为喜爱
 *  8： 下载当前播放的音乐
 */

(function() {
    setTimeout(() => {
		var dom = document.querySelector('#app');
        var vm = dom.__vue__;
		var slider = document.querySelector('div.cp-volume-slider')
		var progress = document.querySelector('div.progress-slider')

		/*  vm组件结构
			#app vue-component-1-App
				div
					div.player-content
						div#header.player-header
						div.player-content[6] **
						player-footer
		*/

		//核心组件div.player-content
		/*
			currentMusic {} 当前歌曲信息
			lyricInfo {} 歌词
			musicList {} 歌曲列表(可以直接获取info 批量下载)
			playAction()
			playNext()
			playPrev()
			currentTime 当前播放时间 秒
			totalTime   歌曲时间 秒
			volumeValue 当前音量
		*/

		//document.querySelector('#app').__vue__.$children[0].$children[0].$children[1]
		var content = vm.$children[0].$children[0].$children[1];

		function pauseOrPlay() {
            content.playAction();
        }

        function next() {
			content.playNext();
        }

        function prev() {
            content.playPrev();
        }

		function forward(){
			let time = content.currentTime+5;
			if (time > content.totalTime){
				time = content.totalTime;
			}
			content.audioEle.currentTime = time;
		}

		function goback(){
			let time = content.currentTime-5;
			if (time <0){
				time = 0;
			}
			content.audioEle.currentTime = time;
		}

		function vol_up(){
			let vol = content.volumeValue+10;
			if (vol >100) {
				vol = 100;
			}
			content.volumeValue =vol;
		}

		function vol_down(){
			let vol = content.volumeValue-10;
			if (vol <0) {
				vol = 0;
			}
			content.volumeValue =vol;
		}

		function vol_none(){
			content.volumeValue =0;
		}

		function set_collect(){
			if (!content.isCollect){
				content.collectHandle()
			}
		}

		//下载SQ无损
		function down_sq(){
			let name = content.currentMusic.name || "未知歌名";
			let album = content.currentMusic.albumInfo[0].albumName || "";
			let singer = content.currentMusic.singerInfo[0].artistName || "";
			//没有SQ就下载HQ
			let url = content.currentMusic.SQ || content.currentMusic.HQ;
            if (url){
                let download_name = album+"-"+name+"-"+singer;
                if (content.currentMusic.SQ){
                    download_name+=".flac";
                }else{
                    download_name+=".mp3";
                }
                download(url,download_name);
            }else{
                alert("下载失败");
            }
		}
	    function download(url,name){
			//freetyst.nf.migu.cn 拒绝跨域
			//弹出一个新窗口下载
			let page = window.open("http:\\freetyst.nf.migu.cn","_blank");
			page.document.body.appendChild(page.document.createElement("div"))
		}

		var helper = document.createElement("div")
		helper.setAttribute("id","migu-knciik-helper")
		//zindex 爷要在最上面
		helper.setAttribute("style","z-index:600000000;height:60px;width:60px;background:pink;position:fixed;right:50px;bottom:80px");
		document.body.appendChild(helper);

		window.$("html").keypress(function(e){
			console.log("爷按了",e.keyCode)
			if (e.keyCode == "48"){
				pauseOrPlay();
			}else if (e.keyCode == "51"){
				forward();
			}else if (e.keyCode == "49"){
				goback();
			}else if (e.keyCode == "53"){
				vol_up();
			}else if (e.keyCode == "50"){
				vol_down();
			}else if (e.keyCode == "46"){
				vol_none();
			}else if (e.keyCode == "55"){
				set_collect();
			}else if (e.keyCode == "52"){
				prev();
			}else if (e.keyCode == "54"){
				next();
			}else if (e.keyCode == "56"){
				down_sq();
			}
		});
		window.$(helper).bind("click",function(){
			console.log("爷点了")
		});

		//test
		console.log("migu helper   by knciik")
    });
})();


