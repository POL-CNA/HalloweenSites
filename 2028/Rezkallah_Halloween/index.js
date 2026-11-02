const flashlight = document.getElementById('flashlight');
const scaryZone = document.getElementById('scary-zone');

// Update coordinates on mouse move
window.addEventListener('mousemove', (e) => {
  flashlight.style.setProperty('--x', `${e.clientX}px`);
  flashlight.style.setProperty('--y', `${e.clientY}px`);
});

// Support for touch screens (mobile/tablet)
window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  flashlight.style.setProperty('--x', `${touch.clientX}px`);
  flashlight.style.setProperty('--y', `${touch.clientY}px`);
});

// Activate flashlight only when scrolled into the scary zone
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      flashlight.classList.add('active');
    } else {
      flashlight.classList.remove('active');
    }
  });
}, { threshold: 0.05 });

// Watch the story container
if (scaryZone) {
  observer.observe(scaryZone);
}