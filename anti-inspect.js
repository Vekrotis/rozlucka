
// /* Anti-inspect script with reduced aggressive behavior */
// (function() {
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
//   // Helper to determine if we should apply strict protection
//   function shouldApplyStrictProtection() {
//     // More aggressive on desktop, less aggressive on mobile and Safari
//     return !(isMobile || isSafari);
//   }
  
//   // Basic protection against right-click
//   if (shouldApplyStrictProtection()) {
//     document.addEventListener('contextmenu', function(e) {
//       e.preventDefault();
//       return false;
//     });
//   }
  
//   // Block F12 and other dev tools shortcuts
//   document.addEventListener('keydown', function(e) {
//     // Strict protection against keyboard shortcuts to open dev tools
//     if (shouldApplyStrictProtection()) {
//       // F12, Ctrl+Shift+I, Cmd+Option+I, Ctrl+Shift+J, Cmd+Option+J
//       if (
//         e.keyCode === 123 || 
//         (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
//         (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74))
//       ) {
//         e.preventDefault();
//         return false;
//       }
//     }
//   });
  
//   // Advanced protection against dev tools for desktop browsers
//   if (shouldApplyStrictProtection()) {
//     let devtoolsOpen = false;
    
//     const checkDevTools = function() {
//       const widthThreshold = window.outerWidth - window.innerWidth > 100;
//       const heightThreshold = window.outerHeight - window.innerHeight > 200;
      
//       if (widthThreshold || heightThreshold) {
//         if (!devtoolsOpen) {
//           devtoolsOpen = true;
//           displayWarning();
//         }
//       } else {
//         devtoolsOpen = false;
//         removeWarning();
//       }
//     };
    
//     const displayWarning = function() {
//       const warningDiv = document.createElement('div');
//       warningDiv.id = 'devtools-warning';
//       warningDiv.style.position = 'fixed';
//       warningDiv.style.top = '0';
//       warningDiv.style.left = '0';
//       warningDiv.style.width = '100%';
//       warningDiv.style.height = '100%';
//       warningDiv.style.backgroundColor = 'rgba(0,0,0,0.9)';
//       warningDiv.style.color = 'white';
//       warningDiv.style.display = 'flex';
//       warningDiv.style.flexDirection = 'column';
//       warningDiv.style.alignItems = 'center';
//       warningDiv.style.justifyContent = 'center';
//       warningDiv.style.zIndex = '9999999';
//       warningDiv.style.fontSize = '24px';
//       warningDiv.style.textAlign = 'center';
//       warningDiv.style.padding = '20px';
//       warningDiv.innerHTML = `
//         <h2>Přístup odepřen</h2>
//         <p>Prohlížení zdrojového kódu této stránky není povoleno.</p>
//       `;
//       document.body.appendChild(warningDiv);
//     };
    
//     const removeWarning = function() {
//       const warningDiv = document.getElementById('devtools-warning');
//       if (warningDiv) {
//         warningDiv.remove();
//       }
//     };
    
//     // Check for devtools at intervals
//     setInterval(checkDevTools, 1000);
//   }
// })();
