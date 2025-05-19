
// Less aggressive anti-inspect protection
(function() {
  // Check if the device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // More aggressive protection only for mobile
  if (isMobile) {
    // Disable right-click on mobile
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Disable selection on mobile
    document.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    });
  }
  
  // Lighter protection for all devices
  let consoleShownCount = 0;
  
  // Detect DevTools opening
  const devtools = {
    isOpen: false,
    orientation: null
  };
  
  // Function to check if console is opened
  const checkConsole = () => {
    const threshold = 160;
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
  
  // Check for console opening periodically, less frequently on PC
  const interval = isMobile ? 1000 : 3000;
  setInterval(checkConsole, interval);
  
  // Disable some keyboard shortcuts only on mobile
  if (isMobile) {
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
  }
})();
