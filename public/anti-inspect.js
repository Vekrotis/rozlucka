
// Script to add basic protection against casual inspection
// Note: This doesn't truly prevent viewing source code as browsers need the code to function
// This is just a light deterrent for casual users

(function() {
  // Disable right click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, false);

  // Disable key combinations that open developer tools
  document.addEventListener('keydown', function(e) {
    // Check for F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67))
    ) {
      e.preventDefault();
      return false;
    }
  }, false);

  // Console warning
  console.log(
    '%c⚠️ Pozor!',
    'font-size:35px; font-weight:bold; color: red;'
  );
  console.log(
    '%cTato stránka je osobní vzpomínkou třídy 9.B.',
    'font-size:15px;'
  );
})();
