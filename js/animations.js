// Animations module - scroll-triggered fade-ins and other effects
export function initAnimations() {
  // Fade-in on scroll for sections and cards
  const animatedElements = document.querySelectorAll('.fade-in, .service-card, .project-card, .testimonial-card, .stat-card');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for grid items
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    // Initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    observer.observe(el);
  });

  // Counter animation for stats
  initStatCounters();
}

function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.dataset.target);
        const suffix = target.dataset.suffix || '';
        const duration = 1800;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(finalValue * eased);
          
          target.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            target.textContent = finalValue.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(animate);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.6 });

  statNumbers.forEach(stat => counterObserver.observe(stat));
}

// Optional: Parallax effect on hero (subtle)
export function initParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    hero.style.backgroundPosition = `center ${rate}px`;
  }, { passive: true });
}
