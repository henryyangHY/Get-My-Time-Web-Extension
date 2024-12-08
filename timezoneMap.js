// timezoneMap.js

// 這裡是一個簡化版本的時區對照表，實際上可能需要更多時區、考慮DST、或使用更精準的函式庫。
// key: 時區縮寫字串
// value: 該時區相對 UTC 的小時數 (注意：UTC-6 表示比UTC晚6小時，所以存 -6)
const TimeZoneMap = {
    "UTC": 0,
    "GMT": 0,
    "CST": -6,  // Central Standard Time (美中部標準時間)
    "CDT": -5,  // Central Daylight Time (美中部夏令時間)
    "EST": -5,  // Eastern Standard Time
    "EDT": -4,  // Eastern Daylight Time
    "PST": -8,  // Pacific Standard Time
    "PDT": -7,  // Pacific Daylight Time
    "JST": 9,   // Japan Standard Time (UTC+9)
    "CET": 1,   // Central European Time (UTC+1)
    "CEST": 2   // Central European Summer Time (UTC+2)
  };
  
  // 將此物件導出
  export default TimeZoneMap;
  