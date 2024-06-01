document.getElementById("btn-speech").addEventListener("click", runSpeechRecognition);
document.getElementById("maxiId").addEventListener("click", maximize);

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


document.addEventListener('DOMContentLoaded', function () {
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
});

const webSearch= new SpeechSynthesisUtterance();

function maximize() {
    const chatbot = document.querySelector('.chatbot');
    chatbot.style.width = '1500px';
    // chatbot.style.margin = '200px';
    chatbot.style.height = '400px';
}

function runSpeechRecognition() {
    // console.log("Running Speech Recog");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // // get output div reference
    // var output = document.getElementById("output");
    // // get action element reference
    // var action = document.getElementById("action");

    let inputField = document.querySelector('.input');
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
                webSearch.text="Listening ";
                window.speechSynthesis.speak(webSearch);
                console.log("Onstart");
            };
            
            recognition.onspeechend = function() {
                // action.innerHTML = "<small>stopped listening, hope you are done ...</small>";               
                recognition.stop();
                // webSearch.text="Stopped Listening";
                // window.speechSynthesis.speak(webSearch);
                console.log("Onspeed");
            }
            
            // This runs when the speech recognition service returns result
            recognition.onresult = function(event) {
                var transcript = event.results[0][0].transcript;
                console.log(event);
                // output.innerHTML = transcript;
                inputField.placeholder = transcript;
                
                const temp = transcript.toLowerCase();
                if (temp === 'close window'){
                    webSearch.text = "Closing window";
                    window.speechSynthesis.speak(webSearch);
                  window.close();
                }
                else if (temp === 'hey alpha'|| temp=== "ok alpha" || temp === "alpha" || temp=== "hello alpha"){
                    const $chatbot = $document.querySelector('.chatbot');
                    const classes = $chatbot.className.match(/\S+/g) || [],
                    index = classes.indexOf('chatbot--closed');
                    index >= 0 ? classes.splice(index, 1) : classes.push('chatbot--closed');
                    $chatbot.className = classes.join(' ');
                    webSearch.text = "Hi there 🖐. I’m Alpha, your virtual assistant. I'm here to help with your general enquiries."
                    window.speechSynthesis.speak(webSearch)
                }
                else{
                    openTabs(transcript);
                }
                // sendDataToLambda(stream);
                startAudioStream(stream);
                // output.classList.remove("hide");
            };
          })
          .catch(function(error) {
              console.error('Error accessing microphone:', error);
          });
          recognition.start();
}

// const toggle = (element, klass) => {
//   const classes = element.className.match(/\S+/g) || [],
//   index = classes.indexOf(klass);
//   index >= 0 ? classes.splice(index, 1) : classes.push(klass);
//   element.className = classes.join(' ');
// };


function openTabs(transcript) {
    console.log(transcript);
    webSearch.voice = window.speechSynthesis.getVoices()[7];
    const services = ["youtube", "netflix", "hotstar" ,"google", "zoom", "stack overflow", "github", "wikipedia", "youyube music", "spotify","gmail","mail","localhost","local host"];

    // Check if the transcript is a direct command to open or close a service
    const openCommandRegex = /^open (\w+)\s*(.*)$/; // Matches "open {service} {anything}"
    const closeCommandRegex = /^close (\w+)$/;  // Matches "close {service}"

    const openMatch = openCommandRegex.exec(transcript.toLowerCase());
    const closeMatch = closeCommandRegex.exec(transcript.toLowerCase());

    console.log(openMatch)
    const command = transcript.toLowerCase();
    if (command.includes("open new tab")){
        webSearch.text="Opening new tab";
        webSearch.voice = window.speechSynthesis.getVoices()[7];
        window.speechSynthesis.speak(webSearch);
        chrome.tabs.create({}, function(tab) {
            console.log('New tab created:', tab);
          });
    }
    // Close the current window
    else if (command.includes("close window")){
        chrome.windows.getCurrent(null, function(window) {
            webSearch.text="Closing window";
            webSearch.voice = window.speechSynthesis.getVoices()[7];
            window.speechSynthesis.speak(webSearch);
            chrome.windows.remove(window.id);
        });
    }
    
    
    // Close the current tab
    else if (command.includes("close current tab")){
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            webSearch.text="Close current tab";
            webSearch.voice = window.speechSynthesis.getVoices()[7];
            window.speechSynthesis.speak(webSearch);
            chrome.tabs.remove(tabs[0].id);
        });
    }

    else if (command.includes("close tab")){
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

        chrome.tabs.query({ currentWindow: true }, function(tabs) {
                // console.log(tabs[targetIndex - 1].id)
                try {
                    if (targetIndex >= 1 && targetIndex <= tabs.length) {
                    webSearch.text="Closing Tab" + targetIndex;
                    webSearch.voice = window.speechSynthesis.getVoices()[7];
                    window.speechSynthesis.speak(webSearch);
                    chrome.tabs.remove(tabs[targetIndex - 1].id);
                    }
                } catch (error) {
                    webSearch.text="Invalid tab index provided.";
                    webSearch.voice = window.speechSynthesis.getVoices()[7];
                    window.speechSynthesis.speak(webSearch);
                    // console.error("Invalid tab index provided.");
                }
        });
        }
    }
    else if (command.includes("go to tab") || command.includes("goto tab")){
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
        chrome.tabs.query({ currentWindow: true }, function(tabs) {
            // Check if there are at least 3 tabs open
            if (tabs.length >= 2) {
                webSearch.text="Moving to Tab" + targetIndex;
                window.speechSynthesis.speak(webSearch);
                // Get the ID of the third tab (index is zero-based)
                const tabId = tabs[targetIndex-1].id;
                console.log(tabId);
                // Activate the third tab
                chrome.tabs.update(tabId, { active: true });
            } else {
                console.log("There are fewer than 2 tabs open.");
            }
        });
      }
    }

    else  if (command.includes("next tab") ){ // Ensure exact match for the command
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            let activeTabIndex = tabs[0].index;
            webSearch.text="Moving to Next Tab";
            window.speechSynthesis.speak(webSearch);
            chrome.tabs.query({currentWindow: true}, function(allTabs) {
                let nextTabIndex = (activeTabIndex + 1) % allTabs.length;
                chrome.tabs.update(allTabs[nextTabIndex].id, {active: true});
            });
        });
    }
    else if(command.includes("previous tab") ){ // Ensure exact match for the command
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            let activeTabIndex = tabs[0].index;
            webSearch.text="Moving to Previous Tab";
            window.speechSynthesis.speak(webSearch);
            chrome.tabs.query({currentWindow: true}, function(allTabs) {
                let nextTabIndex = (activeTabIndex - 1 + allTabs.length) % allTabs.length;
                chrome.tabs.update(allTabs[nextTabIndex].id, {active: true});
            });
        });
    }
    else{
        if (openMatch && services.includes(openMatch[1])) {
            const service = openMatch[1];
            console.log(service)
            if(service == 'gmail'){
                webSearch.text="Opening"+service;
                window.speechSynthesis.speak(webSearch);
                chrome.tabs.create({url: `https://mail.google.com/`})
            }
            else if(service == 'localhost' || service == 'local host'){
                transcript = transcript.toLowerCase();
                let file = transcript.split(" ").pop().split(".")[0];
                webSearch.text="Opening"+file;
                window.speechSynthesis.speak(webSearch);
                console.log(file);
                chrome.tabs.create({url: 'http://127.0.0.1:5500/' + file + '.html'});
            }
            else{
                webSearch.text="Opening"+ service;
                window.speechSynthesis.speak(webSearch);
                chrome.tabs.create({url: `https://www.${service}.com/`});
            }
        } else if (closeMatch && services.includes(closeMatch[1])) {
            let serviceToClose = closeMatch[1].toLowerCase();
            console.log(serviceToClose)
            if(serviceToClose == 'gmail'){
                serviceToClose = 'mail';
            }
            // Query open tabs to find and close tabs matching the service
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(function(tab) {
                    const tabUrl = tab.url.toLowerCase();
                    console.log(tabUrl)
                    if (tabUrl.includes(serviceToClose)) {
                        chrome.tabs.remove(tab.id);
                    }
                });
                webSearch.text="Closing"+serviceToClose;
                window.speechSynthesis.speak(webSearch);
                console.log(`Closed tabs for ${serviceToClose}`);
            });
        } 
        else {
            // If not a direct command, perform a search
            webSearch.text="Here is what I found: ";
            window.speechSynthesis.speak(webSearch);
            transcript=transcript.toLowerCase()
            let match = transcript.match(/^open (\w+)/);
            let service = match ? transcript.substring(transcript.indexOf(match[1])) : transcript;
            chrome.tabs.create({url: `https://www.google.com/search?q=${service}`});
        }
    }
}

// function sendDataToLambda(stream) {
//   const recorder = new MediaRecorder(stream);
//   const chunks = [];

//   recorder.ondataavailable = function(e) {
//       if (e.data.size > 0) {
//           chunks.push(e.data);
//       }
//   };

//   recorder.onstop = function() {
//       const audioBlob = new Blob(chunks, { 'type' : 'audio/wav' });

//       // Send audio chunks to Lambda function
//       fetch('https://ss1owg8nfl.execute-api.us-east-1.amazonaws.com/developer/voiceinput', {
//           method: 'POST',
//           body: audioBlob,
//       })
//       .then(response => {
//           console.log('Audio sent successfully', response);
//       })
//       .catch(error => {
//           console.error('Error sending audio:', error);
//       });
//   };

//   // Start recording
//   recorder.start();
//   setTimeout(() => {
//       // Stop recording after some time
//       recorder.stop();
//   }, 3000); // Adjust recording duration as needed
// }

// function sendDataToLambda(stream) {
//     const recorder = new MediaRecorder(stream);
//     const chunks = [];
  
//     recorder.ondataavailable = function(e) {
//         if (e.data.size > 0) {
//             chunks.push(e.data);
//         }
//     };
  
//     recorder.onstop = function() {
//         const audioBlob = new Blob(chunks, { 'type' : 'audio/wav' });
  
//         // Convert Blob to ArrayBuffer
//         const reader = new FileReader();
//         reader.onload = function() {
//             const buffer = reader.result; // ArrayBuffer
            
//             // Convert ArrayBuffer to Uint8Array
//             const byteArray = new Uint8Array(buffer);
            
//             // Send audio bytes to Lambda function
//             fetch('https://ss1owg8nfl.execute-api.us-east-1.amazonaws.com/developer/voiceinput', {
//                 method: 'POST',
//                 body: byteArray,
//             })
//             .then(response => {
//                 console.log('Audio sent successfully', response);
//             })
//             .catch(error => {
//                 console.error('Error sending audio:', error);
//             });
//         };
//         reader.readAsArrayBuffer(audioBlob);
//     };
  
//     // Start recording
//     recorder.start();
//     setTimeout(() => {
//         // Stop recording after some time
//         recorder.stop();
//     }, 3000); // Adjust recording duration as needed
//   }


async function startAudioStream(stream) {
    try {
    //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
  
      const ws = new WebSocket("wss://ghxp0dg2o7.execute-api.us-east-1.amazonaws.com/production/"); // Replace with your endpoint URL
  
      ws.onopen = () => {
        ws.sendAudio= () =>{
            console.log("Sending audio data...");
            const microphone = source.stream.getAudioTracks()[0];
            const processor = audioContext.createScriptProcessor(1024, 1, 1);
      
            processor.onaudioprocess = (event) => {
              const audioBuffer = event.inputBuffer;
              const audioData = audioContext.createFloat32Array(audioBuffer.length);
              audioBuffer.copyTo(audioData);
      
              // Convert audio data to a format suitable for sending (e.g., base64)
              const encodedData = convertAudioToBase64(audioData);
      
              ws.send(encodedData);
            };
      
            microphone.applyConstraints({ silence: false });
            processor.connect(audioContext.destination);
            source.connect(processor);
        }
        ws.send(JSON.stringify({"action": "sendAudio", "data": "Hello, Lambda!"}));

      };
  
      ws.onmessage = (event) => {
        console.log("Received message from Lambda:", event.data);
      };
  
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
}
  
//   function convertAudioToBase64(audioData) {
//     // Implement conversion logic here (e.g., using FileReader)
//     const buffer = new ArrayBuffer(audioData.length * 4);
//     const view = new Float32Array(buffer);
//     view.set(audioData);
//     const blob = new Blob([view], { type: "audio/pcm" });
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       return reader.result.split(",")[1]; // Return only encoded data
//     };
//     return ""; // Placeholder until conversion is implemented
//   }
