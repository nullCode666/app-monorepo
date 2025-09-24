chrome.runtime.sendMessage({ type: "PING" }, (res) => {
    if (chrome.runtime.lastError) return;
    console.log("BG replied:", res);
});