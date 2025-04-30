// Initialize variables
let lastUpdateHour = -1;

function setup() {
    // Create the dot containers
    createDotContainers();
    
    // Initial update
    updateDots();
    
    // Set up an interval to check for hour changes
    setInterval(updateDots, 5000); // Check every 5 seconds
}

function createDotContainers() {
    const diceContainer = document.getElementById('dice-container');
    
    // Clear any existing content
    diceContainer.innerHTML = '';
    
    // Create AM/PM container
    const amPmContainer = document.createElement('div');
    amPmContainer.id = 'am-pm-container';
    amPmContainer.className = 'dot-container';
    diceContainer.appendChild(amPmContainer);
    
    // Create tens container
    const tensContainer = document.createElement('div');
    tensContainer.id = 'tens-container';
    tensContainer.className = 'dot-container';
    diceContainer.appendChild(tensContainer);
    
    // Create ones container
    const onesContainer = document.createElement('div');
    onesContainer.id = 'ones-container';
    onesContainer.className = 'dot-container';
    diceContainer.appendChild(onesContainer);
}

function updateDots() {
    // Get current time
    const now = new Date();
    let hours = now.getHours();
    const isAM = hours < 12;
    
    // Convert to 12-hour format
    hours = hours % 12;
    if (hours === 0) hours = 12;
    
    // Only update if the hour has changed
    if (hours === lastUpdateHour) return;
    lastUpdateHour = hours;
    
    // Update AM/PM dot
    updateAmPmDot(isAM);
    
    // Get the dot configuration based on the mapping
    const config = getHourDotConfiguration(hours, isAM);
    
    // Update tens place dots
    updateDiceDots('tens-container', config.tens);
    
    // Update ones place dots
    updateDiceDots('ones-container', config.ones);
}

function updateAmPmDot(isAM) {
    const container = document.getElementById('am-pm-container');
    container.innerHTML = '';
    
    const dot = document.createElement('div');
    dot.className = 'dot am-pm-dot';
    dot.style.backgroundColor = isAM ? '#000' : '#ff0000';
    container.appendChild(dot);
}

function updateDiceDots(containerId, dotNumber) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // If dot number is 0, no dots are shown
    if (dotNumber === 0) return;
    
    // Create dots based on the face number
    switch (dotNumber) {
        case 1:
            addDot(container, 'dot-1-center');
            break;
        case 2:
            addDot(container, 'dot-2-topleft');
            addDot(container, 'dot-2-bottomright');
            break;
        case 3:
            addDot(container, 'dot-3-topleft');
            addDot(container, 'dot-3-center');
            addDot(container, 'dot-3-bottomright');
            break;
        case 4:
            addDot(container, 'dot-4-topleft');
            addDot(container, 'dot-4-topright');
            addDot(container, 'dot-4-bottomleft');
            addDot(container, 'dot-4-bottomright');
            break;
        case 5:
            addDot(container, 'dot-5-topleft');
            addDot(container, 'dot-5-topright');
            addDot(container, 'dot-5-center');
            addDot(container, 'dot-5-bottomleft');
            addDot(container, 'dot-5-bottomright');
            break;
        case 6:
            addDot(container, 'dot-6-topleft');
            addDot(container, 'dot-6-topmiddle');
            addDot(container, 'dot-6-topright');
            addDot(container, 'dot-6-bottomleft');
            addDot(container, 'dot-6-bottommiddle');
            addDot(container, 'dot-6-bottomright');
            break;
    }
}

function addDot(container, className) {
    const dot = document.createElement('div');
    dot.className = 'dot ' + className;
    container.appendChild(dot);
}

function getHourDotConfiguration(hour, isAM) {
    // Configuration based on the mapping you provided
    switch (hour) {
        case 12:
            return { tens: 6, ones: 6 };
        case 1:
            return { tens: 0, ones: 1 };
        case 2:
            return { tens: 0, ones: 2 };
        case 3:
            return { tens: 0, ones: 3 };
        case 4:
            return { tens: 0, ones: 4 };
        case 5:
            return { tens: 0, ones: 5 };
        case 6:
            return { tens: 0, ones: 6 };
        case 7:
            return { tens: 1, ones: 6 };
        case 8:
            return { tens: 2, ones: 6 };
        case 9:
            return { tens: 3, ones: 6 };
        case 10:
            return { tens: 4, ones: 6 };
        case 11:
            return { tens: 5, ones: 6 };
        default:
            return { tens: 0, ones: 0 };
    }
} 