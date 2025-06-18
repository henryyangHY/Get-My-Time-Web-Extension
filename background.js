// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "GET_MY_LOCAL_TIME",
    title: "Get My Local Time",
    contexts: ["selection"]
  });
  console.log("context menu created");
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "GET_MY_LOCAL_TIME" || !info.selectionText) return;
  console.log("background: sendMessage →", info.selectionText);

  // ① 確保 content.js 已注入
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["chrono.min.js", "content.js"]
  });

  // ② 再送訊息
  chrome.tabs
    .sendMessage(tab.id, { type: "CONVERT_TIME", text: info.selectionText })
    .catch(err => console.error("sendMessage error:", err));
});
