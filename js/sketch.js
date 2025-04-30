// Initialize variables
let lastUpdateHour = -1;
let lastUpdateMinute = -1;

function setup() {
    // Create the dot containers
    createDotContainers();
    
    // Initial update
    updateDots();
    
    // Set up an interval to check for time changes
    setInterval(updateDots, 1000); // Check every second
}

function createDotContainers() {
    const diceContainer = document.getElementById('dice-container');
    
    // Clear any existing content
    diceContainer.innerHTML = '';
    
    // Create AM/PM container (First Dot)
    const amPmContainer = document.createElement('div');
    amPmContainer.id = 'am-pm-container';
    amPmContainer.className = 'dot-container';
    amPmContainer.style.width = '50px';
    amPmContainer.style.height = '50px';
    amPmContainer.style.position = 'absolute';
    amPmContainer.style.top = '38px';
    amPmContainer.style.left = '3px';
    amPmContainer.style.backgroundColor = 'transparent';
    diceContainer.appendChild(amPmContainer);
    
    // Create tens container (Second Dot)
    const tensContainer = document.createElement('div');
    tensContainer.id = 'tens-container';
    tensContainer.className = 'dot-container';
    tensContainer.style.width = '50px';
    tensContainer.style.height = '50px';
    tensContainer.style.position = 'absolute';
    tensContainer.style.top = '74px';
    tensContainer.style.right = '-15px';
    tensContainer.style.backgroundColor = 'transparent';
    diceContainer.appendChild(tensContainer);
    
    // Create ones container (Third Dot)
    const onesContainer = document.createElement('div');
    onesContainer.id = 'ones-container';
    onesContainer.className = 'dot-container';
    onesContainer.style.width = '50px';
    onesContainer.style.height = '50px';
    onesContainer.style.position = 'absolute';
    onesContainer.style.bottom = '-63px';
    onesContainer.style.left = '-18px';
    onesContainer.style.backgroundColor = 'transparent';
    diceContainer.appendChild(onesContainer);
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
    
    // Only update if the hour or minute has changed (to handle edge cases)
    if (hours === lastUpdateHour && minutes === lastUpdateMinute) return;
    lastUpdateHour = hours;
    lastUpdateMinute = minutes;
    
    // Update AM/PM dot
    updateAmPmDot(isAM);
    
    // Get the dot configuration based on the mapping
    const config = getHourDotConfiguration(hours, isAM);
    
    // Update tens place dots
    updateDiceDots('tens-container', config.tens);
    
    // Update ones place dots
    updateDiceDots('ones-container', config.ones);
    
    // Output for debugging
    console.log(`Time: ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${isAM ? 'AM' : 'PM'}`);
    console.log(`Dot configuration: AM/PM=${isAM ? 'Black' : 'Red'}, Tens=${config.tens}, Ones=${config.ones}`);
}

function updateAmPmDot(isAM) {
    const container = document.getElementById('am-pm-container');
    container.innerHTML = '';
    
    // Add a single dot in the middle - black for AM, red for PM
    const dot = document.createElement('div');
    dot.className = 'dot am-pm-dot';
    dot.style.position = 'absolute';
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = isAM ? '#000' : '#ff0000';
    dot.style.top = '50%';
    dot.style.left = '50%';
    dot.style.transform = 'translate(-50%, -50%)';
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

function getHourDotConfiguration(hour, isAM) {
    // Configuration based on the mapping provided
    // 12 am: First Dot= Black, Second Dot=6, Third Dot=6
    // 1 am: First Dot= Black, Second Dot=0, Third Dot=1
    // And so on...
    
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