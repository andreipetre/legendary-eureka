// Main entry point - initializes all modules
import { companyData } from './data.js';
import { initNavigation } from './navigation.js';
import { initAnimations, initParallax } from './animations.js';
import { initContactForm } from './contact.js';

// Tailwind script config (runs after CDN loads)
function initTailwind() {
  if (typeof tailwind !== 'undefined') {
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'sans': ['Inter', 'system-ui', 'sans-serif'],
          }
        }
      }
    };
  }
}

// Dynamically render content from data.js (keeps HTML clean)
function renderDynamicContent() {
  // Render Services - light theme with warm accents
  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid && companyData.services) {
    servicesGrid.innerHTML = companyData.services.map(service => `
      <div class="service-card group bg-white border border-zinc-200 rounded-3xl p-8 hover:border-orange-200 flex flex-col shadow-sm">
        <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-100 text-orange-600 mb-6 group-hover:bg-orange-200 transition-colors">
          ${service.icon}
        </div>
        <h3 class="text-2xl font-semibold text-zinc-900 mb-4">${service.title}</h3>
        <p class="text-zinc-600 leading-relaxed flex-1">${service.description}</p>
        <div class="mt-8 pt-6 border-t border-zinc-200">
          <a href="#contact" class="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 group-hover:gap-2 transition-all">
            Learn more 
            <span class="ml-1 group-hover:translate-x-0.5 transition">→</span>
          </a>
        </div>
      </div>
    `).join('');
  }

  // Render Stats - light theme with colorful numbers
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer && companyData.stats) {
    statsContainer.innerHTML = companyData.stats.map((stat, index) => {
      const colors = ['text-orange-600', 'text-teal-600'];
      return `
        <div class="stat-card text-center bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
          <div class="text-6xl font-bold mb-3 ${colors[index % 2]}">
            <span class="stat-number" data-target="${stat.number}" data-suffix="${stat.suffix}">0${stat.suffix}</span>
          </div>
          <div class="text-zinc-600 text-lg font-medium">${stat.label}</div>
        </div>
      `;
    }).join('');
  }

  // Update company name everywhere
  const companyNameEls = document.querySelectorAll('.company-name');
  companyNameEls.forEach(el => el.textContent = companyData.name);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c[Giggle Byte] Initializing website...', 'color:#f97316');
  
  initTailwind();
  renderDynamicContent();
  
  // Initialize modules
  initNavigation();
  initAnimations();
  initParallax();
  initContactForm();
  
  // Easter egg: Konami code for fun
  initKonamiCode();
  
  console.log('%c[Giggle Byte] Website ready! 😄', 'color:#f97316');
});

function initKonamiCode() {
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let index = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konami[index]) {
      index++;
      if (index === konami.length) {
        index = 0;
        document.body.style.transition = 'filter 0.4s ease';
        document.body.style.filter = 'hue-rotate(45deg) saturate(1.3)';
        
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 1200);
      }
    } else {
      index = 0;
    }
  });
}
