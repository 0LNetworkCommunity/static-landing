// Particle Swarm System
class Particle {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.canvas = canvas;
    
    // Add randomness to particle properties
    this.maxSpeed = Math.random() * 0.8 + 0.4; // 0.4 to 1.2
    this.maxForce = Math.random() * 0.04 + 0.02; // 0.02 to 0.06
    this.separationRadius = Math.random() * 20 + 15; // 15 to 35
    this.alignmentRadius = Math.random() * 30 + 40; // 40 to 70
    this.cohesionRadius = Math.random() * 25 + 35; // 35 to 60
    this.size = Math.random() * 3 + 0.5; // 0.5 to 3.5
    this.opacity = Math.random() * 0.7 + 0.1; // 0.1 to 0.8
    
    // Add wandering behavior
    this.wanderAngle = Math.random() * Math.PI * 2;
    this.wanderStrength = Math.random() * 0.02 + 0.005;
    
    // Add oscillation for organic movement
    this.oscillationOffset = Math.random() * Math.PI * 2;
    this.oscillationSpeed = Math.random() * 0.02 + 0.01;
    this.oscillationAmount = Math.random() * 0.3 + 0.1;
  }

  flock(particles) {
    const sep = this.separate(particles);
    const ali = this.align(particles);
    const coh = this.cohesion(particles);
    const wander = this.wander();
    const oscillate = this.oscillate();
    
    // Randomize force weights for more organic behavior
    const sepWeight = Math.random() * 1.5 + 1.5; // 1.5 to 3.0
    const aliWeight = Math.random() * 0.8 + 0.6; // 0.6 to 1.4
    const cohWeight = Math.random() * 0.8 + 0.6; // 0.6 to 1.4
    const wanderWeight = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
    const oscillateWeight = Math.random() * 0.2 + 0.1; // 0.1 to 0.3
    
    sep.multiply(sepWeight);
    ali.multiply(aliWeight);
    coh.multiply(cohWeight);
    wander.multiply(wanderWeight);
    oscillate.multiply(oscillateWeight);
    
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    this.applyForce(wander);
    this.applyForce(oscillate);
  }

  separate(particles) {
    const steer = new Vector(0, 0);
    let count = 0;
    
    particles.forEach(other => {
      const d = this.distance(other);
      if (d > 0 && d < this.separationRadius) {
        const diff = new Vector(this.x - other.x, this.y - other.y);
        diff.normalize();
        diff.divide(d); // Weight by distance
        steer.add(diff);
        count++;
      }
    });
    
    if (count > 0) {
      steer.divide(count);
      steer.normalize();
      steer.multiply(this.maxSpeed);
      steer.subtract(new Vector(this.vx, this.vy));
      steer.limit(this.maxForce);
    }
    
    return steer;
  }

  align(particles) {
    const steer = new Vector(0, 0);
    let count = 0;
    
    particles.forEach(other => {
      const d = this.distance(other);
      if (d > 0 && d < this.alignmentRadius) {
        steer.add(new Vector(other.vx, other.vy));
        count++;
      }
    });
    
    if (count > 0) {
      steer.divide(count);
      steer.normalize();
      steer.multiply(this.maxSpeed);
      steer.subtract(new Vector(this.vx, this.vy));
      steer.limit(this.maxForce);
    }
    
    return steer;
  }

  cohesion(particles) {
    const steer = new Vector(0, 0);
    let count = 0;
    
    particles.forEach(other => {
      const d = this.distance(other);
      if (d > 0 && d < this.cohesionRadius) {
        steer.add(new Vector(other.x, other.y));
        count++;
      }
    });
    
    if (count > 0) {
      steer.divide(count);
      steer.subtract(new Vector(this.x, this.y));
      steer.normalize();
      steer.multiply(this.maxSpeed);
      steer.subtract(new Vector(this.vx, this.vy));
      steer.limit(this.maxForce);
    }
    
    return steer;
  }

  wander() {
    // Random wandering behavior
    this.wanderAngle += (Math.random() - 0.5) * 0.3;
    const wanderForce = new Vector(
      Math.cos(this.wanderAngle) * this.wanderStrength,
      Math.sin(this.wanderAngle) * this.wanderStrength
    );
    return wanderForce;
  }

  oscillate() {
    // Oscillating movement for organic feel
    this.oscillationOffset += this.oscillationSpeed;
    const oscillateForce = new Vector(
      Math.cos(this.oscillationOffset) * this.oscillationAmount * 0.01,
      Math.sin(this.oscillationOffset * 1.3) * this.oscillationAmount * 0.01
    );
    return oscillateForce;
  }

  distance(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  applyForce(force) {
    // Add slight randomness to force application
    const randomFactor = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
    this.vx += force.x * randomFactor;
    this.vy += force.y * randomFactor;
  }

  update() {
    // Limit speed
    const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed;
      this.vy = (this.vy / speed) * this.maxSpeed;
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    // Wrap around edges
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    // Add slight color variation for more randomness
    const colorVariation = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 10;
    const red = Math.floor(250 + colorVariation);
    const green = Math.floor(243 + colorVariation);
    const blue = Math.floor(231 + colorVariation);
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    
    // Add slight size pulsing
    const pulse = Math.sin(Date.now() * 0.003 + this.oscillationOffset) * 0.3 + 1;
    const currentSize = this.size * pulse;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  multiply(n) {
    this.x *= n;
    this.y *= n;
  }

  divide(n) {
    this.x /= n;
    this.y /= n;
  }

  normalize() {
    const mag = Math.sqrt(this.x ** 2 + this.y ** 2);
    if (mag > 0) {
      this.x /= mag;
      this.y /= mag;
    }
  }

  limit(max) {
    const mag = Math.sqrt(this.x ** 2 + this.y ** 2);
    if (mag > max) {
      this.x = (this.x / mag) * max;
      this.y = (this.y / mag) * max;
    }
  }
}

// Initialize particle system when page loads
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return; // Exit if canvas not found
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 50; // Increased from 25 to 50

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        canvas
      ));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.flock(particles);
      particle.update();
      particle.draw(ctx);
    });
    
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
});