document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('checkbox');
  const currentTheme = localStorage.getItem('theme');

  // Check for saved theme preference
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  // Function to switch theme
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    
    // Update mobile theme icon if the function exists
    if (typeof updateMobileThemeIcon === 'function') {
      updateMobileThemeIcon();
    }
  }

  // Add event listener
  toggleSwitch.addEventListener('change', switchTheme);
}); 