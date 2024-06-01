const accessToken = '3796899bd37c423bad3a21a25277bce0';
const baseUrl = 'https://api.api.ai/api/query?v=2015091001';
const sessionId = '20150910';
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
// const $chatbotSubmit = $document.querySelector('.chatbot__submit');
// const text = document.getElementById('chatbot__message__Id').innerHTML;
document.getElementById("chatbot__submitId").addEventListener("click", runAlphaSpeechRecognition);
const speech = new SpeechSynthesisUtterance();
speech.voice = window.speechSynthesis.getVoices()[7];

let modelText =""
const lambdaUrl = "wss://ghxp0dg2o7.execute-api.us-east-1.amazonaws.com/production/";

const botLoadingDelay = 1000;
const botReplyDelay = 2000;

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
}, false);

$chatIcon.addEventListener('click', () => {
  toggle($chatbot, 'chatbot--closed');
  $chatbotInput.focus();
}, false);

// $chatbotSubmit.addEventListener('click', () => {
//   validateMessage();
//   // streamAudioToWebSocket(lambdaUrl)
// }, false);

var draggable = document.getElementById('chatIcon1');
// var draggable = document.getElementById('chatbotId');

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

function runAlphaSpeechRecognition() {
  // console.log("Running Speech Recog");
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  // // get output div reference
  // var output = document.getElementById("output");
  // // get action element reference
  // var action = document.getElementById("action");
  window.speechSynthesis.cancel()
  
  let inputField = document.querySelector('.chatbot__input');
  inputField.placeholder = "Listening...";
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  // recognition.continuous = true;

  // This runs when the speech recognition service starts

  navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
          // Pass the stream to the recognition object
          recognition.stream = stream;

          recognition.onstart = function() {
              // action.innerHTML = "<small>listening, please speak ...</small>";
              inputField.placeholder = "Listening...";
              console.log("Onstart");
          };
          
          recognition.onspeechend = function() {
              // action.innerHTML = "<small>stopped listening, hope you are done ...</small>";               
              recognition.stop();
              console.log("Onspeed");
          }
          
          // This runs when the speech recognition service returns result
          recognition.onresult = function(event) {
              var transcript = event.results[0][0].transcript;
              console.log(event);
              // output.innerHTML = transcript;
              inputField.placeholder = transcript;
              userMessage(transcript);
              // speech.text=transcript;
              // window.speechSynthesis.speak(speech);
              send(transcript);
              // const temp = transcript.toLowerCase();


              // sendDataToLambda(stream);
              // startAudioStream(stream);
              // output.classList.remove("hide");
          };
        })
        .catch(function(error) {
            console.error('Error accessing microphone:', error);
        });
        recognition.start();
}

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

const userMessage = (content, messageId) => {
  console.log(content,messageId)
  $chatbotMessages.innerHTML += `<li class='is-user animation'>
      <p class='chatbot__message' id="chatbot__message__${messageId}">
          ${content}
      </p>
      <span class='chatbot__arrow chatbot__arrow--right'></span>
  </li>`;
  speech.text=content;
  speech.voice = window.speechSynthesis.getVoices()[7];
  window.speechSynthesis.speak(speech);
};

{/* <img src="./public/clipboard-text-svgrepo-com.svg" class="copy_msg" id="msg_img_${messageId}" onclick="copyContent('${textContent.replace(/'/g, "\\'")}','${messageId}')" alt=""> */}

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

const removeLoader = () => {
  let loadingElem = document.getElementById('is-loading');
  if (loadingElem) $chatbotMessages.removeChild(loadingElem);
};

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

const linkify = inputText => {
  return inputText.replace(urlPattern, `<a href='$1' target='_blank'>$1</a>`);
};

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


const setResponse = (val, delay = 0) => {
  const messageId = Date.now();
  console.log(val)
  setTimeout(() => {
    const content = aiMessage(markdownToText(val),messageId);
    if (content){
      speech.text=content;
      speech.voice = window.speechSynthesis.getVoices()[0];
      window.speechSynthesis.speak(speech);
    }
  }, delay);
};

const resetInputField = () => {
  $chatbotInput.value = '';
};

const scrollDown = () => {
  const distanceToScroll =
  $chatbotMessageWindow.scrollHeight - (
  $chatbotMessages.lastChild.offsetHeight + 60);
  $chatbotMessageWindow.scrollTop = distanceToScroll;
  return false;
};


// function replaceText(text) {
//   return text.replace("I am Alpha, a large multi-modal model, trained by Team Alpha","I am Gemini, a large multi-modal model, trained by Google");
// }

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



