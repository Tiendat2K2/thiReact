// Date utility functions using JavaScript native methods

/**
 * Format date string to only show date part (YYYY-MM-DD)
 * @param {string} dateString - Date string in various formats
 * @returns {string} - Formatted date string (YYYY-MM-DD) or 'N/A'
 */
export const formatDateOnly = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    // Nếu là ISO string (có T), chỉ lấy phần trước T
    if (dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    
    // Nếu đã là format YYYY-MM-DD thì return luôn
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    
    // Sử dụng native method
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

/**
 * Format date string to Vietnamese readable format (DD/MM/YYYY)
 * @param {string} dateString - Date string in various formats
 * @returns {string} - Formatted date string (DD/MM/YYYY) or 'N/A'
 */
export const formatDateReadable = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    // Sử dụng Intl.DateTimeFormat cho format Việt Nam
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

/**
 * Format datetime string to Vietnamese readable format (DD/MM/YYYY HH:mm)
 * @param {string} dateString - Date string in various formats
 * @returns {string} - Formatted datetime string or 'N/A'
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    // Sử dụng Intl.DateTimeFormat cho format Việt Nam
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24h format
    }).format(date);
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return 'N/A';
  }
};

/**
 * Format time only (HH:mm)
 * @param {string} dateString - Date string in various formats
 * @returns {string} - Formatted time string or 'N/A'
 */
export const formatTimeOnly = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Time';
    }
    
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'N/A';
  }
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} - Current date string
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Get current datetime in Vietnamese format
 * @returns {string} - Current datetime string
 */
export const getCurrentDateTime = () => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());
};

/**
 * Check if date string is valid
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if valid date
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
};

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 * @param {string} dateString - Date string
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
    
    return `${Math.floor(diffInSeconds / 31536000)} năm trước`;
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'N/A';
  }
};