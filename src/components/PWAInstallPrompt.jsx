import React, { useState } from 'react';
import { usePWA } from '../utils/usePWA';
import { useAndroidFeatures } from '../utils/androidUtils';

const PWAInstallPrompt = () => {
  const { isInstallable, isInstalled, installApp, deferredPrompt } = usePWA();
  const { isAndroid, isChromeAndroid } = useAndroidFeatures();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Use the native install prompt if available
      const result = await installApp();
      if (result) {
        console.log('PWA installed successfully!');
        setIsDismissed(true);
      }
    } else if (isAndroid) {
      // Show manual installation instructions for Android
      setShowManualInstructions(true);
    } else {
      // Fallback for other browsers
      alert('To install: Look for the install icon in your browser\'s address bar or menu');
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Optionally store dismissal in localStorage to persist across sessions
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Check if user previously dismissed the prompt
  const wasPreviouslyDismissed = false; // Temporarily disabled: localStorage.getItem('pwa-install-dismissed') === 'true';

  if (isInstalled || isDismissed || wasPreviouslyDismissed) {
    return null;
  }

  // Show manual instructions modal
  if (showManualInstructions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Install ToDeDo App
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">1.</span>
              <span>Tap the menu button (⋮) in your browser</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">2.</span>
              <span>Select "Add to Home Screen"</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">3.</span>
              <span>Tap "Add" to install the app</span>
            </div>
          </div>
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setShowManualInstructions(false)}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Got it!
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Only show if installable (either native prompt available or Android fallback)
  if (!isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 md:left-auto md:right-4 md:max-w-sm" style={{ zIndex: 99999 }}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {isAndroid ? "Add to Home Screen" : "Install ToDeDo App"}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isAndroid 
              ? "Add ToDeDo to your home screen for quick access and offline use."
              : "Add to your home screen for quick access and offline use."
            }
          </p>
          
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleInstall}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              {isAndroid ? "Add to Home Screen" : "Install"}
            </button>
            <button
              onClick={handleDismiss}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
