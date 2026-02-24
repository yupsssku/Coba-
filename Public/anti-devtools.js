(function() {
    'use strict';
    
    // Deteksi DevTools
    function detectDevTools() {
        const threshold = 160; // Threshold untuk deteksi
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold || heightThreshold;
        
        if (orientation) {
            redirectTo404();
            return;
        }
        
        // Deteksi method kedua - performance timing
        let start = performance.now();
        debugger;
        let end = performance.now();
        
        if (end - start > 100) { // Jika debugger aktif, waktu akan lama
            redirectTo404();
            return;
        }
        
        // Deteksi method ketiga - console log
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                redirectTo404();
            }
        });
        console.log(element);
        console.clear();
    }
    
    function redirectTo404() {
        // Redirect ke halaman 404
        window.location.href = '/404.html';
    }
    
    // Check setiap 2 detik
    setInterval(detectDevTools, 2000);
    
    // Check saat resize (DevTools sering trigger resize)
    window.addEventListener('resize', detectDevTools);
    
    // Check saat keydown (F12, Ctrl+Shift+I, etc)
    window.addEventListener('keydown', function(e) {
        if (
            e.key === 'F12' || 
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
            redirectTo404();
        }
    });
    
    // Prevent right click (optional)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        redirectTo404();
    });
    
    // Initial check
    detectDevTools();
})();
