// ==UserScript==
// @name         咪咕音乐页面增强
// @namespace    com.knciik
// @version      0.1
// @description  添加快捷键，一键下载
// @author       knciik
// @match        https://music.migu.cn/v3/music/player/audio
// @grant        none
// ==/UserScript==

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


