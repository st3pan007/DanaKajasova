window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animace hamburger ikony
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Zavřít menu po kliknutí na link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        const isOpen = question.getAttribute('aria-expanded') === 'true';
        
        // Zavřít všechny ostatní
        faqItems.forEach(otherItem => {
            const otherQuestion = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            
            if (otherItem !== item) {
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherAnswer.classList.remove('active');
            }
        });
        
        // Toggle aktuální
        if (isOpen) {
            question.setAttribute('aria-expanded', 'false');
            answer.classList.remove('active');
        } else {
            question.setAttribute('aria-expanded', 'true');
            answer.classList.add('active');
        }
    });
});

const newsletterForm = document.getElementById('newsletterForm');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    alert('Díky za přihlášení! Brzy se ti ozvu s prvním newsletterem.');
    e.target.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(245, 241, 230, 0.98)';
        nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        nav.style.background = 'rgba(245, 241, 230, 0.95)';
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

window.addEventListener('load', () => {
    const elementsToAnimate = document.querySelectorAll('.section-title, .pricing-card, .pillar-card, .testimonial-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });
});

if ('loading' in HTMLImageElement.prototype === false) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

const skipLink = document.createElement('a');
skipLink.href = '#uvod';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 0;
    background: #7A1C27;
    color: white;
    padding: 1rem 2rem;
    z-index: 10000;
    transition: top 0.3s;
`;
document.body.insertBefore(skipLink, document.body.firstChild);

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
});