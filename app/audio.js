var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
var isWechat = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";

var context, source, audioBuffer, playing;
function stopSound() {
  if (source) {
    source.stop(0);
    playing = false;
  }
}

function playSound() {
  source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true;
  source.connect(context.destination);
  source.start(0);
  playing = true;
}

function initSound(arrayBuffer) {
  context.decodeAudioData(arrayBuffer, function(buffer) {
    audioBuffer = buffer;
    //playSound();
  }, function(e) {
    console.log('Error decoding file', e);
  });
}

function loadAudioFile(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    initSound(this.response);
  };
  xhr.send();
}

if (isIOS && isWechat) {
  context = new window.AudioContext();
  loadAudioFile('./591a9c7acb5963b0378b4988.mp3');
}

export default function initAudio () {
  var audioIndicator = document.querySelector('#mugeda_audio_indicator');
  playSound();

  if (isIOS && isWechat) {
    audioIndicator.addEventListener('click', function () {
      if (playing)
        stopSound()
      else
        playSound();
    });
  }
}
