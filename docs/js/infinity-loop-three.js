// Infinity Loop Animation in Three.js for index.html
const PARTICLE_COUNT = 400;
const LOOP_SCALE = 180;
const PARTICLE_SIZE = 6;

let renderer, scene, camera, points, geometry, positions, particles;

function initInfinityLoopThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x181825, 0); // transparent background
  renderer.setSize(window.innerWidth, window.innerHeight);
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
  const color = new THREE.Color();

  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random();
    const speed = 0.00008 + Math.random() * 0.00001;
    const chaosAmplitude = Math.random() * 30 + 40;
    const chaosFrequency = Math.random() * 0.1 + 0.05;
    const chaosPhaseX = Math.random() * Math.PI * 2;
    const chaosPhaseY = Math.random() * Math.PI * 2;
    particles.push({ t, speed, chaosAmplitude, chaosFrequency, chaosPhaseX, chaosPhaseY });
    color.setHSL(0.62, 0.7, 0.95); // Soft white
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({ size: PARTICLE_SIZE, vertexColors: true });
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
  // Reduce chaos for a cleaner figure eight
  x += Math.sin(time * particle.chaosFrequency + particle.chaosPhaseX) * (particle.chaosAmplitude * 0.2);
  y += Math.cos(time * particle.chaosFrequency + particle.chaosPhaseY) * (particle.chaosAmplitude * 0.2);
  return [x, y, 0];
}

function animateInfinityLoop() {
  requestAnimationFrame(animateInfinityLoop);
  const time = Date.now() * 0.001;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = particles[i];
    p.t += p.speed;
    if (p.t > 1) p.t -= 1;
    if (p.t < 0) p.t += 1;
    const [x, y, z] = getInfinityPosition(p.t, time, p);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  geometry.attributes.position.needsUpdate = true;
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
