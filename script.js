document.addEventListener("DOMContentLoaded", () => {
  const btnClickMe = document.getElementById("btn-click-me");
  const animationCanvas = document.getElementById("animationCanvas");
  const body = document.body;

  // Snow effect
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.textContent = "❄";
    body.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  setInterval(createSnowflake, 150);

  // Stick figure animation logic
  function drawStickFigureAnimation() {
    const ctx = animationCanvas.getContext("2d");
    animationCanvas.classList.remove("hidden");
    animationCanvas.width = window.innerWidth;
    animationCanvas.height = window.innerHeight;

    const canvasCenterX = animationCanvas.width / 2;
    const canvasCenterY = animationCanvas.height / 2;

    let stickmanX = canvasCenterX - 150; // Stickman initial position
    const initialStickmanX = stickmanX;
    const stickladyX = canvasCenterX + 150; // Sticklady initial position
    const flowerY = canvasCenterY - 10; // Flower's Y position
    let isGivingFlower = false;
    let stickmanReturning = false;

    function drawScene() {
      ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

      // Stickman
      drawStickFigure(ctx, stickmanX, canvasCenterY, false);

      // Sticklady with long flowing hair
      drawStickFigure(ctx, stickladyX, canvasCenterY, true);

      // Flower positioning
      if (isGivingFlower) {
        drawFlower(ctx, stickladyX - 20, canvasCenterY - 30); // Place flower in sticklady's hand
      } else {
        drawFlower(ctx, stickmanX + 35, flowerY); // Flower in stickman's hand or moving
      }

      // Draw pulse animation below stick figures
      drawPulse(ctx, canvasCenterX, canvasCenterY + 150);
    }

    // Draw stick figures with face and features
    function drawStickFigure(ctx, x, y, isLady) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
    
      // Head
      ctx.beginPath();
      ctx.arc(x, y - 50, 20, 0, Math.PI * 2); // Circle for the head
      ctx.stroke();
    
      // Eyes
      ctx.beginPath();
      ctx.arc(x - 8, y - 55, 3, 0, Math.PI * 2); // Left eye
      ctx.arc(x + 8, y - 55, 3, 0, Math.PI * 2); // Right eye
      ctx.fillStyle = "black";
      ctx.fill();
    
      // Nose
      ctx.beginPath();
      ctx.moveTo(x, y - 50);
      ctx.lineTo(x, y - 45);
      ctx.stroke();
    
      // Mouth
      ctx.beginPath();
      ctx.arc(x, y - 40, 5, 0, Math.PI, false); // Smiling curve
      ctx.stroke();
    
      // Body
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x, y + 30); // Line for the body
      ctx.stroke();
    
      // Arms
      ctx.moveTo(x, y);
      ctx.lineTo(x - 30, y - 20); // Left arm
      ctx.moveTo(x, y);
      ctx.lineTo(x + 30, y - 20); // Right arm
      ctx.stroke();
    
      // Legs
      ctx.moveTo(x, y + 30);
      ctx.lineTo(x - 30, y + 80); // Left leg
      ctx.moveTo(x, y + 30);
      ctx.lineTo(x + 30, y + 80); // Right leg
      ctx.stroke();
    
      // Hair for sticklady
      if (isLady) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
    
        // Left side hair
        for (let i = -15; i <= -5; i += 2) {
          ctx.beginPath();
          ctx.moveTo(x + i, y - 70); // Start point above the head
          ctx.lineTo(x + i - 15, y - 30); // Flowing down to the side
          ctx.stroke();
        }
    
        // Right side hair
        for (let i = 5; i <= 15; i += 2) {
          ctx.beginPath();
          ctx.moveTo(x + i, y - 70); // Start point above the head
          ctx.lineTo(x + i + 15, y - 30); // Flowing down to the side
          ctx.stroke();
        }
      }
    }
  
    // Draw flower
    function drawFlower(ctx, x, y) {
      // Stem
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 20);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Leaves
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.lineTo(x - 5, y + 15);
      ctx.moveTo(x, y + 10);
      ctx.lineTo(x + 5, y + 15);
      ctx.stroke();

      // Petals
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const petalX = x + Math.cos(angle) * 8;
        const petalY = y - 8 + Math.sin(angle) * 8;
        ctx.beginPath();
        ctx.arc(petalX, petalY, 6, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    }

    // Draw pulse animation
    function drawPulse(ctx, x, y) {
      const time = Date.now() % 1000;
      const amplitude = 40;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        const px = x - amplitude + t * amplitude * 2;
        const py = y + Math.sin((t + time / 1000) * Math.PI * 2) * 20;
        ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function animate() {
      if (stickmanX < stickladyX - 50 && !stickmanReturning) {
        stickmanX += 0.5; // Slow animation
      } else if (!isGivingFlower) {
        isGivingFlower = true; // Flower transfer
      } else if (stickmanReturning) {
        stickmanX -= 0.5;
        if (stickmanX <= initialStickmanX) {
          return; // Stop animation
        }
      } else {
        stickmanReturning = true; // Start return
      }

      drawScene();
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Button event
  btnClickMe.addEventListener("click", () => {
    btnClickMe.style.display = "none";
    drawStickFigureAnimation();
  });
});
