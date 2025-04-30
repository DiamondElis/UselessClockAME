# The Useless Clock

A unique web-based clock that displays time using 3D dice. Instead of traditional clock hands or digital numbers, this clock uses three dice to show:
- The tens place of the hour (1)
- The ones place of the hour (1-9)
- AM/PM indicator (1 for AM, 6 for PM)

## Features

- Real-time 3D dice animation using p5.js and WebGL
- Smooth transitions when time changes
- Responsive design that works on all screen sizes
- Graceful fallback for browsers without WebGL support
- Beautiful background image integration
- Custom font support

## Prerequisites

- A modern web browser with WebGL support
- Basic understanding of HTML, CSS, and JavaScript (for customization)

## Installation

1. Clone or download this repository
2. Place your background image as `useless-clock.jpg` in the `assets/images` directory
3. (Optional) Place your texture image as `gold-texture.jpg` in the `assets/images` directory
4. (Optional) Place your custom font as `clock-font.ttf` in the `assets/fonts` directory

## Project Structure

```
useless-clock/
├── assets/
│   ├── images/
│   │   ├── useless-clock.jpg  // Your background image
│   │   └── gold-texture.jpg   // Optional texture image
│   ├── fonts/
│   │   └── clock-font.ttf     // Optional custom font
├── css/
│   └── style.css             // Main stylesheet
├── js/
│   ├── sketch.js            // p5.js sketch for 3D dice
│   └── main.js              // Main JavaScript file
└── index.html               // Main HTML file
```

## Usage

1. Open `index.html` in a web browser
2. The clock will automatically start displaying the current time using 3D dice
3. The dice will animate smoothly when the time changes
4. The display is responsive and will adjust to different screen sizes

## Customization

### Changing the Background Image
1. Replace `assets/images/useless-clock.jpg` with your own image
2. Adjust the positioning in `css/style.css` if needed:
```css
.background-container {
    background-image: url('../assets/images/your-image.jpg');
}
```

### Adjusting Dice Position
Modify the dice container position in `css/style.css`:
```css
#dice-container {
    top: 65%; /* Adjust vertical position */
    left: 50%; /* Adjust horizontal position */
}
```

### Changing Dice Appearance
Modify the dice properties in `js/sketch.js`:
```javascript
// Change dice size
diceSize = min(width, height) / 4;

// Change dice color
specularMaterial(255, 250, 240); // RGB values
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

Note: The clock requires WebGL support. A fallback message will be displayed if WebGL is not available.

## Dependencies

- p5.js v1.4.0 (loaded via CDN)
- WebGL (built into modern browsers)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- p5.js library for 3D graphics
- WebGL for hardware-accelerated graphics 