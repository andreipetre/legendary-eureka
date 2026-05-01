// Navigation module - handles mobile menu, smooth scrolling, and active nav links
import { companyData } from './data.js';

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Hide/show navbar on scroll (optional advanced behavior)
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6h12v12" />
          </svg>
        `;
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `;
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `;
      }
    });
  }

  // Smooth scroll for all nav links
  const allNavLinks = [...navLinks, ...mobileNavLinks];
  
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const offset = 80; // Account for fixed navbar
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu after navigation
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('block');
            if (mobileMenuBtn) {
              mobileMenuBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              `;
            }
          }

          // Update active state
          updateActiveNavLink(href);
        }
      }
    });
  });

  // Active nav link on scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    rootMargin: '-100px 0px -50% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveNavLink(`#${id}`);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Set initial active link
  updateActiveNavLink('#home');
}

function updateActiveNavLink(activeHref) {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  [...navLinks, ...mobileNavLinks].forEach(link => {
    const href = link.getAttribute('href');
    if (href === activeHref) {
      link.classList.add('text-indigo-400', 'font-semibold');
      link.classList.remove('text-slate-300');
    } else {
      link.classList.remove('text-indigo-400', 'font-semibold');
      link.classList.add('text-slate-300');
    }
  });
}

// Make company name available globally if needed
window.GiggleByte = { name: companyData.name, official: "Giggle Byte B.V." };
