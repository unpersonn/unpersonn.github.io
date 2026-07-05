/* ==========================================================================
   Cozy Storytelling — Unperson (aka Yash Patel)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSelector();
  initThreeJSBackground();
  initScrollAnimations();
  initCozyPlayer();
  lucide.createIcons();
});

/* ==========================================================================
   1. Theme Selector
   ========================================================================== */
let currentTheme = 'glass';

function initThemeSelector() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const theme = btn.getAttribute('data-theme');
      currentTheme = theme;
      document.body.className = '';
      document.body.classList.add(`theme-${theme}`);
      if (isAudioPlaying) document.body.classList.add('playing');
    });
  });
}

/* ==========================================================================
   2. Three.js Interactive WebGL Background (Deep Space Starfield)
   ========================================================================== */
let scene, camera, renderer, particles;

function initThreeJSBackground() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Ensure Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error("Three.js not loaded yet.");
    return;
  }

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.001); // Subtle depth fog

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create Starfield Particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];
  const colorObj = new THREE.Color();

  const particleCount = Math.min(6000, window.innerWidth * 4); // Scale for mobile
  
  for ( let i = 0; i < particleCount; i ++ ) {
    // Distribute particles in a large sphere
    const x = (Math.random() - 0.5) * 4000;
    const y = (Math.random() - 0.5) * 4000;
    const z = (Math.random() - 0.5) * 4000;
    vertices.push( x, y, z );
    
    // Mix of theme colors (Purple and Cyan)
    const randColor = Math.random();
    if(randColor > 0.6) {
      colorObj.setHex(0x38bdf8); // Cyan
    } else if (randColor > 0.2) {
      colorObj.setHex(0x8b5cf6); // Purple
    } else {
      colorObj.setHex(0xfbbf24); // Warm Amber
    }
    colors.push(colorObj.r, colorObj.g, colorObj.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Track scroll position for camera movement
  let currentScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    currentScrollY = window.scrollY;
  });

  // Mouse interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.5;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.5;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Slowly rotate the entire galaxy
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;

    // Smooth mouse parallax
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;

    // Fly camera forward directly based on vertical scroll depth!
    // The further down you scroll, the deeper into the Z space you fly!
    const targetZ = 1000 - (currentScrollY * 1.2); 
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    renderer.render(scene, camera);
  }
  
  animate();
}

/* ==========================================================================
   3. Scroll Animations & Intersection Observers
   ========================================================================== */
function initScrollAnimations() {
  const chapters = document.querySelectorAll('.story-chapter');
  const revealElements = document.querySelectorAll('.reveal-up');
  const navDots = document.querySelectorAll('.nav-dot');
  const progressBar = document.getElementById('zoom-progress-bar');

  // Trigger CSS animations when elements scroll into view
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        tryAutoplayMusic();
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // Update Side Navigation Active Dot based on active chapter
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(chapters).indexOf(entry.target);
        navDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    });
  }, { threshold: 0.5 });

  chapters.forEach(chap => chapterObserver.observe(chap));

  // Click side dots to scroll smoothly to that chapter
  navDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      chapters[idx].scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Top Progress Bar
  window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollLen = Math.ceil((scrollPx / winHeightPx) * 100);
    if(progressBar) progressBar.style.width = scrollLen + "%";
  }, { passive: true });
}

/* ==========================================================================
   4. Cozy Background Music Player Controller
   ========================================================================== */
const PLAYLIST = [
  {
    id: 'k',
    title: "K.",
    artist: "Cigarettes After Sex",
    cover: "assets/images/K. - Cigarettes After Sex.jpeg",
    audioSrc: "assets/audio/K. - Cigarettes After Sex.mp3"
  },
  {
    id: 'her',
    title: "her",
    artist: "JVKE",
    cover: "assets/images/her - JVKE.jpeg",
    audioSrc: "assets/audio/her - JVKE.mp3"
  },
  {
    id: 'sayoko',
    title: "Sayoko",
    artist: "ryoko",
    cover: "assets/images/Sayoko - ryoko.jpeg",
    audioSrc: "assets/audio/Sayoko - ryoko.mp3"
  },
  {
    id: '3d',
    title: "3D (feat. Jack Harlow)",
    artist: "Jung Kook",
    cover: "assets/images/3D - Jung Kook.jpeg",
    audioSrc: "assets/audio/3D - Jung Kook.mp3"
  }
];

let currentTrackIdx = 0;
let audioElement = new Audio();
let isAudioPlaying = false;
let userInteractedWithAudio = false;

function initCozyPlayer() {
  const widgetPlayBtn = document.getElementById('widget-btn-play');
  const widgetPrevBtn = document.getElementById('widget-btn-prev');
  const widgetNextBtn = document.getElementById('widget-btn-next');
  const widgetShuffleBtn = document.getElementById('widget-btn-shuffle');
  const promptBtn = document.getElementById('music-prompt-btn');

  loadTrack(0);

  // Click on background or prompt to start music
  document.body.addEventListener('click', tryAutoplayMusic, { once: true });
  if (promptBtn) promptBtn.addEventListener('click', togglePlay);

  if (widgetPlayBtn) widgetPlayBtn.addEventListener('click', togglePlay);
  if (widgetPrevBtn) widgetPrevBtn.addEventListener('click', () => {
    const prevIdx = (currentTrackIdx - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadAndPlayTrack(prevIdx);
  });
  if (widgetNextBtn) widgetNextBtn.addEventListener('click', () => {
    const nextIdx = (currentTrackIdx + 1) % PLAYLIST.length;
    loadAndPlayTrack(nextIdx);
  });
  if (widgetShuffleBtn) widgetShuffleBtn.addEventListener('click', () => {
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * PLAYLIST.length);
    } while (PLAYLIST.length > 1 && randIdx === currentTrackIdx);
    loadAndPlayTrack(randIdx);
  });

  // Chapter 3 Song Card Buttons
  const songCards = document.querySelectorAll('.cozy-song-card');
  songCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (currentTrackIdx === idx) {
        togglePlay();
      } else {
        loadAndPlayTrack(idx);
      }
    });
  });

  audioElement.addEventListener('ended', () => {
    const nextIdx = (currentTrackIdx + 1) % PLAYLIST.length;
    loadAndPlayTrack(nextIdx);
  });
}

function loadTrack(index) {
  currentTrackIdx = index;
  const track = PLAYLIST[index];
  audioElement.src = track.audioSrc;

  // Update Widget UI
  const coverEl = document.getElementById('widget-cover');
  const titleEl = document.getElementById('widget-track-title');
  const artistEl = document.getElementById('widget-track-artist');

  if (coverEl) coverEl.src = track.cover;
  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
}

function loadAndPlayTrack(index) {
  loadTrack(index);
  playAudio();
}

function playAudio() {
  audioElement.play().then(() => {
    isAudioPlaying = true;
    userInteractedWithAudio = true;
    document.body.classList.add('playing');
    
    // Update icons
    const widgetPlayIcon = document.getElementById('widget-play-icon');
    if (widgetPlayIcon) widgetPlayIcon.setAttribute('data-lucide', 'pause');
    const promptText = document.getElementById('music-prompt-text');
    if (promptText) promptText.textContent = `Playing: ${PLAYLIST[currentTrackIdx].title}`;

    lucide.createIcons();
  }).catch(err => {
    console.warn("Audio play blocked by browser:", err);
  });
}

function pauseAudio() {
  audioElement.pause();
  isAudioPlaying = false;
  document.body.classList.remove('playing');
  
  const widgetPlayIcon = document.getElementById('widget-play-icon');
  if (widgetPlayIcon) widgetPlayIcon.setAttribute('data-lucide', 'play');
  const promptText = document.getElementById('music-prompt-text');
  if (promptText) promptText.textContent = "Cozy Music Paused";

  lucide.createIcons();
}

function togglePlay() {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function tryAutoplayMusic() {
  if (!userInteractedWithAudio) {
    playAudio();
  }
}
