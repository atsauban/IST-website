tailwind.config = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loadComponent = async (id, url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Could not fetch ${url}`);
      const text = await response.text();
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      }
    } catch (error) {
      console.error(`Failed to load component: ${id}`, error);
    }
  };

  const initNavbar = () => {
    // Handle mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
      });
    }

    // Handle active link highlighting
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      // Normalize paths to handle index.html and root path
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPage || (currentPage === '/' && linkPath === '/index.html')) {
        link.classList.add('text-indigo-400', 'font-semibold', 'underline', 'underline-offset-4');
      }
    });
  };

  const loadAllComponents = async () => {
    // Use Promise.all to load components in parallel
    await Promise.all([
      loadComponent('navbar-placeholder', '/components/navbar.html'),
      loadComponent('footer-placeholder', '/components/footer.html')
    ]);

    // Initialize navbar functionality after it's loaded
    initNavbar();
  };

  loadAllComponents();
});