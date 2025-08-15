// Infinity Loop Animation - Figure Eight made of particles
class InfinityParticle {
  constructor(t, speed, offset = 0) {
    this.t = t; // Parameter along the curve (0 to 1)
    this.speed = speed;
    this.offset = offset;
    this.size = Math.random() * 2 + 1; // 0.2 to 1.2 (much smaller)
    this.opacity = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
    this.metallic = Math.random() > 0.3; // 70% metallic, 30% transparent
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.trail = [];
    this.maxTrailLength = 3; // Shorter trails for chaos

    // Add chaos variables - increased for larger scale
    this.chaosAmplitude = Math.random() * 50 + 50; // 20 to 60 pixels of chaos (much larger)
    this.chaosFrequency = Math.random() * 0.1 + 0.05; // Chaos oscillation speed
    this.chaosPhaseX = Math.random() * Math.PI * 5;
    this.chaosPhaseY = Math.random() * Math.PI * 2;
    this.driftSpeed = (Math.random() - 0.5) * 0.002; // Random drift
  }

  // Lemniscate (figure-eight) parametric equations with chaos and rotation
  getPosition(centerX, centerY, scale, rotation = 0) {
    const angle = this.t * Math.PI * 2;
    const denominator = 1 + Math.sin(angle) * Math.sin(angle);

    // Base infinity curve position (relative to center)
    let localX = (scale * Math.cos(angle)) / denominator;
    let localY = (scale * Math.sin(angle) * Math.cos(angle)) / denominator;

    // Apply rotation to the local coordinates
    if (rotation !== 0) {
      const rotatedX = localX * Math.cos(rotation) - localY * Math.sin(rotation);
      const rotatedY = localX * Math.sin(rotation) + localY * Math.cos(rotation);
      localX = rotatedX;
      localY = rotatedY;
    }

    // Translate to world coordinates
    let x = centerX + localX;
    let y = centerY + localY;

    // Add chaotic movement
    const time = Date.now() * 0.001;
    const chaosX = Math.sin(time * this.chaosFrequency + this.chaosPhaseX) * this.chaosAmplitude;
    const chaosY = Math.cos(time * this.chaosFrequency + this.chaosPhaseY) * this.chaosAmplitude;

    // Add turbulence based on position along curve - scaled up
    const turbulence = Math.sin(this.t * 15 + time * 2) * 20;

    x += chaosX + turbulence;
    y += chaosY + turbulence * 0.7;

    return { x, y };
  }

  update(centerX, centerY, scale, rotation = 0) {
    // Move along the curve with drift
    this.t += this.speed + this.driftSpeed;
    if (this.t > 1) this.t -= 1; // Loop back
    if (this.t < 0) this.t += 1; // Handle negative drift

    // Update chaos phases (slower for more meditative feel)
    this.chaosPhaseX += 0.008;
    this.chaosPhaseY += 0.01; // Slightly different for more chaos

    // Update trail
    const pos = this.getPosition(centerX, centerY, scale, rotation);
    this.trail.unshift({ x: pos.x, y: pos.y });
    if (this.trail.length > this.maxTrailLength) {
      this.trail.pop();
    }

    // Update pulse phase for breathing effect (slower)
    this.pulsePhase += 0.05;

    return pos;
  }

  draw(ctx, position) {
    // Draw trail first (behind particle)
    if (this.trail.length > 1) {
      ctx.save();
      ctx.strokeStyle = this.metallic ? '#FAF3E7' : 'rgba(250, 243, 231, 0.3)';
      ctx.lineWidth = 1;
      ctx.globalAlpha = this.opacity * 0.3;

      ctx.beginPath();
      this.trail.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
      ctx.restore();
    }

    // Draw main particle
    ctx.save();

    // Pulsing effect
    const pulse = Math.sin(this.pulsePhase) * 0.5 + 1;
    const currentSize = this.size * pulse;

    if (this.metallic) {
      // Metallic white appearance
      const gradient = ctx.createRadialGradient(
        position.x, position.y, 0,
        position.x, position.y, currentSize * 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.4, 'rgba(250, 243, 231, 0.8)');
      gradient.addColorStop(1, 'rgba(250, 243, 231, 0.2)');

      ctx.fillStyle = gradient;
      ctx.globalAlpha = this.opacity;
    } else {
      // Transparent glass-like appearance
      ctx.fillStyle = 'rgba(250, 243, 231, 0.4)';
      ctx.globalAlpha = this.opacity * 0.6;
    }

    ctx.beginPath();
    ctx.arc(position.x, position.y, currentSize, 0, Math.PI * 2);
    ctx.fill();

    // Add highlight for metallic particles
    if (this.metallic) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.globalAlpha = this.opacity * 0.8;
      ctx.beginPath();
      ctx.arc(
        position.x - currentSize * 0.3,
        position.y - currentSize * 0.3,
        currentSize * 0.3,
        0, Math.PI * 2
      );
      ctx.fill();
    }

    ctx.restore();
  }
}

class InfinityLoop {
  constructor(centerX, centerY, scale) {
    this.baseCenterX = centerX;
    this.baseCenterY = centerY;
    this.centerX = centerX;
    this.centerY = centerY;
    this.scale = scale;
    this.particles = [];
    this.particleCount = 1500; // Thousands of particles!

    // Center drift properties
    this.driftAmplitudeX = Math.min(scale * 0.3, 100); // Drift up to 30% of scale or 100px max
    this.driftAmplitudeY = Math.min(scale * 0.2, 60);  // Smaller Y drift
    this.driftSpeedX = 0.002;
    this.driftSpeedY = 0.0015;
    this.driftPhaseX = 0;
    this.driftPhaseY = Math.PI / 3; // Phase offset for figure-8 drift pattern

    // Rotation properties
  this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = 0.001; // Very slow rotation

    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const t = Math.random(); // Random starting positions for chaos
      const baseSpeed = 0.0001; // Much slower particles
      const speedVariation = Math.random() * 0.00005; // Slower speed variation
      const speed = baseSpeed + speedVariation;

      this.particles.push(new InfinityParticle(t, speed, i * 0.01));
    }
  }

  update() {
    // Update center drift
    this.driftPhaseX += this.driftSpeedX;
    this.driftPhaseY += this.driftSpeedY;

    this.centerX = this.baseCenterX + Math.sin(this.driftPhaseX) * this.driftAmplitudeX;
    this.centerY = this.baseCenterY + Math.cos(this.driftPhaseY) * this.driftAmplitudeY;

    // Update rotation
    this.rotation += this.rotationSpeed;

    this.particles.forEach(particle => {
      particle.update(this.centerX, this.centerY, this.scale, this.rotation);
    });
  }

  draw(ctx) {
    // Draw all particles
    this.particles.forEach(particle => {
      const position = particle.getPosition(this.centerX, this.centerY, this.scale, this.rotation);
      particle.draw(ctx, position);
    });

    // Draw subtle infinity curve outline
    ctx.save();
    ctx.strokeStyle = 'rgba(250, 243, 231, 0.1)';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;

    ctx.beginPath();
    for (let t = 0; t <= 1; t += 0.01) {
      const angle = t * Math.PI * 2;
      const cos2t = Math.cos(2 * angle);
      const denominator = 1 + Math.sin(angle) * Math.sin(angle);

      const x = this.centerX + (this.scale * Math.cos(angle)) / denominator;
      const y = this.centerY + (this.scale * Math.sin(angle) * Math.cos(angle)) / denominator;

      if (t === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }
}

// Initialize infinity loop animation
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let infinityLoop;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Create massive infinity loop that fills and overflows the hero section
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 3;
    const scale = Math.min(canvas.width, canvas.height) ; // Massive scale using width OR height (whichever is larger)

    infinityLoop = new InfinityLoop(centerX, centerY, scale);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (infinityLoop) {
      infinityLoop.update();
      infinityLoop.draw(ctx);
    }

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  animate();

  window.addEventListener('resize', resizeCanvas);
});
