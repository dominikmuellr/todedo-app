import { useState, useEffect } from 'react';

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
      console.log('PWA Debug - Is installed:', isStandalone);
      if (isStandalone) {
        setIsInstalled(true);
      }
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA Debug - beforeinstallprompt event fired!', e);
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA Debug - appinstalled event fired!');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    checkIfInstalled();
    
    // Debug: Check if events are being listened for
    console.log('PWA Debug - Setting up event listeners');
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Fallback for Android: Show install prompt after a delay if no beforeinstallprompt
    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled) {
        console.log('PWA Debug - No beforeinstallprompt detected, checking Android fallback');
        // Check if we're on Android
        const isAndroid = /android/i.test(navigator.userAgent);
        const isChrome = /chrome/i.test(navigator.userAgent);
        console.log('PWA Debug - Android:', isAndroid, 'Chrome:', isChrome);
        
        if (isAndroid) {
          console.log('PWA Debug - Enabling Android fallback install prompt');
          setIsInstallable(true);
        }
      }
    }, 2000); // Reduced from 3000 to 2000ms

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(fallbackTimer);
    };
  }, [deferredPrompt, isInstalled]);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferred prompt variable
    setDeferredPrompt(null);
    setIsInstallable(false);

    return outcome === 'accepted';
  };

  return {
    isInstallable,
    isInstalled,
    installApp,
    deferredPrompt
  };
};
