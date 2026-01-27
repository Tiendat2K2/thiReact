// Utility functions for authentication
export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  // Không cần xóa refresh token vì nó được lưu trong cookie
  // Cookie sẽ tự động expire hoặc được clear bởi server
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const setTokens = (accessToken) => {
  localStorage.setItem("access_token", accessToken);
  // Refresh token được lưu trong cookie bởi server, không cần handle ở client
};