// Initialize variables
let lastUpdateHour = -1;
let lastUpdateMinute = -1;

function setup() {
    // Initial update
    updateDots();
    
    // Set up an interval to check for time changes
    setInterval(updateDots, 1000); // Check every second
}

function updateDots() {
    // Get current time
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const isAM = hours < 12;
    
    // Convert to 12-hour format
    hours = hours % 12;
    if (hours === 0) hours = 12;
    
    // Only update if the hour or minute has changed
    if (hours === lastUpdateHour && minutes === lastUpdateMinute) return;
    lastUpdateHour = hours;
    lastUpdateMinute = minutes;
    
    // Update all four dice containers
    updateDiceContainer('dice-1-dot-container', isAM ? 1 : 0); // AM/PM
    updateDiceContainer('dice-2-dot-container', Math.floor(hours / 10)); // Tens
    updateDiceContainer('dice-3-dot-container', hours % 10); // Ones
    updateDiceContainer('dice-4-dot-container', Math.floor(minutes / 10)); // Minutes tens
    
    // Output for debugging
    console.log(`Time: ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${isAM ? 'AM' : 'PM'}`);
}

function updateDiceContainer(containerId, dotNumber) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // If dot number is 0, no dots are shown
    if (dotNumber === 0) return;
    
    // Create dots based on the face number
    switch (dotNumber) {
        case 1:
            // Center dot
            addDot(container, '50%', '50%', '10px', '10px', '#000');
            break;
        case 2:
            // Top-left and bottom-right dots
            addDot(container, '25%', '25%', '10px', '10px', '#000');
            addDot(container, '75%', '75%', '10px', '10px', '#000');
            break;
        case 3:
            // Top-left, center, and bottom-right dots
            addDot(container, '25%', '25%', '10px', '10px', '#000');
            addDot(container, '50%', '50%', '10px', '10px', '#000');
            addDot(container, '75%', '75%', '10px', '10px', '#000');
            break;
        case 4:
            // Four corner dots
            addDot(container, '25%', '25%', '10px', '10px', '#000');
            addDot(container, '25%', '75%', '10px', '10px', '#000');
            addDot(container, '75%', '25%', '10px', '10px', '#000');
            addDot(container, '75%', '75%', '10px', '10px', '#000');
            break;
        case 5:
            // Four corner dots plus center
            addDot(container, '25%', '25%', '10px', '10px', '#000');
            addDot(container, '25%', '75%', '10px', '10px', '#000');
            addDot(container, '50%', '50%', '10px', '10px', '#000');
            addDot(container, '75%', '25%', '10px', '10px', '#000');
            addDot(container, '75%', '75%', '10px', '10px', '#000');
            break;
        case 6:
            // Two rows of three dots each
            addDot(container, '25%', '25%', '10px', '10px', '#000');
            addDot(container, '25%', '50%', '10px', '10px', '#000');
            addDot(container, '25%', '75%', '10px', '10px', '#000');
            addDot(container, '75%', '25%', '10px', '10px', '#000');
            addDot(container, '75%', '50%', '10px', '10px', '#000');
            addDot(container, '75%', '75%', '10px', '10px', '#000');
            break;
    }
}

function addDot(container, top, left, width, height, color) {
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.width = width;
    dot.style.height = height;
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = color;
    dot.style.top = top;
    dot.style.left = left;
    dot.style.transform = 'translate(-50%, -50%)';
    container.appendChild(dot);
} 