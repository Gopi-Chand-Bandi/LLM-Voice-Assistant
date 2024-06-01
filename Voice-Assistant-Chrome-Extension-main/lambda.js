const lambdaUrl = "wss://ghxp0dg2o7.execute-api.us-east-1.amazonaws.com/production/";
document.getElementById("llm-speech").addEventListener("click",streamAudioToWebSocket(lambdaUrl));

async function streamAudioToWebSocket(websocketUrl) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks = [];
  
  let inputField = document.querySelector('.input');
  inputField.placeholder = "Listening...";

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
        websocket.send(JSON.stringify({
          "action": "sendAudio",
          "data": base64AudioData.split('base64,')[1] // Remove the data URL part
        }));
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      websocket.onmessage = (event) => {
        console.log("Response from Lambda:", event.data);
      };

      websocket.onclose = () => {
        console.log("WebSocket is closed now.");
      };
    };

    reader.readAsDataURL(blob);
  };

  mediaRecorder.start();

  // Automatically stop recording after a set period (e.g., 5 seconds)
  setTimeout(() => {
    mediaRecorder.stop();
  }, 5000); // Adjust as needed
}
