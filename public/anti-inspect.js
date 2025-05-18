
/**
 * Anti-inspection script to make it harder to access developer tools
 * (Note: This is not foolproof but can discourage casual inspection)
 */
(function() {
  // Detect devtools opening
  const devtools = {
    isOpen: false,
    orientation: undefined
  };

  // Function to disable right-click menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Block keyboard shortcuts that open devtools
  document.addEventListener('keydown', function(e) {
    // Block F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Block Ctrl+Shift+I / Cmd+Option+I
    if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
        (e.metaKey && e.altKey && e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    
    // Block Ctrl+Shift+J / Cmd+Option+J
    if ((e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
        (e.metaKey && e.altKey && e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    
    // Block Ctrl+Shift+C / Cmd+Option+C
    if ((e.ctrlKey && e.shiftKey && e.keyCode === 67) || 
        (e.metaKey && e.altKey && e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    
    // Block Ctrl+U / Cmd+U (view source)
    if ((e.ctrlKey && e.keyCode === 85) || 
        (e.metaKey && e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
  });

  // Detect devtools using console.log
  const threshold = 160;
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      if (!devtools.isOpen || devtools.orientation !== 'vertical') {
        devtools.isOpen = true;
        devtools.orientation = widthThreshold ? 'vertical' : 'horizontal';
        // Clear page content if devtools opened
        document.body.innerHTML = '<div style="text-align: center; padding-top: 50px;"><h1>Přístup zamítnut</h1><p>Přímý přístup ke zdrojovému kódu této stránky není povolen.</p></div>';
      }
    } else {
      if (devtools.isOpen) {
        window.location.reload(); // Reload if closed
      }
      devtools.isOpen = false;
      devtools.orientation = undefined;
    }
  };

  // Regular checking for devtools
  setInterval(checkDevTools, 1000);

  // Additional detection on page load
  window.addEventListener('load', function() {
    // Try to detect if this is a standalone devtools instance
    if(window.outerHeight === 0) {
      document.body.innerHTML = '<div style="text-align: center; padding-top: 50px;"><h1>Přístup zamítnut</h1><p>Přímý přístup ke zdrojovému kódu této stránky není povolen.</p></div>';
    }
  });
})();
