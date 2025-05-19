
// Optimized anti-inspect protection
(function() {
  // Check if the device is mobile or Safari
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  // Mild protection for mobile and Safari
  if (isMobile || isSafari) {
    // Minimal protection for mobile and Safari - just prevent right-click
    document.addEventListener('contextmenu', function(e) {
      if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    });
  } 
  // More aggressive protection for desktop
  else {
    // Prevent right-click
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Prevent keyboard shortcuts
    window.addEventListener('keydown', function(e) {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I or J or C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    });
    
    // Prevent selection
    document.addEventListener('selectstart', function(e) {
      if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    });
  }
  
  // DevTools detection - less aggressive on mobile
  let consoleShownCount = 0;
  const devtools = { isOpen: false, orientation: null };
  
  // Function to check if console is opened
  const checkConsole = () => {
    const threshold = isMobile || isSafari ? 200 : 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (
      !(widthThreshold || heightThreshold) &&
      (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || widthThreshold || heightThreshold)
    ) {
      if (!devtools.isOpen) {
        devtools.isOpen = true;
        consoleShownCount++;
        
        // Only show warning for the first few times
        if (consoleShownCount <= 2) {
          console.log("%c⚠️ Pozor!", "color: red; font-size: 4em; font-weight: bold;");
          console.log("%cToto je prostředí pouze pro vývojáře!", "color: orange; font-size: 1.5em;");
        }
      }
    } else {
      devtools.isOpen = false;
    }
  };
  
  // Check for console opening periodically - less frequently on mobile/Safari
  const interval = isMobile || isSafari ? 3000 : 1000;
  setInterval(checkConsole, interval);
})();
