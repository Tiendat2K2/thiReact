// Token management utilities
import { refreshToken } from '../services/auth';
class TokenManager {
  constructor() {
    this.refreshInterval = null;
    this.isRefreshing = false;
  }

  // Start auto refresh token every 50 minutes (before 1h expiry)
  startAutoRefresh() {
    // Clear existing interval
    this.stopAutoRefresh();
    
    // Set interval to refresh every 50 minutes (3000000ms)
    this.refreshInterval = setInterval(async () => {
      await this.silentRefresh();
    }, 50 * 60 * 1000); // 50 minutes
    
    console.log('🔄 Auto refresh token started (every 50 minutes)');
  }

  // Stop auto refresh
  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
      console.log('⏹️ Auto refresh token stopped');
    }
  }

  // Silent refresh token (không làm gián đoạn user)
  async silentRefresh() {
    if (this.isRefreshing) {
      console.log('🔄 Refresh already in progress, skipping...');
      return;
    }

    try {
      this.isRefreshing = true;
      console.log('🔄 Silent refresh token...');
      
      const response = await refreshToken();
      const accessToken = response.data?.accessToken || response.accessToken;
      
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        console.log('✅ Silent refresh successful');
      } else {
        console.warn('⚠️ No access token in silent refresh response');
      }
    } catch (error) {
      console.error('❌ Silent refresh failed:', error);
      // Không logout ngay, để user tiếp tục sử dụng với token hiện tại
      // Chỉ logout khi user thực hiện action và token thực sự hết hạn
    } finally {
      this.isRefreshing = false;
    }
  }

  // Check if user is active (có tương tác gần đây)
  isUserActive() {
    const lastActivity = localStorage.getItem('last_activity');
    if (!lastActivity) return false;
    
    const now = Date.now();
    const lastActivityTime = parseInt(lastActivity);
    const inactiveTime = now - lastActivityTime;
    
    // Nếu không hoạt động quá 2 giờ thì coi như inactive
    return inactiveTime < (2 * 60 * 60 * 1000); // 2 hours
  }

  // Update last activity time
  updateActivity() {
    localStorage.setItem('last_activity', Date.now().toString());
  }

  // Start activity tracking
  startActivityTracking() {
    // Track các events user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      this.updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Initial activity
    this.updateActivity();
    
    console.log('👀 Activity tracking started');
  }
}

// Singleton instance
const tokenManager = new TokenManager();

export default tokenManager;