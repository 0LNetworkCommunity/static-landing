// Infinity Loop Animation in Three.js for index.html

const PARTICLE_COUNT = 2000;
const LOOP_SCALE = Math.max(window.innerWidth, window.innerHeight) * 0.6;



let renderer, scene, camera, points, geometry, positions, particles, sizes;

function initInfinityLoopThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x181825, 0); // transparent background
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Update LOOP_SCALE for resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Make the loop always overflow the view
    LOOP_SCALE = Math.max(window.innerWidth, window.innerHeight) * 0.6;
    camera.position.z = 400;
  });
  const canvasEl = document.getElementById('particle-canvas');
  if (canvasEl) {
    canvasEl.replaceWith(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }
  renderer.domElement.id = 'particle-canvas';
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100vw';
  renderer.domElement.style.height = '100vh';
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.opacity = '0.4';
  renderer.domElement.style.zIndex = '10';


  geometry = new THREE.BufferGeometry();
  positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  sizes = new Float32Array(PARTICLE_COUNT);
  const color = new THREE.Color();

  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random();
    // Ensure speed is always positive and not zero
    const speed = 0.00009 + Math.random() * 0.00002; // Slightly higher min speed
    const chaosAmplitude = Math.random() * 30 + 40;
    const chaosFrequency = Math.random() * 0.1 + 0.05;
    const chaosPhaseX = Math.random() * Math.PI * 2;
    const chaosPhaseY = Math.random() * Math.PI * 2;
    const size = Math.random() * 3 + 2; // Size between 2 and 5
    particles.push({ t, speed, chaosAmplitude, chaosFrequency, chaosPhaseX, chaosPhaseY, size });
    color.setHSL(0.62, 0.7, 0.95); // Soft white
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    sizes[i] = size;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Custom shader material for per-particle size
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
    },
    vertexColors: true,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float size;
      attribute vec3 customColor;
      varying vec3 vColor;
      void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        gl_FragColor = vec4(vColor, 0.85 * (1.0 - dist * 1.5));
      }
    `
  });
  points = new THREE.Points(geometry, material);
  scene.add(points);

  camera.position.z = 400;

  animateInfinityLoop();
}

function getInfinityPosition(t, time, particle) {
  const angle = t * Math.PI * 2;
  const denominator = 1 + Math.sin(angle) * Math.sin(angle);
  let x = (LOOP_SCALE * Math.cos(angle)) / denominator;
  let y = (LOOP_SCALE * Math.sin(angle) * Math.cos(angle)) / denominator;
  // Increase chaos for more dynamic movement
  const chaosX = Math.sin(time * particle.chaosFrequency + particle.chaosPhaseX) * (particle.chaosAmplitude * 0.7);
  const chaosY = Math.cos(time * particle.chaosFrequency + particle.chaosPhaseY) * (particle.chaosAmplitude * 0.7);
  // Remove synchronized turbulence for more natural chaos
  x += chaosX;
  y += chaosY;
  return [x, y, 0];
}

function animateInfinityLoop() {
  requestAnimationFrame(animateInfinityLoop);
  const time = Date.now() * 0.001;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = particles[i];
    p.t += p.speed;
    // Always move forward, wrap around if needed
    if (p.t > 1) p.t -= 1;
    // No negative drift, so no need to check p.t < 0
    const [x, y, z] = getInfinityPosition(p.t, time, p);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    sizes[i] = p.size;
  }
  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.size.needsUpdate = true;
  points.rotation.z += 0.001;
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 400;
});

// Initialize after Three.js is loaded
initInfinityLoopThree();
