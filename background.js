// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertToMyTime",
    title: "Get My Local Time",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToMyTime") {
    chrome.tabs.sendMessage(tab.id, { type: "CONVERT_TIME", text: info.selectionText });
  }
});
