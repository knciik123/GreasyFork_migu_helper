// ==UserScript==
// @name         咪咕音乐网页增强
// @namespace    https://openuserjs.org/users/knciik
// @version      1.0.0
// @copyright    2021, knciik (https://openuserjs.org/users/knciik)
// @license      Apache-2.0
// @collaborator knciik
// @author       knciik
// @match        *://music.migu.cn/v3/music/player/audio*
// @icon         data:image/png;base64,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nzzPlVeOMnnv7Yw+cDeMDUGlCsKWexSglcOH11l+8z1e/tHPqcw32TSwltgbcAaiiBxDYXMUgYqIsIXFiICqV5npLHPrnt3oyq07uPzSrxno7ia2Ae8CzhSIVBIphbGGWlpBmYDJCvrimHrvEIsrGed/cZB3Xz1Edd0wA6Mj1Af6CAKWFxosX7pG89IMaq7JRFxjTe9aWOkgfCBONC2bgwxUKwmmneGdo5JUcVKwLDxzwsLO7Wh2bmTolm1cPXWRcZWQGE/kQRpPgUcpQdHJ0KEEQ6bTBq3oiWLSEJG3Au13LrNwfIrZVVyihKSWVhjUMUnai/aeYAoIDq0VwVli50mTlMbCEv09vdi2oeMcLSG41GkzsHMbfORmNEPd7Hjkfl6f/k/mFnPSKCWNYpwviITAr66RgETJMgoFD8E6pHPUVcQAESEqASaUqyYEAcYTJTHLi01cHFNJI4Kx+OCRAopORneljrWO5aJAdtdpKEfRXWPzA3fBUBeSqqJ713YmH9hLo54wpx2zvmDFF3gpyLIMJSRSsRqKPIKA8p5ICJwtcM4g8BAc0jtU8AhnCdbQaTVJ0xitJe2iQ+4NXgaEAqkVHkGzcNDdxbyGq9Izef/ddO3ZBYlCeO+DsAGuNDj/419y9oWXqDUzxnv6MY0GvXGKtLbEHJSM2uNwLpS8mhJeCtTvKvi7e1rhgsevAk4hBFGkMMZg8wKURkUpnThixhU0qopt+/exfv8+GOqBWCKKzIRIa8gK6BQ0j53g6DO/ZPHdM6xTCbWmYTAqYWTAkQeHlZ6gNJGQqMKV7FmVXMavPqBzDqlLyupZpfuyxL4m+LJ6ccylhUXmhGXNrR9hct/d9O29rTQlkcYKibCFC0qEVcAcoNkpV8Txk+RHTpC9fxE7s4Bpt0r4rQOFAidA+ECtkKgAKLnKqyU6jsoUB+BLpbHeEaRAaEURHCLSqK4663Z+FLFjC+zaDIPdkIJLY3JbHuj/AI58egIDj1qIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTIzVDEwOjQ2OjMxKzA4OjAwthjrHwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0yM1QxMDo0NjozMSswODowMMdFU6MAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABd0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANDCJuw8fAAAAFnRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQwcRTPkgAAABp0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL2pwZWeLpZ60AAAAF3RFWHRUaHVtYjo6TVRpbWUAMTYyNDQxNjM5MZN8XfEAAAAPdEVYdFRodW1iOjpTaXplADBCQpSiPuwAAABGdEVYdFRodW1iOjpVUkkAZmlsZTovLy9hcHAvdG1wL2ltYWdlbGMvaW1ndmlldzJfOV8xNjIzOTEyMzI3NzIwMjI4Nl8yMF9bMF12apThAAAAAElFTkSuQmCC
// @grant        none
// @description  针对咪咕音乐PC网页( https://music.migu.cn/v3/music/player/audio )，提供快捷键功能，一键下载
// ==/UserScript==

/*  快捷键说明：
 *  右边数字小键盘
 *  0：   暂停\播放
 *  del： 静音
 *  1：   快退5秒
 *  3:    快进5秒
 *  4:    上一首
 *  6：   下一首
 *  5：   音量提高
 *  2：   音量降低
 *  7：   设为喜爱
 *  8：   下载当前播放的音乐
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
