var player = document.getElementById('videoPlayer');
var mp4 = document.getElementById('sourceMp4');
var mp3 = document.getElementById('sourceMp3');
var webm = document.getElementById('sourceWebm');
var melodi;
var melodiName;

document.getElementById('videoList').onchange = setVideoSrc;
document.getElementById('startTime').onchange = setStartTime;
document.getElementById('videoPlayer').addEventListener('ended',loopHandler,false);

function updateSiderVal(val){
	$('#speedSliderVal').text(val);
    player.playbackRate = val;
}

$( function() {
    $( "#slider" ).slider({
      value:1,
      min: 0.1,
      max: 2,
      step: 0.1,
      slide: function( event, ui ) {
        updateSiderVal(ui.value);
      }
    });
});

function setSlider(value) {
	document.getElementById('speedSliderVal').textContent = value;
	player.playbackRate = value;
	$( "#slider" ).slider({value:1});
}

function setVideoSrc() {	
	document.getElementById('startTime').value = "";	
	document.getElementById('endTime').value = "";
	
	if(this.value.includes("ArosJagthonsskolesJagtfanfare") || this.value.includes("giv")){
		setTitle(this.options[this.selectedIndex].text);
	}else{
		setTitle('');
	}
	
	
	if(this.value !== ''){			
		melodi = this.value; 
		melodiName = this.options[this.selectedIndex].text;
		
		if(!melodi) return;
		
		if(melodi.includes('andre') || melodi.includes('dulighed') || redDotTrue()){
			webm.src = 'video/' + melodi + '.webm';   
			mp4.src = 'video/' + melodi + '.mp4';
			mp3.src = '';
			player.poster = '';
		}else{	
			setTitle(melodiName);		
			mp4.src = '';
			webm.src = '';	
			mp3.src = 'audio/mp3/' + melodi + '.mp3';
			player.poster = 'audio/image/' + melodi + '.png';			
		}
		
		setSlider(1);
		player.load();
	}	
}

function changeDotNonDotSource(){
	if(!melodi || melodiName.includes("ArosJagthonsskolesJagtfanfare") || melodiName.includes("giv")){
		setTitle(melodiName);
	}else{
		setTitle('');
	}
	
	if(!melodi) return;
	
	if(melodi.includes('andre') || melodi.includes('dulighed') || redDotTrue() || !melodi){
		webm.src = 'video/' + melodi + '.webm';   
		mp4.src = 'video/' + melodi + '.mp4';
		mp3.src = '';
		player.poster = '';
	}else{
		setTitle(melodiName);	
		mp4.src = '';
		webm.src = '';			
		mp3.src = 'audio/mp3/' + melodi + '.mp3';
		player.poster = 'audio/image/' + melodi + '.png';			
	}

	player.load();	
}

function redDotTrue(){
	return document.querySelector('.dotCheckbox:checked') !== null;
}

function setTitle(title){
	document.getElementById('selectedVideo').innerHTML = title;
}


function setStartTime() { 
    player.currentTime = document.getElementById('startTime').value;
} 


function playPause() { 
    player.paused ? player.play() : player.pause();
} 

function stop() { 
    player.pause();
    player.currentTime = 0;
    document.getElementById('startTime').value = "";
    document.getElementById('endTime').value = "";
} 

function loopHandler(e) {
	if(document.querySelector('.loopCheckbox:checked') !== null){
		setTimeout(function(){
			player.currentTime = document.getElementById('startTime').value == "" ? 0 : document.getElementById('startTime').value;
			player.play()
		}, document.getElementById('loopSleep').value *1000);
	}	
}

function fullScreen() {

	if (player.requestFullscreen) {
		player.requestFullscreen();
	} else if (player.mozRequestFullScreen) {
		player.mozRequestFullScreen();
	} else if (player.webkitRequestFullscreen) {
  		player.webkitRequestFullscreen();
	}
}

function playerTime(element){
	var time = element.currentTime;
	var endTime = document.getElementById('endTime').value;
	document.getElementById('currentTime').innerHTML = time.toFixed(1);
	if (endTime === ""){
		return;
	}
	if(time >= endTime){
		player.pause();
		if(document.querySelector('.loopCheckbox:checked') !== null){
			loopHandler(null);
		}else{
			player.currentTime = document.getElementById('startTime').value == "" ? 0 : document.getElementById('startTime').value;
		}
		
	}
}

function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return;

    return elt.options[elt.selectedIndex].text;
}