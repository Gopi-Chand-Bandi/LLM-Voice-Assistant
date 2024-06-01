
// const allYellowDivs = document.querySelectorAll('.yuRUbf');
let flag=true;
console.log(flag);
const allYellowDivs = document.querySelectorAll('.LC20lb');

const anchor = document.querySelectorAll('a');
const targetNode = document.body;
const config = { attributes: true, childList: true, subtree: true };
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const contentSpeech = new SpeechSynthesisUtterance();

// Message
const svgCode = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 11H8.01M12 11H12.01M16 11H16.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'; // Your SVG code
const encodedSVG = btoa(svgCode);  
const dataURI =  `data:image/svg+xml;base64,${encodedSVG}`;

const svgMaxi = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.9999 21.9994C17.055 21.9921 19.1784 21.8926 20.5354 20.5355C21.9999 19.0711 21.9999 16.714 21.9999 12C21.9999 7.28595 21.9999 4.92893 20.5354 3.46447C19.071 2 16.714 2 11.9999 2C7.28587 2 4.92884 2 3.46438 3.46447C2.10734 4.8215 2.00779 6.94493 2.00049 11" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 12L17 7M17 7H13.25M17 7V10.75" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 18C2 16.1144 2 15.1716 2.58579 14.5858C3.17157 14 4.11438 14 6 14C7.88562 14 8.82843 14 9.41421 14.5858C10 15.1716 10 16.1144 10 18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18Z" stroke="#000000" stroke-width="1.5"></path> </g></svg>'
const encodedMaxi = btoa(svgMaxi);
const dataMaxi =  `data:image/svg+xml;base64,${encodedMaxi}`;

// close
const svgClose = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#000000" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>'
const encodedClose = btoa(svgClose);
const dataClose =  `data:image/svg+xml;base64,${encodedClose}`;

const numberWords = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'ten': 10,
  // Add more mappings as needed
  };

var newDiv = document.createElement('div');
// newDiv.innerHTML = "<h1 style='z-index: 100;'>My custom content</h1>"; 

newDiv.innerHTML += `
<div class="chatbot-container">
<div class="chatbot chatbot--closed" id="chatbotId">
  <div class="chatbot-div">
    <div class="chatbot__header">
      <!-- <p><strong>Got a question?</strong> <span class="u-text-highlight">Alpha Can Guide you</span></p> -->
    <!---  <img class="chatbot__close-button icon-speech" viewBox="0 0 32 32" src="data:image/svg+xml;base64,${encodedSVG}"> -->
      <img class="chatbot__close-button icon-close" src="data:image/svg+xml;base64,${encodedClose}">
    </div>
    <image src="data:image/svg+xml;base64,${encodedMaxi}" class="chatbot__maximize-button maxi__icon chatbot__close-button icon-close" id="maxiId"></image>
    <div class="chatbot__content">
      <div class="chatbot__message-window">
        <ul class="chatbot__messages">
          <li class="is-ai animation">
            <div class="is-ai__profile-picture">
              <img class="icon-avatar" src="data:image/png;base64,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" alt="">
            </div>
            <span class="chatbot__arrow chatbot__arrow--left"></span>
            <p class='chatbot__message' id="chatbot__message__1">
                <!-- <pre><code> -->
                Hi there 🖐. I’m Alpha, your virtual assistant. I'm here to help with your general enquiries.
                  <!-- </code></pre> -->
            </p>
            <div class="chatbot__response" id="output">output</div>
          </li>
        </ul>
      </div>
      <div class="chatbot__entry chatbot--closed">
        <input type="text" class="chatbot__input" placeholder="Click on Microphone and ask your query ..." />
        <!-- <img class="chatbot__submit" id="chatbot__submitId" src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"> -->
      </div>
    </div>
  </div>
  </div>
</div>

`
// newDiv.style.cssText= "position: absolute; top: 0; bottom: 0; width: 100%; height: 450px;"
const styleTag = document.createElement('style');
styleTag.textContent = `
  .chatbot-container {

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999; 
  
    /* Responsive Expansion with Limits */
    width: 100vw; 
    height: 100vh; 
    max-width: 1600px; 
    max-height: 2000px; 
    margin-top: -110px;
  }

  .chatbot {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 450px;
    /* box-shadow: 0 -6px 99px -17px rgba(0, 0, 0, 0.68); */
    /* border: 1px solid; */
  }
  
  @media screen and (min-width: 640px) {
    .chatbot {
      position: absolute;
      max-width: 420px;
      right: 80px;
      top: auto;
    }
  }
  
  .chatbot__maximize-button {
    position: absolute;
    top: 10px; 
    right: 10px;
    cursor: pointer;
    margin-right: -10px;
    margin-top: -30px;
  }
  
  
  .maxi__icon{
    width: 20px;
    height:20px;
  }
  
  .chatbot-container.fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999; 
  
    /* Responsive Expansion with Limits */
    width: 100vw; 
    height: 80vh; 
    max-width: 1200px; 
    max-height: 1000px; 
    margin-top: -110px;
  }
  
  .chatbot-container.fullscreen .chatbot-div { 
    /* height: calc(100% + 800px);  */
    width: calc(100% + 800px);  /* Adjust 100px as needed */
    margin-left: -600px;
  }
  
  .chatbot-container.fullscreen .chatbot{ 
    /* height: 800px; */
    width: calc(100% + 800px);  /* Adjust 100px as needed */
    margin-left: -350px;
   
  }
  
  .chatbot-container.fullscreen .chatbot__header{ 
    width: 90px  /* Adjust 100px as needed */
  }
  
  .chatbot-container.fullscreen .chatbot__messages{ 
    margin-top: 25px; /* Adjust 100px as needed */
  }
  .chatbot-container.fullscreen .chatbot__message-window{ 
    height: 500px; /* Adjust 100px as needed */
  }
  .chatbot-container.fullscreen .maxi__icon{ 
    margin-left: 50px; /* Adjust 100px as needed */
    margin-right: -140px;
  }
  .chatbot.chatbot--closed {
    top: auto;
    width: 100%;
    height: 0px;
  }
  
  .chatbot-div{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  
  .chatbot__header {
    color: black;
    display: flex;
    align-items: center;
    justify-items: center;
    /* justify-content: space-between; */
    /* background-color: #F5F5DC; */
    height: 54px;
    padding: 0 20px;
    width: 20%;
    cursor: pointer;
    /* cursor: move; */
    transition: background-color 0.2s ease;
    border-radius: 1.303rem;
    /* border: solid 2px #B2BEB5; */
    /* box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28); */
  }
  
  /* .chatbot__header:hover {
    background-color: #fffffc;
    color: black;
  } */
  /* .chatbot__header p {
    margin-right: 20px;
  } */
  
  .chatbot__close-button {
    fill: #fff;
  }
  .chatbot__close-button.icon-speech {
    width: 50px;
    display: none;
  }
  .chatbot--closed .chatbot__close-button.icon-speech {
    display: block;
  }
  .chatbot__close-button.icon-close {
    width: 34px;
  }
  .chatbot--closed .chatbot__close-button.icon-close {
    display: none;
  }
  
  .chatbot__content{
    width: 100%;
  }
  
  .chatbot__message-window {
    /* height: calc(100% - (54px + 60px)); */
    height: 400px;
    padding: 10px 20px 20px;
    background-color: #fff;
    border: 1px solid #dfe1e5;
    border-bottom: 0px;
    border-radius: 0.303rem 0.303rem 0 0;
    /* /* */
    overflow-y: auto;
  }
  
  /* .chatbot__content .chatbot__message-window:hover
  {
      box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
      border-color: rgba(223,225,229,0);
  } */
  .chatbot__content .chatbot__message-window:hover
  {
      box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
      border-color: rgba(223,225,229,0);
  }
  .chatbot__content .chatbot__entry:hover
  {
      box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
      border-color: rgba(223,225,229,0);
  }
  @media screen and (min-width: 640px) {
    .chatbot__message-window {
      height: 350px;
    }
  }
  .chatbot__message-window::-webkit-scrollbar {
    display: none;
  }
  .chatbot--closed .chatbot__message-window {
    display: none;
    height: 0px;
  }
  
  .copy_msg{
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  
  .chatbot__response{
    position: absolute;
    right: 0;
    margin-top: -46px;
    display: none;
    font-size: 20px;
    padding: 5px;
    color: #92898a;
  }
  
  .copy_msg :hover{
    background-color: #ccc;
  }
  
  .chatbot__messages {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    /* font-size: 0.9em; */
    width: auto;  
    word-break: break-word; 
    /* overflow: hidden;  */
    text-overflow: ellipsis; 
  }
  .chatbot__messages li {
    margin-bottom: 20px;
  }
  
  .chatbot__messages li.is-ai {
    display: inline-flex;
    align-items: flex-start;
  }
  
  .chatbot__messages li.is-user {
    text-align: right;
    display: inline-flex;
    align-self: flex-end;
  }
  
  .chatbot__messages li .is-ai__profile-picture {
    margin-right: 8px;
  }
  .chatbot__messages li .is-ai__profile-picture .icon-avatar {
    width: 40px;
    height: 40px;
    padding-top: 6px;
  }
  
  .chatbot__message {
    display: inline-block;
    padding: 12px 20px;
    word-break: break-word;
    margin: 0;
    border-radius: 6px;
    letter-spacing: -0.01em;
    line-height: 1.45;
    font-size: 16px;
    /* overflow: hidden; */
    /* width: 500px; */
    overflow-x: auto;
  }
  
  .chatbot__code{
    width: 10px;
    display: flex;
    margin-left: -200px;
    background-color: #f0f0f0;
  }
  
  .is-ai .chatbot__message {
    background-color: #f0f0f0;
    margin-right: 30px;
  }
  .is-user .chatbot__message {
    background-color: #7ee0d2;
    margin-left: 30px;
  }
  .chatbot__message a {
    color: #7226e0;
    word-break: break-all;
    display: inline-block;
  }
  .chatbot__message p:first-child {
    margin-top: 0;
  }
  .chatbot__message p:last-child {
    margin-bottom: 0;
  }
  .chatbot__message button {
    background-color: #fff;
    font-weight: 300;
    border: 2px solid #7226e0;
    border-radius: 50px;
    padding: 8px 20px;
    margin: -8px 10px 18px 0;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }
  .chatbot__message button:hover {
    background-color: #f2f2f2;
  }
  .chatbot__message button:focus {
    outline: none;
  }
  .chatbot__message img {
    max-width: 100%;
  }
  .chatbot__message .card {
    background-color: #fff;
    text-decoration: none;
    overflow: hidden;
    border-radius: 6px;
    color: black;
    word-break: normal;
  }
  .chatbot__message .card .card-content {
    padding: 20px;
  }
  .chatbot__message .card .card-title {
    margin-top: 0;
  }
  .chatbot__message .card .card-button {
    color: #7226e0;
    text-decoration: underline;
  }
  
  .animation:last-child {
    -webkit-animation: fadein 0.25s;
            animation: fadein 0.25s;
    -webkit-animation-timing-function: all 200ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
            animation-timing-function: all 200ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  
  .chatbot__arrow {
    width: 0;
    height: 0;
    margin-top: 18px;
  }
  
  .chatbot__arrow--right {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #7ee0d2;
  }
  
  .chatbot__arrow--left {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #f0f0f0;
  }
  
  .chatbot__entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    border: 3px solid #dfe1e5;
    border-radius: 0 0 0.303rem 0.303rem;
    border-top: 3px solid #e6eaee;
    background-color: #fff;
  }
  .chatbot--closed .chatbot__entry {
    display: none;
  }
  
  .chatbot__input {
    height: 100%;
    width: 100%;
    border: 0;
  }
  .chatbot__input:focus {
    outline: none;
  }
  .chatbot__input::-webkit-input-placeholder {
    color: #7f7f7f;
  }
  .chatbot__input::-moz-placeholder {
    color: #7f7f7f;
  }
  .chatbot__input::-ms-input-placeholder {
    color: #7f7f7f;
  }
  .chatbot__input::-moz-placeholder {
    color: #7f7f7f;
  }
  
  .chatbot__submit {
    fill: #7226e0;
    height: 22px;
    width: 22px;
    transition: fill 0.2s ease;
    cursor: pointer;
  }
  .chatbot__submit:hover {
    fill: #45148c;
  }
  
  .u-text-highlight {
    color: #47a99a;
  }
  
  .loader {
    margin-bottom: -2px;
    text-align: center;
    opacity: 0.3;
  }
  
  .loader__dot {
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    margin: 0 1px;
    background: black;
    border-radius: 50px;
    -webkit-animation: loader 0.45s infinite alternate;
            animation: loader 0.45s infinite alternate;
  }
  .loader__dot:nth-of-type(2) {
    -webkit-animation-delay: 0.15s;
            animation-delay: 0.15s;
  }
  .loader__dot:nth-of-type(3) {
    -webkit-animation-delay: 0.35s;
            animation-delay: 0.35s;
  }
  
  @-webkit-keyframes loader {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }
  
  @keyframes loader {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
      margin-top: 10px;
      margin-bottom: 0;
    }
    to {
      opacity: 1;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
      margin-top: 10px;
      margin-bottom: 0;
    }
    to {
      opacity: 1;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }

  /* Add more CSS rules for other chatbot elements as needed */
`;  

// newDiv.style.cssText = "transform: translateX(-50%); ";
document.head.appendChild(styleTag); 
// Load home.js
var script1 = document.createElement('script');
// script1.type = 'text/javascript';
// script1.src = './home.js';
// document.body.appendChild(script1); 

// // Load chat.js
// var script2 = document.createElement('script');
// script2.type = 'text/javascript';
// script2.src = './chat.js';
// document.body.appendChild(script2); 

document.body.appendChild(newDiv);

// Chat window Code
const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
const errorMessage = 'My apologies, I\'m not avail at the moment, however, feel free to call our support team directly helpdeskalpha@gmail.com.';
const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
const $document = document;
const $chatbot = $document.querySelector('.chatbot');
const $chatbotMessageWindow = $document.querySelector('.chatbot__message-window');
const $chatbotHeader = $document.querySelector('.chatbot__header');
const $chatIcon = $document.querySelector('.chatIcon');
const $chatbotMessages = $document.querySelector('.chatbot__messages');
const $chatbotInput = $document.querySelector('.chatbot__input');
// document.getElementById("chatbot__submitId").addEventListener("click", runAlphaSpeechRecognition);
document.getElementById("maxiId").addEventListener("click", maximize);

const speech = new SpeechSynthesisUtterance();
let modelText =""
const lambdaUrl = "wss://ghxp0dg2o7.execute-api.us-east-1.amazonaws.com/production/";

const botLoadingDelay = 1000;
const botReplyDelay = 2000;


// document.addEventListener('DOMContentLoaded', function () {
const chatbotContainer = document.querySelector('.chatbot-container');
const maximizeButton = document.querySelector('.chatbot__maximize-button');

maximizeButton.addEventListener('click', function () {
    chatbotContainer.classList.toggle('fullscreen');

    // Optional: Switch between maximize and minimize icons
    if (maximizeButton.classList.contains('fa-expand')) {
        maximizeButton.classList.remove('fa-expand');
        maximizeButton.classList.add('fa-compress');
    } else {
        maximizeButton.classList.remove('fa-compress');
        maximizeButton.classList.add('fa-expand'); 
    }
});
// });

function maximize() {
    const chatbot = document.querySelector('.chatbot');
    chatbot.style.width = '1500px';
    // chatbot.style.margin = '200px';
    chatbot.style.height = '400px';
}

const escapeScript = unsafe => {
    const safeString = unsafe.
    replace(/</g, ' ').
    replace(/>/g, ' ').
    replace(/&/g, ' ').
    replace(/"/g, ' ').
    replace(/\\/, ' ').
    replace(/\s+/g, ' ');
    return safeString.trim();
  };

  const resetInputField = () => {
    $chatbotInput.value = '';
  };


  const userMessage = (content, messageId) => {
    console.log(content,messageId)
    $chatbotMessages.innerHTML += `<li class='is-user animation'>
        <p class='chatbot__message' id="chatbot__message__${messageId}">
            ${content}
        </p>
        <span class='chatbot__arrow chatbot__arrow--right'></span>
    </li>`;
    speech.text = content;

  // Start speaking
  window.speechSynthesis.speak(speech);

  // Set a timeout to stop speaking after a certain duration
  var speakingDuration = 10000; // Duration in milliseconds (adjust as needed)
  var speakingTimer = setTimeout(function() {
    // Stop speaking after the duration
    window.speechSynthesis.cancel();
    recognition.start()
    console.log("Speech stopped after", speakingDuration, "milliseconds.");
  }, speakingDuration);

  // Event handler to clear the timeout if speech starts
  speech.onstart = function(event) {
    clearTimeout(speakingTimer); // Clear the timeout
    recognition.stop()
    console.log("Speech started.");
  };

  // Event handler to handle when speech ends
  speech.onend = function(event) {
    recognition.start()
    console.log("Speech ended.");
  };
  };

  const removeLoader = () => {
    let loadingElem = document.getElementById('is-loading');
    if (loadingElem) $chatbotMessages.removeChild(loadingElem);
  };

  const scrollDown = () => {
    const distanceToScroll =
    $chatbotMessageWindow.scrollHeight - (
    $chatbotMessages.lastChild.offsetHeight + 60);
    $chatbotMessageWindow.scrollTop = distanceToScroll;
    return false;
  };

  const aiMessage = (content,messageId,isLoading = false, delay = 0) => {
    // const messageText = content.getElementById(`chatbot__message__${messageId}`).innerText;
    console.log(content,messageId)
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const textContent = doc.body.textContent;
  
    setTimeout(() => {
      removeLoader();
      $chatbotMessages.innerHTML += `<li 
        class='is-ai animation' 
        id='${isLoading ? "is-loading" : ""}'>
          <div class="is-ai__profile-picture">
            <img class="icon-avatar" src="data:image/png;base64,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" alt="">
          </div>
          <span class='chatbot__arrow chatbot__arrow--left'></span>
          <div class='chatbot__message' id="chatbot__message__${messageId}">
              <code>
              <pre style="white-space: pre-wrap;">
              ${content}
              </pre>
              </code>
          </div>
          </li>`;
      scrollDown();
    }, delay);
    return content
  };

  const setResponse = (val, delay = 0) => {
    const messageId = Date.now();
    console.log(val)
    setTimeout(() => {
      const content = aiMessage(markdownToText(val),messageId);
      if (content){
        speech.text=content;
        window.speechSynthesis.speak(speech);

  // Set a timeout to stop speaking after a certain duration
  var speakingDuration = 5000; // Duration in milliseconds (adjust as needed)
  var speakingTimer = setTimeout(function() {
    // Stop speaking after the duration
    window.speechSynthesis.cancel();
    recognition.start()
    console.log("Speech stopped after", speakingDuration, "milliseconds.");
  }, speakingDuration);

  // Event handler to clear the timeout if speech starts
  speech.onstart = function(event) {
    clearTimeout(speakingTimer); // Clear the timeout
    recognition.stop()
    console.log("Speech started.");
  };

  // Event handler to handle when speech ends
  speech.onend = function(event) {
    recognition.start()
    console.log("Speech ended.");
  };
      }
    }, delay);
  };

  async function query(text) {
    // const api_url = `https://api-inference.huggingface.co/models/${model_id}`;
    const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyAphkdgx8JciotjHJXHXckEm7UijJMmcYI`;
    // const headers = {"Authorization": `Bearer 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`}; // Replace with your actual API key
    const payload = {
      contents: [
        { 
        role:"user",
        parts: [{ 
          text: text 
        }] 
      }
    ]
    };
    // const payload = {"inputs": text}
  
    console.log(`Querying...: ${text}`);
  
    try {
      // Use fetch for API requests in JavaScript
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer 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`,
          // 'Authorization': `Bearer AIzaSyAphkdgx8JciotjHJXHXckEm7UijJMmcYI`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload) 
      });
  
      const data = await response.json();
      console.log(data)
      let result = data.candidates[0].content.parts[0].text;
      modelText = result;
      // let result = data[0].generated_text;
      // if (result.includes('I am Gemini, a large multi-modal model, trained by Google')){
      //   console.log("hiii")
      //   result = "I am Alpha, a large multi-modal model, trained by Team Alpha" + " I am designed to understand and generate human language, and to answer questions and provide information to the best of my abilities.";
      //   return result;
      // }
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error with API call:", error);
      return "Network Error, please try again later"; // Handle errors gracefully 
    }
  }


  async function send(text = '') {
    try {
      // Show a loading indicator since the query might take time
      const messageId = Date.now();
      aiMessage(loader, messageId, true, botLoadingDelay);
      let txt=text.toLowerCase();
      // Use the query function to get the model's response
      if (text.toLowerCase().includes("alpha")){
        txt = text.replace(/\balpha\b/g, "Gemini");
      }
      console.log(txt);
      let queryResult = await query(txt);
      console.log(queryResult)
  
      // Update the UI with the response 
      if (queryResult.toLowerCase().includes("google")|| queryResult.toLowerCase().includes("gemini")){
          queryResult = queryResult.replace(/\bYes\b/g, "No");
      }
      if (queryResult.includes("I'm") || queryResult.includes("I am")) {
        // Replace "Gemini" with "Aquarius"
        queryResult = queryResult.replace(/\bGemini\b/g, "Alpha");
        
        // Replace "Google" with "Alphabet"
        queryResult = queryResult.replace(/\bGoogle\b/g, "Team Alpha");
        console.log(queryResult)
        setResponse(queryResult, botLoadingDelay + botReplyDelay);
      }
  
      // if (queryResult.includes('I am Gemini, a large multi-modal model, trained by Google')){
      //   console.log("hiii")
      //   queryResult= "I am Alpha, a large multi-modal model, trained by Team Alpha" + " I am designed to understand and generate human language, and to answer questions and provide information to the best of my abilities.";
      //   // return result;
      //   setResponse(queryResult, botLoadingDelay + botReplyDelay);
      // }
      else{
        setResponse(queryResult, botLoadingDelay + botReplyDelay);
      }
    } catch (error) {
      setResponse(errorMessage, botLoadingDelay + botReplyDelay);
      resetInputField();
      console.log(error); 
    }
  }


const validateMessage = () => {
    const text = $chatbotInput.value;
    const safeText = text ? escapeScript(text) : '';
    if (safeText.length && safeText !== ' ') {
      resetInputField();
      // Generate a unique message ID based on the current timestamp
      const messageId = Date.now();
      userMessage(safeText, messageId);
      send(safeText);
    }
    scrollDown();
    return;
  };

document.addEventListener('keypress', event => {
  if (event.which == 13) validateMessage();
}, false);

const toggle = (element, klass) => {
  const classes = element.className.match(/\S+/g) || [],
  index = classes.indexOf(klass);
  index >= 0 ? classes.splice(index, 1) : classes.push(klass);
  element.className = classes.join(' ');
};

$chatbotHeader.addEventListener('click', () => {
  toggle($chatbot, 'chatbot--closed');
  $chatbotInput.focus();
  const chatbotContainer = document.querySelector('.chatbot-container');

  if (maximizeButton.classList.contains('fa-expand')) {
    maximizeButton.classList.remove('fa-expand');
    maximizeButton.classList.add('fa-compress');
} else {
    maximizeButton.classList.remove('fa-compress');
    maximizeButton.classList.add('fa-expand'); 
}

chatbotContainer.classList.remove('fullscreen');
flag=true;
}, false);

// $chatIcon.addEventListener('click', () => {
//   toggle($chatbot, 'chatbot--closed');
//   $chatbotInput.focus();
// }, false);

// $chatbotSubmit.addEventListener('click', () => {
//   validateMessage();
//   // streamAudioToWebSocket(lambdaUrl)
// }, false);

// var draggable = document.getElementById('chatIcon1');
var draggable = document.getElementById('chatbotId');

var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

draggable.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

function mouseDown(e) {
  e.preventDefault();
  posX = e.clientX - draggable.offsetLeft;
  posY = e.clientY - draggable.offsetTop;
  window.addEventListener('mousemove', moveElement, false);
}

function mouseUp() {
  window.removeEventListener('mousemove', moveElement, false);
}

function moveElement(e) {
  mouseX = e.clientX - posX;
  mouseY = e.clientY - posY;
  draggable.style.left = mouseX + 'px';
  draggable.style.top = mouseY + 'px';
}

let isDragging = false;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function toggleIcon() {
  var chatIcon = document.getElementById("chatIcon1");
  if (chatIcon.src.endsWith("chat.svg")) {
    chatIcon.src = "./public/close-circle-svgrepo-com.svg";
  } else {
    chatIcon.src = "./chat.svg";
  }
}

// function runAlphaSpeechRecognition() {
//   // console.log("Running Speech Recog");
//   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//   // // get output div reference
//   // var output = document.getElementById("output");
//   // // get action element reference
//   // var action = document.getElementById("action");
//   window.speechSynthesis.cancel()
  
//   let inputField = document.querySelector('.chatbot__input');
//   inputField.placeholder = "Listening...";
//   // new speech recognition object
//   var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
//   var recognition = new SpeechRecognition();
//   // recognition.continuous = true;

//   // This runs when the speech recognition service starts

//   navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(function(stream) {
//           // Pass the stream to the recognition object
//           recognition.stream = stream;

//           recognition.onstart = function() {
//               // action.innerHTML = "<small>listening, please speak ...</small>";
//               inputField.placeholder = "Listening...";
//               console.log("Onstart");
//           };
          
//           recognition.onspeechend = function() {
//               // action.innerHTML = "<small>stopped listening, hope you are done ...</small>";               
//               recognition.stop();
//               console.log("Onspeed");
//           }
          
//           // This runs when the speech recognition service returns result
//           recognition.onresult = function(event) {
//               var transcript = event.results[0][0].transcript;
//               console.log(event);
//               // output.innerHTML = transcript;
//                   inputField.placeholder = transcript;
//                   userMessage(transcript);
//                   send(transcript);
//               // const temp = transcript.toLowerCase();


//               // sendDataToLambda(stream);
//               // startAudioStream(stream);
//               // output.classList.remove("hide");
//           };
//         })
//         .catch(function(error) {
//             console.error('Error accessing microphone:', error);
//         });
//         recognition.start();
// }

const copyContent = async (text,messageId) => {
  console.log(text)
  const decodedContent = decodeURIComponent(text);

  try {
    const image = document.getElementById(`msg_img_${messageId}`);
    console.log(`msg_img_${messageId}`)
      // const output = document.getElementById(`output_${messageId}`);
      const output = document.getElementById("output");
      await navigator.clipboard.writeText(decodedContent);
      output.innerHTML = "Message copied to clipboard!";
      output.style.display = "block";
      image.src = "./public/clipboard-success.svg";
      setTimeout(function() {
        image.src = "./public/clipboard-text-svgrepo-com.svg";
        output.style.display = "none";
      }, 5000);
      console.log('Content copied to clipboard');
  } catch (err) {
      console.error('Failed to copy: ', err);
  }
};
{/* <img src="./public/clipboard-text-svgrepo-com.svg" class="copy_msg" id="msg_img_${messageId}" onclick="copyContent('${content.replace(/'/g, "\\'")}','${messageId}')" alt=""> */}



{/* <img src="./public/clipboard-text-svgrepo-com.svg" class="copy_msg" id="msg_img_${messageId}" onclick="copyContent('${textContent.replace(/'/g, "\\'")}','${messageId}')" alt=""> */}







const linkify = inputText => {
  return inputText.replace(urlPattern, `<a href='$1' target='_blank'>$1</a>`);
};



const multiChoiceAnswer = text => {
  
  const decodedText = text.replace(/zzz/g, "'");
  userMessage(decodedText);
  send(decodedText);
  scrollDown();
  return;
};

const processResponse = val => {

  if (val && val.fulfillment) {
    let output = '';
    let messagesLength = val.fulfillment.messages.length;

    for (let i = 0; i < messagesLength; i++) {if (window.CP.shouldStopExecution(0)) break;
      let message = val.fulfillment.messages[i];
      let type = message.type;

      switch (type) {
        // 0 fulfillment is text
        case 0:
          let parsedText = linkify(message.speech);
          output += `<p>${parsedText}</p>`;
          break;

        // 1 fulfillment is card
        case 1:
          let imageUrl = message.imageUrl;
          let imageTitle = message.title;
          let imageSubtitle = message.subtitle;
          let button = message.buttons[0];

          if (!imageUrl && !button && !imageTitle && !imageSubtitle) break;

          output += `
            <a class='card' href='${button.postback}' target='_blank'>
              <img src='${imageUrl}' alt='${imageTitle}' />
            <div class='card-content'>
              <h4 class='card-title'>${imageTitle}</h4>
              <p class='card-title'>${imageSubtitle}</p>
              <span class='card-button'>${button.text}</span>
            </div>
            </a>
          `;
          break;

        // 2 fulfillment is a quick reply with multi-choice buttons
        case 2:
          let title = message.title;
          let replies = message.replies;
          let repliesLength = replies.length;
          output += `<p>${title}</p>`;

          for (let i = 0; i < repliesLength; i++) {if (window.CP.shouldStopExecution(1)) break;
            let reply = replies[i];
            let encodedText = reply.replace(/'/g, 'zzz');
            output += `<button onclick='multiChoiceAnswer("${encodedText}")'>${reply}</button>`;
          }window.CP.exitedLoop(1);
          break;}

    }window.CP.exitedLoop(0);

    removeLoader();
    return output;
  }

  removeLoader();
  return `<p>${errorMessage}</p>`;
};

function markdownToText(markdown) {
  // Handle headings
  markdown = markdown.replace(/^# (.*$)/gim, '$1');

  // Handle bold
  markdown = markdown.replace(/\*\*(.*)\*\*/gim, '$1'); 

  // Handle italics
  markdown = markdown.replace(/_(.*)_/gim, '$1');

  // Handle basic links (assumes no link title)
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/gim, '$1 ($2)'); 

  return markdown;
}


// function replaceText(text) {
//   return text.replace("I am Alpha, a large multi-modal model, trained by Team Alpha","I am Gemini, a large multi-modal model, trained by Google");
// }




async function streamAudioToWebSocket(websocketUrl) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  console.log('Listening...');
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks = [];
  
  let inputField = document.querySelector('.chatbot__input');

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64AudioData = reader.result;
      // Ensure the WebSocket is created inside the onloadend to wait for the Base64 data
      const websocket = new WebSocket(websocketUrl);

      websocket.onopen = () => {
        console.log('websocket open');

        websocket.send(JSON.stringify({
          "action": "sendAudio",
          "data": base64AudioData.split('base64,')[1] // Remove the data URL part
        }))
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      websocket.onmessage = (event) => {
        console.log("Response from Lambda:", event.data);
      };

      websocket.onclose = () => {
        console.log("WebSocket is closed now.");
        inputField.placeholder = "Stoped Listening...";

      };
    };

    reader.readAsDataURL(blob);
  };

  mediaRecorder.start();
  inputField.placeholder = "Listening...";

  // Automatically stop recording after a set period (e.g., 5 seconds)
  setTimeout(() => {
    mediaRecorder.stop();
  }, 12000); // Adjust as needed
}

// document
// .addEventListener('mouseup', () => {

//     const nativeSelection = document.getSelection()
//     const nativeRange = nativeSelection.rangeCount ? nativeSelection.getRangeAt(0) : undefined

//     let selectedText = nativeSelection.toString();
//     let collapsed = nativeRange.collapsed;
//     let startOffset = nativeRange.startOffset;
//     let endOffset = nativeRange.endOffset;
//     let startParentId = nativeRange.startContainer.parentElement.id;
//     let endParentId = nativeRange.endContainer.parentElement.id;

//     console.log(`The selection is between ${startOffset} and ${endOffset} inside the containers ${startParentId} and ${endParentId}`)
//     console.log(`The selected text is (${selectedText})`)
//     alert(selectedText)

// });


// const callback = function(mutationsList, observer) {
//     for (const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             // New anchors might have been added 
//             mutation.addedNodes.forEach(node => {
//                 if (node.nodeName === 'A') { // Only process <a> elements
//                     console.log(node.href,"HII");
//                     node.style.backgroundColor = 'green';
//                 }
//             });
//         } else if (mutation.type === 'attributes') {
//             // An existing anchor's attributes might have changed
//             console.log('Anchor attributes changed:', mutation.target);
//         }
//     }
// };

// const observer = new MutationObserver(callback);
// observer.observe(targetNode, config);

// console.log(anchor.forEach(anchor => {
    
//     console.log(anchor.href);
//     anchor.style.backgroundColor = 'green';

// }));

// Apply the style to each div
// allYellowDivs.forEach(div => {
//   div.style.backgroundColor = 'yellow';
// });

const h3Elements = document.querySelectorAll('.LC20lb');

h3Elements.forEach((h3Element, index) => {
  const numberSpan = document.createElement('span');
  numberSpan.textContent = `${index + 1}. `; 
  h3Element.prepend(numberSpan); 
});

const relatedSearch = document.querySelectorAll('.s75CSd');

// Apply the style to each div
// relatedSearch.forEach(div => {
//   div.style.backgroundColor = 'blue';
// });


const divElements = document.querySelectorAll('.yuRUbf');


// function extractAndHandleLink() {
//     const firstResultLink = document.querySelector('.r > a[href]');
//     console.log(firstResultLink)
//     if (firstResultLink) {
//         const href = firstResultLink.href;
//         // Send the link to the background script for further processing
//         chrome.runtime.sendMessage({ type: "extractedLink", link: href }); 
//     }
// }

// // Trigger extraction when the search results page is updated
// const targetNode = document.getElementById('search');
// const config = { attributes: true, childList: true, subtree: true };
// const observer = new MutationObserver(extractAndHandleLink);
// observer.observe(targetNode, config); 

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {


    // Get the maximum scroll height of the document
    const maxScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;


        const searchInput = document.getElementById('APjFqb');
        const searchButton = document.getElementsByClassName('Tg7LZd')[0]; 

    // Start speech recognition when the window loads
    window.onload = () => {
        recognition.start();
    };

    // Event listener for speech recognition results
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase(); // Convert command to lowercase
        console.log(command);
        let prev;
        console.log(flag);
        if (flag){
            if (searchInput){
                prev = searchInput.value;
                searchInput.value = command;
            }
            if(command === "hey alpha"|| command ==="ok alpha"|| command === "alpha"){
                contentSpeech.text="Hi there 🖐. I’m Alpha, your virtual assistant. I'm here to help with your general enquiries.";
                window.speechSynthesis.speak(contentSpeech);
                toggle($chatbot, 'chatbot--closed');
                $chatbotInput.focus();
                flag=false;
            }
            else{
    
            if(command == "back"){
            contentSpeech.text="Going back";
            window.speechSynthesis.speak(contentSpeech);
            window.history.back();
            }
            
            if (command == "forward"){
            contentSpeech.text="Going forward";
            window.speechSynthesis.speak(contentSpeech);
            window.history.forward();
            }
    
            if (command == "reload"){
            contentSpeech.text="Reloading";
            window.speechSynthesis.speak(contentSpeech);
            window.location.reload();
            }
    
            if (command == "clear search"){
            searchInput.value=" ";
            }
    
            if (command == "search") {
                contentSpeech.text="Searching";
                window.speechSynthesis.speak(contentSpeech);
                const searchQuery = prev ? prev : command; 
                const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                window.location.href = googleSearchUrl; 
            }
    
            // Check if the command matches 'next' or 'previous' followed by a word
            const match = command.match(/^(next|previous) (\w+)/);
            if (match) {
            contentSpeech.text="Moving to"+command;
            window.speechSynthesis.speak(contentSpeech);
            chrome.runtime.sendMessage({message: match[1]},(response)=>{
                console.log(response.message);
            })
                // moveTabs(match[1]);
            }
    
        //   close tabs
        if (command.includes("close current tab")){
            contentSpeech.text="Closing current Tab";
            window.speechSynthesis.speak(contentSpeech);
            chrome.runtime.sendMessage({message: "close current tab"},(response)=>{
                console.log(response.message);
            })
        }
        if (command.includes("close tab")){
            const clickMatch = command.match(/\b(\w+)$/);
            console.log(clickMatch)
            if (clickMatch) {
            const numberWord = clickMatch[1].toLowerCase();
            let targetIndex;
    
            if (!isNaN(numberWord)) {
                console.log("The variable is a number.");
                targetIndex = parseInt(numberWord)
            } else {
                targetIndex = numberWords[numberWord];
                console.log("The variable is not a number.");
                }
    
            contentSpeech.text="Closing Tab"+targetIndex;
            window.speechSynthesis.speak(contentSpeech);
            chrome.runtime.sendMessage({message: "close tab", tab:{targetIndex}},(response)=>{
                console.log(response.message);
            })
            }
        }
    
        if (command.includes("close window")){
            contentSpeech.text="Closing Window";
            window.speechSynthesis.speak(contentSpeech);
            chrome.runtime.sendMessage({message: "close window"},(response)=>{
                console.log(response.message);
            })
        }

        if (command.includes("open")){
          const transcript = command.replace("open", "opening");
          contentSpeech.text=transcript;
          window.speechSynthesis.speak(contentSpeech);
          chrome.runtime.sendMessage({message: "open", tab:{command}},(response)=>{
                console.log(response.message);
            })
        }

        if (command.includes("close")){
          const transcript = command.replace("close", "closing");
          contentSpeech.text=transcript;
          window.speechSynthesis.speak(contentSpeech);
          chrome.runtime.sendMessage({message: "close", tab:{command}},(response)=>{
                console.log(response.message);
            })
        }
        
            if (command.includes("go to tab") || command.includes("goto tab")){
            const match = command.match(/\d+/);
            if(match){
                contentSpeech.text="Moving to Tab"+match[0];
                window.speechSynthesis.speak(contentSpeech);
                chrome.runtime.sendMessage({message: match[0]},(response)=>{
                    console.log(response.message);
                })
            }
            }
            
            if (command.includes("click on link")){
            const clickMatch = command.match(/\b(\w+)$/);
            console.log(clickMatch)
            if (clickMatch) {
                    const linkNumber = clickMatch[1].toLowerCase();
                    const targetLink = findH3ByNumber(linkNumber); 
                    console.log(targetLink)
                
                    if (targetLink) {
                    //   const linkUrl = targetLink.href;
                        // Try redirection:
                        contentSpeech.text="Opening"+targetLink;
                        window.speechSynthesis.speak(contentSpeech);
                        window.location.href = targetLink;  
                        // Or, provide the URL to the user if redirection fails 
                    } else {
                        console.log(`Could not find link corresponding to ${linkNumber}`);
                    }
                }
    
                // Handle scrolling commands
            }

            // Function to handle visibility change
            handleScrollCommands(command);

            };
            function findH3ByNumber(numberWord) {
            // ... Logic to find the <h3> based on 'first', 'second', etc.
            let targetIndex;
            if (!isNaN(numberWord)) {
                console.log("The variable is a number.");
                targetIndex = parseInt(numberWord)
            } else {
                targetIndex = numberWords[numberWord];
                console.log("The variable is not a number.");
            }
            console.log(numberWord,targetIndex)
            const h3Element = document.querySelectorAll('.LC20lb')[targetIndex - 1]; 
            console.log(h3Element)
            let url=null;
            const anchorElement = divElements[targetIndex-1].querySelector('a');
            url = anchorElement.getAttribute('href');
            console.log(url);
                        
            // divElements.forEach(divElement => {
            //     // Find the h3 element within the current div
            //     const test = divElement.querySelector('h3');
            //     console.log(test);
            //     // Check if h3 element exists within the current div
            //     if (h3Element == test) {
            //         // Find the anchor element within the current div
            //         const anchorElement = divElement.querySelector('a');
                    
            //         // Check if anchor element exists within the current div
            //         if (anchorElement) {
            //             // Get the URL from the href attribute of the anchor element
            //             url = anchorElement.getAttribute('href');
            //             console.log(url);
            //             return;
            //         }
            //     }
            // });
            // if (h3Element) {
            //     // Find the <a> element within the structure
            //     const linkElement = h3Element.parentNode.querySelector('a[jsname="UWckNb"]');
            //     return linkElement;  
            //   } else {
            //     return null;
            //   } 
            return url;
        }
        }
        else{
            let inputField = document.querySelector('.chatbot__input');
            if(command === "stop alpha"){
                window.speechSynthesis.cancel();
                toggle($chatbot, 'chatbot--closed');
                const chatbotContainer = document.querySelector('.chatbot-container');

                if (maximizeButton.classList.contains('fa-expand')) {
                    maximizeButton.classList.remove('fa-expand');
                    maximizeButton.classList.add('fa-compress');
                } else {
                    maximizeButton.classList.remove('fa-compress');
                    maximizeButton.classList.add('fa-expand'); 
                }

                chatbotContainer.classList.remove('fullscreen');
                flag=true;
            }
            else{
                inputField.placeholder = command;
                let transcript = command;
                userMessage(transcript);
                send(transcript);
            }
        }
        
    };
    function checkVisibility() {
      const visibilityHandler = () => {
      //   console.log('visibility change');
          if (document.visibilityState !== "visible") {
              recognition.stop(); // Stop recognition when tab is inactive
          } else {
              recognition.start(); // Start recognition when tab is active
          }
      };

      document.addEventListener('visibilitychange', visibilityHandler);
      visibilityHandler(); // Call visibilityHandler immediately to handle current visibility state
  }
    recognition.onend = () => {
      checkVisibility();
    };
} else {
    console.error("Web Speech API not supported in this browser");
}


function closeTabs(tab){
    console.log(tab);
    if(tab.includes('current')){
        window.close();
    }
    else{
        const match = tab.match(/\d+/);
        let number;
        if (match){
            number = parseInt(match[0], 10);
        }
        else{
            for (const [word, digit] of Object.entries(numberWords)) {
                if (tab.includes(word)) {
                  number = digit;
                  break; // Stop searching once the first number word is found
                }
              }
        }
        const tabPosition = number;
        chrome.tabs.query({currentWindow: true}, function(tabsArray) {
            // Check if the specified tab exists
            if (tabPosition > 0 && tabPosition <= tabsArray.length) {
                // Adjust for 0-based indexing used by Chrome
                var tabIndex = tabPosition - 1;
                chrome.tabs.remove(tabsArray[tabIndex].id);
            } else {
                console.log("Tab position is out of range.");
            }
        });
    }
}


let lastScrollTop = 0;


// Function to handle scrolling commands
function handleScrollCommands(command) {
  // Scroll down
  if (command.includes("scroll down") || command.includes("go down")) {
    if (command.includes("scroll down") ){
        console.log("hiii")
        // let contentSpeech = new SpeechSynthesisUtterance();
        contentSpeech.text="Scrolling down..";
    }
    else{
        contentSpeech.text="Going down...";
        // window.speechSynthesis.speak(contentSpeech);
    }
      window.speechSynthesis.speak(contentSpeech);
      window.scrollBy(0, 550);
  }
  
  else if(command.includes("scroll little bit down")){
    contentSpeech.text="Scrolling little bit down..";
    window.speechSynthesis.speak(contentSpeech);
  window.scrollBy(0, 100);
}
  // Scroll up
  else if (command.includes("scroll up") || command.includes("go up")) {
      if(command === "scroll up"){
          contentSpeech.text="Scrolling up..";
          window.speechSynthesis.speak(contentSpeech);
      }
      else{
          contentSpeech.text="Going up...";
          window.speechSynthesis.speak(contentSpeech);
      }
      window.scrollBy(0, -550);
  }
  else if(command.includes("scroll little bit up")){
      contentSpeech.text="Scrolling little bit up..";
      window.speechSynthesis.speak(contentSpeech);
      window.scrollBy(0, -100);
  }
  // Scroll to top
  else if (command.includes("go to top") || command.includes("scroll to top")) {
      if(command === "scroll to top"){
          contentSpeech.text="Scrolling to top..";
          window.speechSynthesis.speak(contentSpeech);
      }
      else{
          contentSpeech.text="Going to top...";
          window.speechSynthesis.speak(contentSpeech);
      }
      window.scrollTo(0, 0);
  }
  // Scroll to bottom
  else if (command.includes("go to bottom") || command.includes("scroll to bottom")) {
      if(command === "scroll to bottom"){
          contentSpeech.text="Scrolling to bottom..";
          window.speechSynthesis.speak(contentSpeech);
      }
      else{
          contentSpeech.text="Going to bottom...";
          window.speechSynthesis.speak(contentSpeech);
      }
      window.scrollTo(0, document.body.scrollHeight);
  }
  // Scroll to half of the page
  else if (command.includes("go to half") || command.includes("scroll to half")) {
      if(command === "scroll to half"){
          contentSpeech.text="Scrolling to half..";
          window.speechSynthesis.speak(contentSpeech);
      }
      else{
          contentSpeech.text="Going to half...";
          window.speechSynthesis.speak(contentSpeech);
      }
      window.scrollTo(0, document.body.scrollHeight / 2);
  }
  // Handle other scroll commands
  else if (command.includes("scroll to") ||
      command.includes("move to") ||
      command.includes("scroll by") ||
      command.includes("move by") ||
      command.includes("scroll") ||
      command.includes("move")) {
      // Handle scrolling by percentage
      if (command.includes("percentage") || command.includes("percent") || command.includes("%")) {
          if (command.includes("scroll to")){
              contentSpeech.text="Scrolling to percentage..";
              window.speechSynthesis.speak(contentSpeech);
          }
          else if (command.includes("move to")){
              contentSpeech.text="Moving to percentage..";
              window.speechSynthesis.speak(contentSpeech);
          }
          else if (command.includes("scroll by")){
              contentSpeech.text="Scrolling by percentage..";
              window.speechSynthesis.speak(contentSpeech);
          }else if(command.includes("move by")){
              contentSpeech.text="Moving by percentage..";
              window.speechSynthesis.speak(contentSpeech);
          }else if(command.includes("scroll")){
              contentSpeech.text="Scrolling percentage..";
              window.speechSynthesis.speak(contentSpeech);
          }
          else{
              contentSpeech.text="Moving percentage..";
              window.speechSynthesis.speak(contentSpeech);
          }
          handleScrollByPercentage(command);
      }
      // Handle scrolling by pixel
      else if (command.includes("pixel") || command.includes("pixels") || command.includes("px")) {
          if (command.includes("scroll to")){
              contentSpeech.text="Scrolling to pixel..";
              window.speechSynthesis.speak(contentSpeech);
          }else if(command.includes("move to")){
              contentSpeech.text="Moving to pixel..";
              window.speechSynthesis.speak(contentSpeech);
          }else if(command.includes("scroll by")){
              contentSpeech.text="Scrolling by pixel..";
              window.speechSynthesis.speak(contentSpeech);
          }else if(command.includes("move by")){
              contentSpeech.text="Moving by pixel..";
              window.speechSynthesis.speak(contentSpeech);
          }else if(command.includes("scroll")){
              contentSpeech.text="Scrolling pixel..";
              window.speechSynthesis.speak(contentSpeech);
          }
          else{
              contentSpeech.text="Moving pixel..";
              window.speechSynthesis.speak(contentSpeech);
          }
          handleScrollByPixel(command);
      }
  }
}

// Function to handle scrolling by percentage
function handleScrollByPercentage(command) {
  let pert;
  if (command.includes("percentage")) {
      pert = command.split("percentage");
  } else if (command.includes("%")) {
      pert = command.split("%");
  } else if (command.includes("percent")) {
      pert = command.split("percent");
  }
  const number = pert[0].trim().split(" ").reverse()[0];
  if (number !== undefined && number !== null && !/^[a-zA-Z].*/.test(number)) {
      window.scrollTo(0, (parseInt(number) / 100) * maxScroll);
  }
}

// Function to handle scrolling by pixel
function handleScrollByPixel(command) {
  let pert;
  if (command.includes("pixels")) {
      pert = command.split("pixels");
  } else if (command.includes("pixel")) {
      pert = command.split("pixel");
  } else if (command.includes("px")) {
      pert = command.split("px");
  }
  const number = pert[0].trim().split(" ").reverse()[0];
  if (number !== undefined && number !== null && !/^[a-zA-Z].*/.test(number)) {
      if (command.includes("up") || command.includes("down")) {
          if (pert[1].trim() === "up") {
              window.scrollBy(0, -parseInt(number));
          }
          if (pert[1].trim() === "down") {
              window.scrollBy(0, parseInt(number));
          }
      } else {
          window.scrollTo(0, parseInt(number));
      }
  }
}



