// Contact form module - validation and simulated submission
export function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMessage = document.getElementById('success-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      showError('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(data.email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending...
    `;

    // Simulate API call (2 seconds)
    setTimeout(() => {
      // Success!
      form.style.display = 'none';
      successMessage.style.display = 'block';
      
      // Confetti effect (fun touch)
      launchConfetti();

      // Reset form after 5 seconds for demo
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 5500);
    }, 2000);
  });

  // Real-time validation feedback
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        input.classList.add('border-emerald-500');
        input.classList.remove('border-slate-600');
      }
    });

    input.addEventListener('input', () => {
      input.classList.remove('border-red-500');
    });
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'mt-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-xl text-sm flex items-center gap-2';
  errorDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9z" />
    </svg>
    <span>${message}</span>
  `;
  
  const form = document.getElementById('contact-form');
  form.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.style.transition = 'opacity 0.3s ease';
    errorDiv.style.opacity = '0';
    setTimeout(() => errorDiv.remove(), 300);
  }, 3500);
}

function launchConfetti() {
  const colors = ['#818cf8', '#a5b4fc', '#c7d2fe', '#6366f1'];
  const confettiCount = 80;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetto = document.createElement('div');
      confetto.style.position = 'fixed';
      confetto.style.left = Math.random() * 100 + 'vw';
      confetto.style.top = '-10px';
      confetto.style.width = '8px';
      confetto.style.height = '8px';
      confetto.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetto.style.opacity = Math.random() + 0.6;
      confetto.style.zIndex = '9999';
      confetto.style.pointerEvents = 'none';
      confetto.style.transition = `transform ${Math.random() * 2 + 2.5}s linear, opacity 0.5s ease`;
      
      document.body.appendChild(confetto);

      const angle = Math.random() * 60 + 60; // 60-120 degrees
      const velocity = Math.random() * 3 + 2;
      
      confetto.animate([
        { 
          transform: `translateY(0) rotate(0deg)`,
          opacity: confetto.style.opacity 
        },
        { 
          transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720 + 360}deg)`,
          opacity: 0 
        }
      ], {
        duration: Math.random() * 2500 + 2200,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      }).onfinish = () => confetto.remove();
    }, i * 4);
  }
}
