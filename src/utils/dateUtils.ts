/**
 * Format a Unix timestamp into relative time (e.g., "3 days ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  // Calculate time differences
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  // Format based on time difference
  if (diff < minute) {
    return "刚刚";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} 分钟前`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} 小时前`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} 天前`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks} 周前`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} 个月前`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} 年前`;
  }
}

/**
 * Format a Unix timestamp to a full date (YYYY-MM-DD HH:MM)
 */
export function formatFullDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Check if a user is dormant (no activity for more than 30 days)
 */
export function isDormant(timestamp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
  return now - timestamp > thirtyDaysInSeconds;
} 