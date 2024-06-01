// Example usage of chrome.tabs.query
chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    console.log(message);

    if (message.message == "open") {
        openTabs(message.tab.command)
    }
    if (message.message == "close"){
        closeTabs(message.tab.command)
    }

    if (message.type === "extractedLink") {
        const extractedLink = message.link;
        console.log("Extracted Link from background script:", extractedLink);
        // Do something with the link, e.g., open in a new tab:
        chrome.tabs.create({ url: extractedLink });
    }

    if (message.message == "close window"){
        chrome.windows.getCurrent(null, function(window) {
            // Close the current window
            chrome.windows.remove(window.id);
        });
    }

    if (message.message == "close current tab"){
        chrome.tabs.remove(sender.tab.id);
    }
    if (message.message == "close tab"){
        let index=parseInt(message.tab.targetIndex);
        console.log(index)
        closeTab(index);
    }

    if(message.message == 'previous' || message.message == 'next'){
        moveTabs(message.message);
    }
    else{
        let number=parseInt(message.message);
        goToTab(number);
    }
    sendResponse({message:`moved to ${message.message} tab`});
  })


  function moveTabs(direction) {
    // Query for the active tab in the current window
    chrome.tabs.query({ currentWindow: true }, function(tabsArray) {
        // Check if there are fewer than 2 tabs open
        if (tabsArray.length < 2) {
            // If there's only one tab, there's nothing to move
            return;
        }
  
        // Calculate the index of the next tab
        const activeTab = tabsArray.find(tab => tab.active);
        const nextTabIndex = (direction === 'next') ? (activeTab.index + 1) : (activeTab.index - 1);
        
        // Query for the tab with the calculated index
        chrome.tabs.query({ index: nextTabIndex }, function(nextTabsArray) {
            // Check if there is a next tab
            if (nextTabsArray.length < 1) {
                // If there's no next tab, do nothing
                return;
            }
  
            // Update the next tab to make it active
            chrome.tabs.update(nextTabsArray[0].id, { active: true });
        });
    });
  }

  function goToTab(number){
    console.log(number)
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        // Check if there are at least 3 tabs open
        if (tabs.length >= 2) {
            // Get the ID of the third tab (index is zero-based)
            const tabId = tabs[number-1].id;
            console.log(tabId);
            // Activate the third tab
            chrome.tabs.update(tabId, { active: true });
        } else {
            console.log("There are fewer than 2 tabs open.");
        }
    });
    
  }

function closeTab(index) {
    console.log(index)
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        console.log(tabs[index - 1].id)
        if (index >= 1 && index <= tabs.length) {
            chrome.tabs.remove(tabs[index - 1].id);
        } else {
            console.error("Invalid tab index provided.");
        }
    });
}

function openTabs(transcript) {
    console.log(transcript);
    const services = ["youtube", "netflix", "hotstar" ,"google", "zoom", "stack overflow", "github", "wikipedia", "youyube music", "spotify","gmail","mail","localhost","local host"];

    // Check if the transcript is a direct command to open or close a service
    const openCommandRegex = /^open (\w+)\s*(.*)$/; // Matches "open {service} {anything}"

    const openMatch = openCommandRegex.exec(transcript.toLowerCase());

    console.log(openMatch)
    const command = transcript.toLowerCase();
    if (command.includes("open new tab")){
        chrome.tabs.create({}, function(tab) {
            console.log('New tab created:', tab);
          });
    }
    else{
        if (openMatch && services.includes(openMatch[1])) {
            const service = openMatch[1];
            console.log(service)
            if(service == 'gmail'){
                chrome.tabs.create({url: `https://mail.google.com/`})
            }
            else if(service == 'localhost' || service == 'local host'){
                transcript = transcript.toLowerCase();
                let file = transcript.split(" ").pop().split(".")[0];
                chrome.tabs.create({url: 'http://127.0.0.1:5500/' + file + '.html'});
            }
            else{
                chrome.tabs.create({url: `https://www.${service}.com/`});
            }
        }
        else {
            // If not a direct command, perform a search
            transcript=transcript.toLowerCase()
            let match = transcript.match(/^open (\w+)/);
            let service = match ? transcript.substring(transcript.indexOf(match[1])) : transcript;
            chrome.tabs.create({url: `https://www.google.com/search?q=${service}`});
        }
    }
}

function closeTabs(transcript){
    const services = ["youtube", "netflix", "hotstar" ,"google", "zoom", "stack overflow", "github", "wikipedia", "youyube music", "spotify","gmail","mail","localhost","local host"];

    const closeCommandRegex = /^close (\w+)$/;  // Matches "close {service}"

    const closeMatch = closeCommandRegex.exec(transcript.toLowerCase());


    if (closeMatch && services.includes(closeMatch[1])) {
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
    }
// chrome.tabs.executeScript({
//     code: 'var newDiv = document.createElement("div"); newDiv.innerHTML = "<h1>My custom content</h1>"; document.body.appendChild(newDiv);'
// });

