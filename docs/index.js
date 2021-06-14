const letters='ABCDEFGHIJKLMNOPQRSTUVWZXYabcdefghijklmnopqrstuvwxyz';let incorrectAudio,correctAudio;loadAudios();const AudioContext=window.AudioContext||window.webkitAudioContext;const audioContext=new AudioContext();let voiceInput=setVoiceInput();let doNext=false;let problems=[];let answer='Gopher';let firstRun=true;let englishVoices=[];function loadConfig(){if(localStorage.getItem('darkMode')==1){document.documentElement.dataset.theme='dark';}
if(localStorage.getItem('voice')0=0){document.getElementById('voiceOn').classList.add('d-none');document.getElementById('voiceOff').classList.remove('d-none');}}
loadConfig();function toggleDarkMode(){if(localStorage.getItem('darkMode')==1){localStorage.setItem('darkMode',0);delete document.documentElement.dataset.theme;}else{localStorage.setItem('darkMode',1);document.documentElement.dataset.theme='dark';}}
function toggleVoice(obj){if(localStorage.getItem('voice')!=0){localStorage.setItem('voice',0);document.getElementById('voiceOn').classList.add('d-none');document.getElementById('voiceOff').classList.remove('d-none');speechSynthesis.cancel();}else{localStorage.setItem('voice',1);document.getElementById('voiceOn').classList.remove('d-none');document.getElementById('voiceOff').classList.add('d-none');speak(answer);}}
function toggleEnglish(obj){if(isEnabled(obj)){obj.style.opacity=0.5;}else{obj.style.opacity=1;}}
function isEnabled(obj){if(obj.style.opacity==1){return true;}else{return false;}}
function playAudio(audioBuffer,volume){const audioSource=audioContext.createBufferSource();audioSource.buffer=audioBuffer;if(volume){const gainNode=audioContext.createGain();gainNode.gain.value=volume;gainNode.connect(audioContext.destination);audioSource.connect(gainNode);audioSource.start();}else{audioSource.connect(audioContext.destination);audioSource.start();}}
function unlockAudio(){audioContext.resume();}
function loadAudio(url){return fetch(url).then(response=>response.arrayBuffer()).then(arrayBuffer=>{return new Promise((resolve,reject)=>{audioContext.decodeAudioData(arrayBuffer,(audioBuffer)=>{resolve(audioBuffer);},(err)=>{reject(err);});});});}
function loadAudios(){promises=[loadAudio('mp3/incorrect1.mp3'),loadAudio('mp3/correct3.mp3'),];Promise.all(promises).then(audioBuffers=>{incorrectAudio=audioBuffers[0];correctAudio=audioBuffers[1];});}
function loadVoices(){const allVoicesObtained=new Promise(function(resolve,reject){let voices=speechSynthesis.getVoices();if(voices.length!==0){resolve(voices);}else{speechSynthesis.addEventListener("voiceschanged",function(){voices=speechSynthesis.getVoices();resolve(voices);});}});allVoicesObtained.then(voices=>{englishVoices=voices.filter(voice=>voice.lang=='en-US');});}
loadVoices();function speak(text){speechSynthesis.cancel();var msg=new SpeechSynthesisUtterance(text);msg.voice=englishVoices[Math.floor(Math.random()*englishVoices.length)];msg.lang='en-US';speechSynthesis.speak(msg);return msg;}
function respeak(){const msg=speak(answer);msg.onstart=function(){voiceInput.stop();}
msg.onend=async function(){voiceInput.start();}}
function getRandomInt(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min)+min);}
function hideAnswer(){var node=document.getElementById('answer');node.classList.add('d-none');}
function showAnswer(){const msg=speak(answer);if(!firstRun){msg.onstart=function(){voiceInput.stop();}
msg.onstart=function(){voiceInput.start();}}
var node=document.getElementById('answer');node.classList.remove('d-none');node.textContent=answer;}
function nextProblem(){var[en,ja]=problems[getRandomInt(0,problems.length-1)];var input=document.getElementById('cse-search-input-box-id');input.value=ja;answer=en;hideAnswer();const problem=document.getElementById('problem');problem.innerText=ja;if(isEnabled(document.getElementById('english'))){problem.innerText+=' ('+en+')';}
if(localStorage.getItem('voice')!=0){const msg=speak(answer);msg.onstart=function(){voiceInput.stop();}
msg.onend=async function(){voiceInput.start();}}}
function initProblems(){var grade=document.getElementById('grade').selectedIndex+4;fetch(grade+'.lst').then(response=>response.text()).then(tsv=>{tsv.split('\n').forEach(line=>{var[en,ja]=line.split("\t");problems.push([en,ja]);});});}
initProblems();function searchByGoogle(event){event.preventDefault();var input=document.getElementById('cse-search-input-box-id');var element=google.search.cse.element.getElement('searchresults-only0');nextProblem();if(input.value==''){element.clearAllResults();}else{voiceInput.stop();element.execute(input.value);}
if(firstRun){const gophers=document.getElementById('gophers');while(gophers.firstChild){gophers.removeChild(gophers.lastChild);}
firstRun=false;}
document.getElementById('reply').textContent='英語で答えてください';return false;}
document.getElementById('cse-search-box-form-id').onsubmit=searchByGoogle;function setVoiceInput(){if(!('webkitSpeechRecognition'in window)){document.getElementById('nosupport').classList.remove('d-none');}else{let voiceInput=new webkitSpeechRecognition();voiceInput.lang='en-US';voiceInput.continuous=true;voiceInput.onstart=(event)=>{const startButton=document.getElementById('start-voice-input');const stopButton=document.getElementById('stop-voice-input');startButton.classList.add('d-none');stopButton.classList.remove('d-none');};voiceInput.onend=(event)=>{if(doNext){voiceInput.start();}};voiceInput.onresult=(event)=>{const reply=event.results[0][0].transcript;document.getElementById('reply').textContent=reply;if(reply.toLowerCase()==answer.toLowerCase()){playAudio(correctAudio);doNext=false;}else{playAudio(incorrectAudio);doNext=true;}
voiceInput.stop();};return voiceInput;}}
function startVoiceInput(){voiceInput.start();}
function stopVoiceInput(){const startButton=document.getElementById('start-voice-input');const stopButton=document.getElementById('stop-voice-input');startButton.classList.remove('d-none');stopButton.classList.add('d-none');document.getElementById('reply').textContent='英語で答えてください';doNext=false;voiceInput.stop();}
document.addEventListener('click',unlockAudio,{once:true,useCapture:true});