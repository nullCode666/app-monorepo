// 作为 Service Worker 运行（ESM）
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("installed");
// });
  
// chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
//     if (msg?.type === "PING") sendResponse({ ok: true, ts: Date.now() });
//     return true;
// });