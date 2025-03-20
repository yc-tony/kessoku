/**
 * 將 ISO 8601 duration 格式轉換為易讀的中文格式
 * @param {string} duration - ISO 8601 duration 字符串 (例如: PT1H30M, P1DT2H)
 * @returns {string} 格式化後的中文字符串
 */
export const formatDuration = (duration) => {
  if (!duration) return '未知時間';
  
  const matches = duration.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return '未知時間';
  
  const [_, days, hours, minutes, seconds] = matches;
  const parts = [];
  
  if (days) parts.push(`${days}天`);
  if (hours) parts.push(`${hours}小時`);
  if (minutes) parts.push(`${minutes}分鐘`);
  if (seconds) parts.push(`${seconds}秒`);
  
  return parts.join('');
}; 