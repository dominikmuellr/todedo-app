import { useEffect } from 'react';

export const useAndroidShortcuts = (onAddTask, onFilterChange) => {
  useEffect(() => {
    // Check URL parameters for Android app shortcuts
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle "Add Task" shortcut
    if (urlParams.get('action') === 'add') {
      // Auto-focus on task input or show task form
      setTimeout(() => {
        const taskInput = document.querySelector('input[placeholder*="task"]');
        if (taskInput) {
          taskInput.focus();
          taskInput.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
    
    // Handle "Today's Tasks" shortcut
    if (urlParams.get('filter') === 'today') {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      
      // Filter tasks for today
      onFilterChange('search', todayString);
    }
    
    // Handle other potential shortcuts
    const shortcutAction = urlParams.get('shortcut');
    if (shortcutAction) {
      console.log('Android shortcut activated:', shortcutAction);
    }
    
  }, [onAddTask, onFilterChange]);
};

// Android-specific features detection
export const useAndroidFeatures = () => {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isChromeAndroid = isAndroid && /Chrome/i.test(navigator.userAgent);
  
  return {
    isAndroid,
    isStandalone,
    isChromeAndroid,
    supportsWebShare: 'share' in navigator,
    supportsNotifications: 'Notification' in window,
    supportsBadging: 'setAppBadge' in navigator,
  };
};
