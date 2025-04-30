// Initialize p5.js canvas and variables
let canvas;
let diceSize;
let glassTexture;
let diceTexture;
let rotationAngles = [
    { x: 0, y: 0, z: 0 }, // First hour die
    { x: 0, y: 0, z: 0 }, // Second hour die
    { x: 0, y: 0, z: 0 }  // AM/PM die
];
let targetAngles = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 }
];
let lastUpdateHour = -1;
let isAnimating = false;

// Preload any textures or assets
function preload() {
    // Optional: Load textures for dice and glass if needed
    // diceTexture = loadImage('assets/images/dice-texture.png');
    // glassTexture = loadImage('assets/images/glass-texture.png');
}

function setup() {
    // Create canvas sized to match the container
    const container = document.getElementById('dice-container');
    canvas = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
    canvas.parent('dice-container');
    
    // Set initial properties
    angleMode(DEGREES);
    smooth();
    
    // Calculate dice size based on canvas
    diceSize = min(width, height) / 4;
    
    // Initialize dice positions and angles
    updateDiceConfiguration();
}

function draw() {
    // Clear the canvas with transparent background
    clear();
    
    // Add ambient and directional lighting
    ambientLight(80);
    pointLight(255, 255, 180, 0, -50, 100);
    
    // Check if hour has changed
    const now = new Date();
    let currentHour = now.getHours();
    const isAM = currentHour < 12;
    
    // Convert to 12-hour format
    currentHour = currentHour % 12;
    if (currentHour === 0) currentHour = 12;
    
    // Update dice configuration if hour has changed
    if (currentHour !== lastUpdateHour) {
        lastUpdateHour = currentHour;
        updateDiceConfiguration(currentHour, isAM);
        isAnimating = true;
    }
    
    // Draw glass container to match the green dish in the image
    push();
    noFill();
    specularMaterial(100, 150, 100, 30); // More green tint
    shininess(50);
    translate(0, diceSize * 0.1, 0); // Adjust position
    ellipse(0, 0, diceSize * 4, diceSize * 2.5); // Make it more oval
    pop();
    
    // Draw the dice
    drawDice();
    
    // Update animation
    if (isAnimating) {
        animateDice();
    }
}

function updateDiceConfiguration(hour = 12, isAM = true) {
    // Set target angles for dice based on current hour
    // First die: tens place of hour (0 or 1)
    // Second die: ones place of hour (1-9)
    // Third die: AM/PM indicator
    
    const firstDigit = Math.floor(hour / 10);
    const secondDigit = hour % 10;
    
    // Define target rotations for each die
    // These rotations need to be set according to which face should be up
    // for each number (1-6) on the dice
    
    // Maps die face to rotation angles
    const faceRotations = [
        { x: 0, y: 0, z: 0 },     // 1 on top
        { x: 90, y: 0, z: 0 },    // 2 on top
        { x: 0, y: 0, z: 90 },    // 3 on top
        { x: 0, y: 0, z: -90 },   // 4 on top
        { x: -90, y: 0, z: 0 },   // 5 on top
        { x: 180, y: 0, z: 0 }    // 6 on top
    ];
    
    // Set first die (tens place)
    targetAngles[0] = firstDigit === 0 ? 
        faceRotations[0] : // Show 1 when 0 tens place
        faceRotations[0];  // Show 1 when 1 tens place
    
    // Set second die (ones place)
    // Map ones place (0-9) to die face (1-6)
    const secondFaceIndex = (secondDigit === 0 ? 6 : secondDigit) - 1;
    targetAngles[1] = faceRotations[secondFaceIndex];
    
    // Set third die (AM/PM indicator)
    targetAngles[2] = isAM ? faceRotations[0] : faceRotations[5]; // 1 for AM, 6 for PM
}

function animateDice() {
    let allDiceInPosition = true;
    
    // For each die, smoothly animate towards target rotation
    for (let i = 0; i < 3; i++) {
        const die = rotationAngles[i];
        const target = targetAngles[i];
        
        // Animate rotation toward target with easing
        die.x = lerp(die.x, target.x, 0.1);
        die.y = lerp(die.y, target.y, 0.1);
        die.z = lerp(die.z, target.z, 0.1);
        
        // Check if this die has reached its target
        const distanceToTarget = 
            abs(die.x - target.x) + 
            abs(die.y - target.y) + 
            abs(die.z - target.z);
        
        if (distanceToTarget > 0.5) {
            allDiceInPosition = false;
        }
    }
    
    // If all dice have reached their targets, stop animating
    if (allDiceInPosition) {
        isAnimating = false;
    }
}

function drawDice() {
    // Draw dice to match the arrangement in the image
    // The dice appear to be in a triangular arrangement in a green dish
    
    // First die (top left)
    push();
    translate(-diceSize * 0.4, -diceSize * 0.2, 0);
    drawSingleDie(0);
    pop();
    
    // Second die (top right)
    push();
    translate(diceSize * 0.4, -diceSize * 0.2, 0);
    drawSingleDie(1);
    pop();
    
    // Third die (bottom, centered)
    push();
    translate(0, diceSize * 0.5, 0);
    drawSingleDie(2);
    pop();
}

function drawSingleDie(index) {
    push();
    // Apply rotation for current die
    rotateX(rotationAngles[index].x);
    rotateY(rotationAngles[index].y);
    rotateZ(rotationAngles[index].z);
    
    // Draw die cube
    specularMaterial(255, 250, 240);
    shininess(50);
    box(diceSize * 0.8);
    
    // Draw pips on each face
    drawPips();
    pop();
}

function drawPips() {
    // Draw pips (dots) on dice faces
    // Front face (1)
    push();
    translate(0, 0, diceSize * 0.4 + 1);
    fill(0);
    noStroke();
    circle(0, 0, diceSize * 0.15);
    pop();
    
    // Back face (6)
    push();
    translate(0, 0, -diceSize * 0.4 - 1);
    fill(0);
    noStroke();
    let pipSize = diceSize * 0.1;
    circle(-diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(0, -diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(-diceSize * 0.2, diceSize * 0.2, pipSize);
    circle(0, diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, diceSize * 0.2, pipSize);
    pop();
    
    // Right face (3)
    push();
    translate(diceSize * 0.4 + 1, 0, 0);
    rotateY(90);
    fill(0);
    noStroke();
    pipSize = diceSize * 0.12;
    circle(-diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(0, 0, pipSize);
    circle(diceSize * 0.2, diceSize * 0.2, pipSize);
    pop();
    
    // Left face (4)
    push();
    translate(-diceSize * 0.4 - 1, 0, 0);
    rotateY(-90);
    fill(0);
    noStroke();
    pipSize = diceSize * 0.12;
    circle(-diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(-diceSize * 0.2, diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, diceSize * 0.2, pipSize);
    pop();
    
    // Top face (2)
    push();
    translate(0, -diceSize * 0.4 - 1, 0);
    rotateX(-90);
    fill(0);
    noStroke();
    pipSize = diceSize * 0.12;
    circle(-diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, diceSize * 0.2, pipSize);
    pop();
    
    // Bottom face (5)
    push();
    translate(0, diceSize * 0.4 + 1, 0);
    rotateX(90);
    fill(0);
    noStroke();
    pipSize = diceSize * 0.12;
    circle(-diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, -diceSize * 0.2, pipSize);
    circle(0, 0, pipSize);
    circle(-diceSize * 0.2, diceSize * 0.2, pipSize);
    circle(diceSize * 0.2, diceSize * 0.2, pipSize);
    pop();
}

// Handle window resizing
function windowResized() {
    const container = document.getElementById('dice-container');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
    diceSize = min(width, height) / 4;
} 