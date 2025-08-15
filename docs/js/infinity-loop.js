// Infinity Loop Animation - Efficient chaos and rotation
class InfinityParticle {
  constructor(t, speed) {
    this.t = t;
    this.speed = speed;
    this.size = Math.random() * 1.2 + 3;
    // Chaos parameters (static per particle)
    this.chaosAmplitude = Math.random() * 30 + 120;
    this.chaosFrequency = Math.random() * 0.1 + 0.05;
    this.chaosPhaseX = Math.random() * Math.PI * 2;
    this.chaosPhaseY = Math.random() * Math.PI * 2;
    // Rotation drift (static per particle)
    this.rotationDrift = Math.random() * 0.00002 + 0.00002;
  }

  getPosition(centerX, centerY, scale, rotation = 0) {
    const angle = this.t * Math.PI * 2;
    const denominator = 1 + Math.sin(angle) * Math.sin(angle);
    let localX = (scale * Math.cos(angle)) / denominator;
    let localY = (scale * Math.sin(angle) * Math.cos(angle)) / denominator;
    // Apply rotation
    if (rotation !== 0) {
      const rotatedX = localX * Math.cos(rotation) - localY * Math.sin(rotation);
      const rotatedY = localX * Math.sin(rotation) + localY * Math.cos(rotation);
      localX = rotatedX;
      localY = rotatedY;
    }
    // Chaos (static per particle, time-based)
    const time = Date.now() * 0.001;
    const chaosX = Math.sin(time * this.chaosFrequency + this.chaosPhaseX) * this.chaosAmplitude;
    const chaosY = Math.cos(time * this.chaosFrequency + this.chaosPhaseY) * this.chaosAmplitude;
    let x = centerX + localX + chaosX;
    let y = centerY + localY + chaosY;
    return { x, y };
  }

  update(centerX, centerY, scale, rotation = 0) {
    this.t += this.speed + this.rotationDrift;
    if (this.t > 1) this.t -= 1;
    if (this.t < 0) this.t += 1;
    return this.getPosition(centerX, centerY, scale, rotation);
  }

  draw(ctx, position) {
    ctx.save();
    ctx.fillStyle = '#FAF3E7';
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(position.x, position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
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
    this.particleCount = 2000;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = 0.001;
    // Drift properties
    this.driftAmplitudeX = Math.min(scale * 0.1, 40); // up to 10% of scale or 40px
    this.driftAmplitudeY = Math.min(scale * 0.07, 25); // up to 7% of scale or 25px
    this.driftSpeedX = 0.002;
    this.driftSpeedY = 0.0015;
    this.driftPhaseX = Math.random() * Math.PI * 2;
    this.driftPhaseY = Math.random() * Math.PI * 2;
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const t = Math.random();
      // Make particles move slowly
      const speed = 0.00004 + (Math.random() * 0.000001);
      this.particles.push(new InfinityParticle(t, speed));
    }
  }

  randomizeParticles() {
    this.particles.forEach(particle => {
      particle.chaosAmplitude = Math.random() * 40 + 20;
      particle.chaosFrequency = Math.random() * 0.2 + 0.05;
      particle.chaosPhaseX = Math.random() * Math.PI * 20;
      particle.chaosPhaseY = Math.random() * Math.PI * 2;
      particle.rotationDrift = (Math.random() - 0.5) * 0.002;
    });
  }

  update() {
    this.rotation += this.rotationSpeed;
    // Update center drift with slow oscillation
    this.driftPhaseX += this.driftSpeedX * 0.3; // slower oscillation
    this.driftPhaseY += this.driftSpeedY * 0.3;
    this.centerX = this.baseCenterX + Math.sin(this.driftPhaseX) * this.driftAmplitudeX * 0.7;
    this.centerY = this.baseCenterY + Math.cos(this.driftPhaseY) * this.driftAmplitudeY * 0.7;
    this.particles.forEach(particle => {
      particle.update(this.centerX, this.centerY, this.scale, this.rotation);
    });
  }

  draw(ctx) {
    this.particles.forEach(particle => {
      const position = particle.getPosition(this.centerX, this.centerY, this.scale, this.rotation);
      particle.draw(ctx, position);
    });
    // Infinity curve outline removed for performance
  }
}

// Initialize infinity loop animation
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', () => {
  if (isMobile()) return; // Skip animation on mobile devices

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
