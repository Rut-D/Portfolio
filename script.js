document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. MOBILE NAVIGATION HAMBURGER MENU
  // ==========================================================================
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerMenu.classList.toggle('open', isOpen);
    hamburgerMenu.setAttribute('aria-expanded', isOpen);
  };

  hamburgerMenu.addEventListener('click', toggleMenu);

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburgerMenu.classList.remove('open');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside of the navbar
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburgerMenu.classList.remove('open');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
  });


  // ==========================================================================
  // 2. NAVBAR SCROLL STYLING & ACTIVE PAGE LINKS SPY
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Scrollspy: active nav link based on scroll position
  const activeNavOnScroll = () => {
    const scrollPosition = window.scrollY + 100; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    activeNavOnScroll();
  });

  // Run once on load to establish initial state
  handleNavbarScroll();
  activeNavOnScroll();


  // ==========================================================================
  // 3. DARK / LIGHT THEME TOGGLER (LOCALSTORAGE PERSISTED)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Retrieve previous setting or check system preference (default to dark)
  const getSavedTheme = () => {
    const localTheme = localStorage.getItem('rd-theme');
    if (localTheme) return localTheme;

    // Optional: read system media preferences (default to dark if not set)
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return systemPrefersLight ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('rd-theme', theme);
    
    // Update button icon accordingly
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  };

  // Initial set
  setTheme(getSavedTheme());

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });


  // ==========================================================================
  // 4. TYPING TEXT EFFECT (HERO TERMINAL)
  // ==========================================================================
  const typingText = document.getElementById('typingText');
  const phrases = [
    'Computer Engineering Student',
    'AI / ML Intern @ AIR G',
    'Web Developer',
    'Deep Learning Explorer',
    'Tech Optimist',
    'Frontend Enthusiast',
    'Programmer & Coder',
    'Problem Solver',
    'UI/UX Designer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  const performTypingLoop = () => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Remove characters
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 25; // Deleting is faster
    } else {
      // Add characters
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90; // Typing speed
    }

    // Word is fully typed out
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1800; // Hold full word in view
    } 
    // Word is fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause briefly before typing next
    }

    setTimeout(performTypingLoop, typeSpeed);
  };

  if (typingText) {
    performTypingLoop();
  }


  // ==========================================================================
  // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
  // ==========================================================================
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Retrieve animation delay if configured
        const delay = entry.target.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        // Stop observing since it has revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px' // reveal slightly before reaching viewport center
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ==========================================================================
  // 6. BACK TO TOP SMOOTH SCROLL BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
      backToTopBtn.style.transform = 'translateY(15px)';
    }
  });

  // Make sure to style display properties inside style.css
  backToTopBtn.style.transition = 'all 0.35s ease';
  backToTopBtn.style.opacity = '0';
  backToTopBtn.style.pointerEvents = 'none';

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // ==========================================================================
  // 7. CONTACT FORM SUBMISSION TO GOOGLE FORM REDIRECTION
  // ==========================================================================
  const contactForm = document.getElementById('customContactForm');
  const googleFormBaseUrl = 'https://forms.gle/SKmL1wdYauKBmAGz6';

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('formName').value.trim();
    const emailVal = document.getElementById('formEmail').value.trim();
    const messageVal = document.getElementById('formMessage').value.trim();

    if (!nameVal || !emailVal || !messageVal) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    // Inform the user, reset form, and open Google Form
    alert(`Thank you, ${nameVal}! Preparing to send your details. Clicking OK will open Rutuja's Google Form details in a new tab to complete your request.`);
    
    // Open Google Form
    window.open(googleFormBaseUrl, '_blank', 'noopener,noreferrer');
    
    // Clear the form
    contactForm.reset();
  });
});
