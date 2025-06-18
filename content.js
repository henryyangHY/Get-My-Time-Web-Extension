// content.js

(() => {
  // 已載入過就直接跳出，避免重複宣告常數
  if (window.__GMT_MY_TIME_LOADED__) return;
  window.__GMT_MY_TIME_LOADED__ = true;

  /* global chrono */

  // 需要覆寫的縮寫 → offset(分鐘)
  const TZ_OVERRIDE = {
    GMT: 0,    // Greenwich Mean Time (UTC+0)
    UTC: 0,    // Coordinated Universal Time (UTC+0)
    // 美國
    PST: -480, // Pacific Standard Time (UTC-8)
    PDT: -420, // Pacific Daylight Time (UTC-7)
    MST: -420, // Mountain Standard Time (UTC-7)
    MDT: -360, // Mountain Daylight Time (UTC-6)
    CST: -360, // Central Standard Time (UTC-6)
    CDT: -300, // Central Daylight Time (UTC-5)
    EST: -300, // Eastern Standard Time (UTC-5)
    EDT: -240, // Eastern Daylight Time (UTC-4)

    // 亞洲
    HKT: 480,  // Hong Kong Time (UTC+8)
    CST: 480,  // China Standard Time (UTC+8) ※ 注意：CST 在美國也表示 Central Standard Time，需視上下文判斷
    TWT: 480,  // Taiwan Time (UTC+8)
    SGT: 480,  // Singapore Time (UTC+8)
    JST: 540,  // Japan Standard Time (UTC+9)
    KST: 540   // Korea Standard Time (UTC+9)
  };

  console.log("[CS] content script loaded →", location.href);

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type !== "CONVERT_TIME") return;

    console.log("[CS] 收到訊息：", msg.text);

    const results = chrono.parse(msg.text, new Date(), { forwardDate: true });
    if (!results.length) {
      alert("無法解析選取的時間格式：" + msg.text);
      return;
    }

    let date = results[0].start.date();
    const chronoOffset = results[0].start.get("timezoneOffset"); // 可能為 null

    const m = msg.text.match(/\b([A-Z]{2,4})\b/);
    if (m) {
      const abbr = m[1].toUpperCase();
      const desired = TZ_OVERRIDE[abbr];
      if (typeof desired === "number" && typeof chronoOffset === "number") {
        const diffMin = chronoOffset - desired;
        if (diffMin) date = new Date(date.getTime() + diffMin * 60000);
      }
    }

    const pad = (n) => n.toString().padStart(2, "0");
    const y  = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mi = pad(date.getMinutes());

    const offsetH = -date.getTimezoneOffset() / 60;
    const tzStr = `GMT${offsetH >= 0 ? "+" : ""}${offsetH}`;

    alert(`等於您的當地時間：${y}/${mm}/${dd} ${hh}:${mi} (${tzStr})`);
  });
})();
