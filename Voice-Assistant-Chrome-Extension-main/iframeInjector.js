var iFrame  = document.createElement ("iframe");
iFrame.src  = chrome.extension.getURL ("content.html");

document.body.insertBefore (iFrame, document.body.firstChild);