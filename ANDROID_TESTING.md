# Testing Your PWA on Android

## Quick Test Steps

### 1. **Deploy Your App**
```bash
# Build the app
npm run build

# Deploy to your hosting service (GitHub Pages, Netlify, Vercel, etc.)
npm run deploy
```

### 2. **Test on Android Device**

**Method 1: Using Chrome on Android**
1. Open Chrome on your Android device
2. Navigate to your deployed app URL
3. Look for the "Add to Home Screen" banner
4. Tap "Add" when prompted
5. Check your home screen for the app icon

**Method 2: Manual Installation**
1. Open your app in Chrome
2. Tap the ⋮ (three dots) menu
3. Select "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"

### 3. **Test PWA Features**

**Installation Test**:
- ✅ App icon appears on home screen
- ✅ App opens in standalone mode (no browser UI)
- ✅ Splash screen shows when opening

**Offline Test**:
- ✅ Turn off WiFi/mobile data
- ✅ Open the app from home screen
- ✅ App should work fully offline
- ✅ Create/edit tasks while offline
- ✅ Turn internet back on - changes should sync

**Android Integration Test**:
- ✅ Long-press app icon for shortcuts
- ✅ App respects system dark/light mode
- ✅ Status bar properly colored
- ✅ Back button works correctly

### 4. **Browser Support Test**

Test on multiple Android browsers:
- **Chrome**: Full PWA support ✅
- **Edge**: Full PWA support ✅
- **Firefox**: Basic PWA support ✅
- **Samsung Internet**: Good PWA support ✅

### 5. **Performance Test**

- **First Load**: Should be fast (~1-2 seconds)
- **Subsequent Loads**: Nearly instant (cached)
- **Offline Load**: Instant from cache
- **Storage Usage**: Check in Android Settings → Apps → ToDeDo → Storage

## Development Testing

### Local Testing with ngrok
```bash
# Install ngrok
npm install -g ngrok

# In one terminal, start your dev server
npm run dev

# In another terminal, expose it
ngrok http 3001

# Use the ngrok HTTPS URL on your Android device
```

### Using Chrome DevTools
1. Connect Android device via USB
2. Enable Developer Options & USB Debugging
3. Open Chrome DevTools
4. Go to Remote Devices
5. Test PWA features directly

## Common Issues & Solutions

### App Doesn't Show Install Prompt
- Ensure HTTPS (required for PWA)
- Check manifest.json is valid
- Verify service worker is registered
- Clear browser cache and try again

### App Doesn't Work Offline
- Check service worker is installed (Chrome DevTools → Application → Service Workers)
- Verify caching strategy in network tab
- Check for JavaScript errors

### Icons Don't Show Correctly
- Ensure icons are accessible via HTTPS
- Check icon sizes match manifest specifications
- Verify icon format is supported (PNG, SVG)

## Android Specific Notes

### Different Android Versions
- **Android 6+**: Basic PWA support
- **Android 7+**: Better integration
- **Android 8+**: Full PWA features
- **Android 9+**: Advanced PWA features

### OEM Variations
Some Android manufacturers (Samsung, Huawei, etc.) may have slight variations in PWA handling, but core functionality remains consistent.

### Alternative Installation Methods
If standard installation doesn't work:
1. Bookmark the app
2. Add bookmark to home screen
3. Use browser's "Desktop site" option if needed
