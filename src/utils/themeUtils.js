// Theme utility functions for managing Android status bar color

export function updateAndroidStatusBarColor() {
  // Get current theme from document element
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  
  // Find or create theme-color meta tag
  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    document.head.appendChild(themeColorMeta);
  }
  
  // Set color based on theme
  if (isDark) {
    themeColorMeta.content = '#121212'; // Dark mode: exact match to --color-background
  } else {
    themeColorMeta.content = '#f9fafb'; // Light mode: exact match to --color-background
  }
}

// Function to listen for theme changes and update status bar color
export function initializeThemeColorListener() {
  // Initial update
  updateAndroidStatusBarColor();
  
  // Create a MutationObserver to watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-color-theme')) {
        updateAndroidStatusBarColor();
      }
    });
  });
  
  // Start observing the document element for attribute changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'data-color-theme']
  });
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addListener(() => {
    const savedTheme = localStorage.getItem('react-theme');
    const savedThemeMode = localStorage.getItem('react-theme-mode');
    
    // Only update if using auto theme mode
    if (savedTheme === 'auto' || savedThemeMode === 'auto' || (!savedTheme && !savedThemeMode)) {
      setTimeout(updateAndroidStatusBarColor, 100); // Small delay to ensure DOM is updated
    }
  });
  
  return observer;
}
