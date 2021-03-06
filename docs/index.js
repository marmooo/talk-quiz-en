const letters='ABCDEFGHIJKLMNOPQRSTUVWZXYabcdefghijklmnopqrstuvwxyz';const correctAudio=new Audio('/talk-quiz-en/mp3/correct3.mp3');let voiceInput=setVoiceInput();let doNext=false;let problems=[];let answer='Gopher';let firstRun=true;let canvasCache=document.createElement('canvas').getContext('2d');let model;let englishVoices=[];function loadConfig(){if(localStorage.getItem('darkMode')==1){document.documentElement.dataset.theme='dark';}
if(localStorage.getItem('voice')==1){document.getElementById('voice').style.opacity=1;}}
loadConfig();function toggleDarkMode(){if(localStorage.getItem('darkMode')==1){localStorage.setItem('darkMode',0);delete document.documentElement.dataset.theme;}else{localStorage.setItem('darkMode',1);document.documentElement.dataset.theme='dark';}}
function toggleVoice(obj){speechSynthesis.cancel();if(localStorage.getItem('voice')==1){localStorage.setItem('voice',0);obj.style.opacity=0.5;}else{localStorage.setItem('voice',1);obj.style.opacity=1;unlockAudio();speak();}}
function toggleEnglish(obj){if(isEnabled(obj)){obj.style.opacity=0.5;}else{obj.style.opacity=1;}}
function isEnabled(obj){if(obj.style.opacity==1){return true;}else{return false;}}
function loadVoices(){const allVoicesObtained=new Promise(function(resolve,reject){let voices=speechSynthesis.getVoices();if(voices.length!==0){resolve(voices);}else{speechSynthesis.addEventListener("voiceschanged",function(){voices=speechSynthesis.getVoices();resolve(voices);});}});allVoicesObtained.then(voices=>{englishVoices=voices.filter(voice=>voice.lang=='en-US');});}
loadVoices();function speak(){var msg=new SpeechSynthesisUtterance(answer);msg.voice=englishVoices[Math.floor(Math.random()*englishVoices.length)];msg.lang='en-US';msg.onend=async function(){await sleep(1000);voiceInput.start();}
speechSynthesis.speak(msg);}
function unlockAudio(){correctAudio.volume=0;correctAudio.play();correctAudio.pause();correctAudio.currentTime=0;correctAudio.volume=1;}
function getRandomInt(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min)+min);}
function hideAnswer(){var node=document.getElementById('answer');node.classList.add('d-none');}
function showAnswer(){var node=document.getElementById('answer');node.classList.remove('d-none');node.innerText=answer;}
function changeProblem(){var[en,ja]=problems[getRandomInt(0,problems.length-1)];var input=document.getElementById('cse-search-input-box-id');input.value=ja;answer=en;hideAnswer();const problem=document.getElementById('problem');problem.innerText=ja;if(isEnabled(document.getElementById('english'))){problem.innerText+=' ('+en+')';}
speechSynthesis.cancel();if(localStorage.getItem('voice')==1){speak();}}
function initProblems(){var grade=document.getElementById('grade').selectedIndex+4;fetch(grade+'.lst').then(response=>response.text()).then(tsv=>{tsv.split('\n').forEach(line=>{var[en,ja]=line.split("\t");problems.push([en,ja]);});});}
initProblems();function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
function searchByGoogle(event){event.preventDefault();var input=document.getElementById('cse-search-input-box-id');var element=google.search.cse.element.getElement('searchresults-only0');changeProblem();if(input.value==''){element.clearAllResults();}else{voiceInput.stop();element.execute(input.value);}
if(firstRun){const gophers=document.getElementById('gophers');while(gophers.firstChild){gophers.removeChild(gophers.lastChild);}
unlockAudio();firstRun=false;}
document.getElementById('reply').textContent='英語で答えてください';return false;}
document.getElementById('cse-search-box-form-id').onsubmit=searchByGoogle;function setVoiceInput(){if(!('webkitSpeechRecognition'in window)){document.getElementById('nosupport').classList.remove('d-none');}else{let voiceInput=new webkitSpeechRecognition();voiceInput.lang='en-US';voiceInput.continuous=true;voiceInput.onstart=(event)=>{const startButton=document.getElementById('start-voice-input');const stopButton=document.getElementById('stop-voice-input');startButton.classList.add('d-none');stopButton.classList.remove('d-none');};voiceInput.onend=(event)=>{if(doNext){voiceInput.start();}};voiceInput.onresult=(event)=>{const reply=event.results[0][0].transcript;document.getElementById('reply').textContent=reply;if(reply.toLowerCase()==answer.toLowerCase()){correctAudio.play();doNext=false;}else{doNext=true;}
voiceInput.stop();};return voiceInput;}}
function startVoiceInput(){voiceInput.start();}
function stopVoiceInput(){const startButton=document.getElementById('start-voice-input');const stopButton=document.getElementById('stop-voice-input');startButton.classList.remove('d-none');stopButton.classList.add('d-none');document.getElementById('reply').textContent='英語で答えてください';doNext=false;voiceInput.stop();}