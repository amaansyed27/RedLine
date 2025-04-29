document.addEventListener('DOMContentLoaded', () => {
  // References to DOM elements
  const animationContainer = document.getElementById('animationContainer');
  const redlineText = document.getElementById('redlineText');
  const taglineText = document.getElementById('taglineText');
  const speedLines = document.getElementById('speedLines');
  const content = document.getElementById('content');
  const backgroundCanvas = document.getElementById('backgroundCanvas');

  // Debug logging
  console.log('Animation initialization starting');
  console.log('Container element found:', animationContainer !== null);
  console.log('Redline text element found:', redlineText !== null);
  
  // isAnimating is already declared above, removing duplicate declaration

  // Force visibility of SVG elements
  const logoSvg = document.querySelector('.logo-svg');
  const logoPath = document.querySelector('.logo-path');
  const logoOutline = document.querySelector('.logo-outline');
  
  if (logoSvg) {
    console.log('SVG element found');
    logoSvg.style.visibility = 'visible';
    logoSvg.style.opacity = '1';
  } else {
    console.error('SVG element not found');
  }
  
  if (logoPath) logoPath.style.opacity = '0'; // Will be animated in
  if (logoOutline) logoOutline.style.opacity = '1';

  let isAnimating = true;

  // Function to create dynamic F1-style lines
  function createDynamicLine() {
    if (!animationContainer || !isAnimating) return;
    
    const line = document.createElement('div');
    line.className = 'dynamic-line';
    
    // Randomize position and properties
    line.style.top = `${Math.random() * 100}%`;
    line.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    line.style.height = `${Math.random() * 3 + 1}px`;
    line.style.animationDuration = `${Math.random() * 0.5 + 0.7}s`;
    
    animationContainer.appendChild(line);
    
    // Remove line after animation completes
    setTimeout(() => {
      if (line.parentNode) {
        line.parentNode.removeChild(line);
      }
    }, 1500);
  }

  // Initialize REDLINE text with individual letters
  const redlineString = 'redline';
  redlineString.split('').forEach((letter, index) => {
    const span = document.createElement('span');
    span.className = 'racing-letter';
    span.textContent = letter;
    span.style.animationDelay = `${2.5 + index * 0.1}s`;
    span.style.transform = `translateX(${-100 + index * 5}px)`;
    redlineText.appendChild(span);
  });

  // Initialize tagline text
  const taglineString = 'PUSHING BOUNDARIES OF INNOVATION';
  taglineString.split(' ').forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'racing-word';
    
    word.split('').forEach((letter, letterIndex) => {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'racing-tagline-letter';
      letterSpan.textContent = letter;
      letterSpan.style.animationDelay = `${3.5 + wordIndex * 0.2 + letterIndex * 0.03}s`;
      letterSpan.style.transform = `translateX(${-50 + letterIndex * 2}px)`;
      wordSpan.appendChild(letterSpan);
    });
    
    taglineText.appendChild(wordSpan);
    
    // Add space after word (except for last word)
    if (wordIndex < taglineString.split(' ').length - 1) {
      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      taglineText.appendChild(space);
    }
  });

  // Create speed lines
  for (let i = 0; i < 8; i++) {
    const speedLine = document.createElement('div');
    speedLine.className = 'speed-line';
    speedLine.style.top = `${10 + i * 10}px`;
    speedLine.style.animationDelay = `${2.8 + i * 0.1}s`;
    speedLine.style.width = `${70 + Math.random() * 30}%`;
    speedLine.style.opacity = 0.1 + Math.random() * 0.2;
    speedLines.appendChild(speedLine);
  }

  // Create dynamic lines at intervals
  const lineInterval = setInterval(createDynamicLine, 150);

  // End animation after a set time
  const timer = setTimeout(() => {
    isAnimating = false;
    animationContainer.classList.add('fade-out');
    console.log('Animation ending, fading out container');
    
    setTimeout(() => {
      // Hide animation container and show content
      animationContainer.style.display = 'none';
      content.style.display = 'block';
      console.log('Animation container hidden, content shown');
      
      // Start background animation
      initBackgroundAnimation();
      
      // Clear intervals
      clearInterval(lineInterval);
    }, 1200); // Time for fade out animation
  }, 6000); // Total animation time

  // Background animation function
  function initBackgroundAnimation() {
    if (!backgroundCanvas) return;

    const ctx = backgroundCanvas.getContext('2d');
    if (!ctx) return;

    // Make canvas full screen
    const resizeCanvas = () => {
      backgroundCanvas.width = window.innerWidth;
      backgroundCanvas.height = window.innerHeight;
    };

    // Call it initially
    resizeCanvas();

    // Resize canvas when window size changes
    window.addEventListener('resize', resizeCanvas);

    // Code rain setup
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\[]{}()=_-+*&^%$#@!~';
    const columns = Math.floor(backgroundCanvas.width / 20); // Width of each column
    const drops = [];

    // Racing lines setup
    const racingLines = [];

    // Generate initial drops position
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Generate initial racing lines
    for (let i = 0; i < 15; i++) {
      createRacingLine();
    }

    function createRacingLine() {
      const x = Math.random() * backgroundCanvas.width;
      const y = Math.random() * backgroundCanvas.height;
      const length = 100 + Math.random() * 200;
      const speed = 5 + Math.random() * 15;
      const width = 1 + Math.random() * 3;
      
      // Gradient from orange to red
      const colorIndex = Math.floor(Math.random() * 3);
      const colors = ['rgba(229,103,23,', 'rgba(208,0,0,', 'rgba(115,0,0,'];
      const color = colors[colorIndex];
      
      const alpha = 0.1 + Math.random() * 0.4;
      
      racingLines.push({ x, y, length, speed, width, color, alpha });
    }

    // Draw subtle grid lines
    function drawGrid(ctx, width, height) {
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Animation frame
    const draw = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

      // Draw code rain
      ctx.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Gradient color from orange to red with varying transparency
        const transparency = Math.random() * 0.5 + 0.1;
        if (Math.random() > 0.97) { // Occasional bright characters
          ctx.fillStyle = `rgba(229, 103, 23, ${transparency + 0.4})`;
        } else {
          ctx.fillStyle = `rgba(208, 0, 0, ${transparency})`;
        }
        
        // Draw text
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        // Move drop position
        if (drops[i] * 20 > backgroundCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }

      // Draw racing lines
      for (let i = 0; i < racingLines.length; i++) {
        const line = racingLines[i];
        
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length, line.y);
        ctx.lineWidth = line.width;
        ctx.strokeStyle = `${line.color}${line.alpha})`;
        ctx.stroke();
        
        // Move racing line
        line.x -= line.speed;
        
        // Reset racing line if it goes off screen
        if (line.x + line.length < 0) {
          line.x = backgroundCanvas.width;
          line.y = Math.random() * backgroundCanvas.height;
          if (Math.random() > 0.95) {
            // Occasionally create a new line
            createRacingLine();
            if (racingLines.length > 30) {
              // Keep the array size reasonable
              racingLines.shift();
            }
          }
        }
      }
      
      // Add grid effect
      drawGrid(ctx, backgroundCanvas.width, backgroundCanvas.height);

      requestAnimationFrame(draw);
    };

    // Start animation
    requestAnimationFrame(draw);
  }
});
