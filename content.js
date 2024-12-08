// content.js

// 簡易的時區對照(僅範例)
const timezoneOffsets = {
  "CST": -6,
  "CT": -6,
  "EST": -5,
  "PST": -8,
  "UTC": 0
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CONVERT_TIME") {
    const originalText = message.text;
    
    // 例: "2024/12/11 9:00 CST"
    const regex = /(\d{4}\/\d{1,2}\/\d{1,2})\s+(\d{1,2}:\d{2})\s+([A-Za-z]+)$/;
    const match = originalText.match(regex);
    
    if (!match) {
      alert("無法解析選取的日期時間格式。請確定格式類似：2024/12/11 9:00 CST");
      return;
    }
    
    const dateStr = match[1]; 
    const timeStr = match[2]; 
    const timezoneAbbr = match[3]; 
    
    const [year, month, day] = dateStr.split('/').map(num => parseInt(num, 10));
    const [hour, minute] = timeStr.split(':').map(num => parseInt(num, 10));
    
    let offset = timezoneOffsets[timezoneAbbr.toUpperCase()];
    if (offset === undefined) {
      alert("不支援的時區代碼：" + timezoneAbbr);
      return;
    }
    
    const utcTime = Date.UTC(year, month - 1, day, hour - offset, minute);
    const localDate = new Date(utcTime);
    
    const userOffsetMinutes = localDate.getTimezoneOffset();
    const yearLocal = localDate.getFullYear();
    const monthLocal = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const dayLocal = localDate.getDate().toString().padStart(2, '0');
    const hourLocal = localDate.getHours().toString().padStart(2, '0');
    const minuteLocal = localDate.getMinutes().toString().padStart(2, '0');
    
    const timezoneOffsetInHours = -userOffsetMinutes / 60;
    const sign = timezoneOffsetInHours >= 0 ? '+' : '-';
    const timezoneString = `GMT${sign}${Math.abs(timezoneOffsetInHours)}`;
    
    const result = `等於您的當地時間 ${yearLocal}/${monthLocal}/${dayLocal} ${hourLocal}:${minuteLocal} (${timezoneString})`;
    alert(result);
  }
});
