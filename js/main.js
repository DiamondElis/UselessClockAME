// This file handles any non-p5.js interactions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize p5.js
    new p5();
    
    // Check if the browser supports WebGL
    checkWebGLSupport();
    
    // Additional initialization if needed
});

// Check WebGL support and show warning if not supported
function checkWebGLSupport() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
        const container = document.getElementById('dice-container');
        container.innerHTML = '<div class="webgl-error">Your browser does not support WebGL, which is required for the interactive dice. Please try a different browser.</div>';
        
        // Add some basic styling to the error message
        const style = document.createElement('style');
        style.textContent = `
            .webgl-error {
                color: #333;
                padding: 20px;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 10px;
            }
        `;
        document.head.appendChild(style);
    }
} 