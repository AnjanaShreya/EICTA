/**
 * Electronics & ICT Academy | IIT Kanpur - EICTA Consortium
 * Production Client Script
 */

(function () {
  'use strict';

  // Application State
  const state = {
    heroSlideIndex: 0,
    heroAutoTimer: null,
    currentAudience: 'individuals',
    currentCategory: 'ai-ml',
    currentMode: 'Online'
  };

  /* ==========================================================================
     1. Hero Carousel Controller
     ========================================================================== */
  function setHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;

    state.heroSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === state.heroSlideIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.heroSlideIndex);
      dot.setAttribute('aria-selected', idx === state.heroSlideIndex ? 'true' : 'false');
    });
  }

  function startHeroTimer() {
    clearInterval(state.heroAutoTimer);
    state.heroAutoTimer = setInterval(() => {
      setHeroSlide(state.heroSlideIndex + 1);
    }, 5000);
  }

  function initHero() {
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const dots = document.querySelectorAll('.hero-dot');
    const heroSection = document.querySelector('.hero-section');

    prevBtn?.addEventListener('click', () => {
      setHeroSlide(state.heroSlideIndex - 1);
      startHeroTimer();
    });

    nextBtn?.addEventListener('click', () => {
      setHeroSlide(state.heroSlideIndex + 1);
      startHeroTimer();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        setHeroSlide(idx);
        startHeroTimer();
      });
    });

    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(state.heroAutoTimer));
      heroSection.addEventListener('mouseleave', startHeroTimer);

      // Mobile Touch Swipe Handling
      let touchStartX = 0;
      let touchEndX = 0;

      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            setHeroSlide(state.heroSlideIndex + 1);
          } else {
            setHeroSlide(state.heroSlideIndex - 1);
          }
          startHeroTimer();
        }
      }, { passive: true });
    }

    startHeroTimer();
  }

  /* ==========================================================================
     2. Featured Audience Filter (Individuals / Corporates / Universities)
     ========================================================================== */
  const AUDIENCE_COURSES = {
    individuals: [
      {
        title: 'Emerging CTO AI Leadership Program',
        image: './images/course-cto.jpg',
        date: '13/06/2026',
        duration: '32 Weeks',
        desc: 'Take your career to the next level with the Emerging CTO Program by EICTA Consortium. Specially designed for t...',
        lastDate: '27/11/2026',
        price: '₹4,69,050',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Gen AI in Cyber Security',
        image: './images/course-cyber.jpg',
        date: null,
        duration: null,
        desc: 'The "Gen AI in Cyber Security" program is a beginner-friendly, live online course designed to equip learners w...',
        lastDate: null,
        price: '₹17,699',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'AI Powered Digital Marketing – Advanced...',
        image: './images/course-marketing.jpg',
        date: '28/11/2026',
        duration: '3 Months',
        desc: 'An execution-first, live digital marketing program focused on performance marketing, AI-driven optimization, a...',
        lastDate: '27/11/2026',
        price: '₹41,300',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Agentic AI for Everyone',
        image: './images/course-agentic.jpg',
        date: '10/10/2026',
        duration: '20 Hours',
        desc: 'Build your own AI co-worker to automate your daily workflows',
        lastDate: '09/10/2026',
        price: '₹7,080',
        url: 'https://www.eicta.iitk.ac.in/explore'
      }
    ],
    corporates: [
      {
        title: 'Enterprise Cloud Architecture & DevSecOps',
        image: './images/course-cto.jpg',
        date: '15/07/2026',
        duration: '10 Weeks',
        desc: 'Corporate-ready multi-cloud orchestration, Zero-Trust compliance, and automated DevSecOps pipelines.',
        lastDate: '10/07/2026',
        price: '₹65,000',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'AI & Big Data for Enterprise Innovation',
        image: './images/course-cyber.jpg',
        date: '05/09/2026',
        duration: '6 Weeks',
        desc: 'Corporate cohort training on deploying LLMs, modern data lakes, and automated real-time analytics.',
        lastDate: '30/08/2026',
        price: '₹1,20,000',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Corporate AI Governance & Cybersecurity',
        image: './images/course-marketing.jpg',
        date: '18/10/2026',
        duration: '8 Weeks',
        desc: 'Risk modelling, AI ethics compliance, regulatory adherence, and infrastructure hardening for enterprise leaders.',
        lastDate: '12/10/2026',
        price: '₹85,000',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Executive AI Strategy for Product Leadership',
        image: './images/course-agentic.jpg',
        date: '01/11/2026',
        duration: '12 Weeks',
        desc: 'Transform product lifecycles and business operations using generative models, agentic workflows, and deep insights.',
        lastDate: '25/10/2026',
        price: '₹1,45,000',
        url: 'https://www.eicta.iitk.ac.in/explore'
      }
    ],
    universities: [
      {
        title: 'University Faculty Enablement in Generative AI',
        image: './images/course-marketing.jpg',
        date: '20/08/2026',
        duration: '2 Weeks',
        desc: 'NEP 2020-compliant Faculty Enablement Program for university educators with practical lab blueprints.',
        lastDate: '15/08/2026',
        price: '₹3,500',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Institutional Campus Connect: VLSI & Embedded',
        image: './images/course-agentic.jpg',
        date: '12/09/2026',
        duration: '4 Weeks',
        desc: 'Semester-aligned semiconductor laboratory immersion program for engineering institutions.',
        lastDate: '05/09/2026',
        price: '₹4,800',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'NEP 2020 Aligned Curriculum in Data Analytics',
        image: './images/course-cto.jpg',
        date: '01/10/2026',
        duration: '3 Weeks',
        desc: 'Equip faculty and academic heads with curriculum frameworks, pedagogy, and industry-grade dataset labs.',
        lastDate: '25/09/2026',
        price: '₹3,800',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Quantum Computing for Academic Researchers',
        image: './images/course-cyber.jpg',
        date: '15/11/2026',
        duration: '4 Weeks',
        desc: 'Foundation in quantum algorithms, Qiskit simulations, and academic research collaborations for university faculty.',
        lastDate: '10/11/2026',
        price: '₹5,200',
        url: 'https://www.eicta.iitk.ac.in/explore'
      }
    ]
  };

  function createCourseCardMarkup(c) {
    const metaMarkup = (c.date || c.duration) ? `
      <div class="course-card-meta">
        ${c.date ? `
        <span class="meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>${c.date}</span>
        </span>` : ''}
        ${c.duration ? `
        <span class="meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>${c.duration}</span>
        </span>` : ''}
      </div>` : '';

    const lastDateMarkup = c.lastDate ? `
      <div class="apply-by-chip">
        <span>Last Date to Apply :</span>
        <span class="apply-date-box">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>${c.lastDate}</span>
        </span>
      </div>` : '';

    return `
      <div class="course-card">
        <div class="course-card-thumb">
          <img src="${c.image}" alt="${c.title}" class="course-thumb-img" loading="lazy">
        </div>
        <div class="course-card-content">
          <h3 class="course-card-title">${c.title}</h3>
          ${metaMarkup}
          <p class="course-card-desc">
            ${c.desc} <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="learn-more-link">Learn More</a>
          </p>
          ${lastDateMarkup}
          <div class="course-card-footer">
            <span class="course-price">${c.price}</span>
            <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderAudienceCourses(audience) {
    const grid = document.getElementById('featured-courses-grid');
    if (!grid) return;

    const list = AUDIENCE_COURSES[audience] || AUDIENCE_COURSES.individuals;
    grid.innerHTML = list.map(createCourseCardMarkup).join('');
  }

  function initAudienceFilter() {
    const pills = document.querySelectorAll('.filter-pill[data-audience]');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        state.currentAudience = pill.getAttribute('data-audience');
        renderAudienceCourses(state.currentAudience);
      });
    });
  }

  /* ==========================================================================
     3. Testimonials Carousel with Infinite Smooth Loop
     ========================================================================== */
  function initTestimonials() {
    const nextBtn = document.getElementById('test-next-btn');
    const prevBtn = document.getElementById('test-prev-btn');
    const track = document.getElementById('testimonials-track');
    const dotsWrap = document.querySelector('.testimonials-dots');
    if (!track) return;

    const originalCards = Array.from(track.children);
    const totalOriginal = originalCards.length;
    if (totalOriginal === 0) return;

    // Clone cards once for seamless looping
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    // Match dots to original cards
    if (dotsWrap) {
      dotsWrap.innerHTML = originalCards
        .map((_, i) => `<button type="button" class="testimonials-dot${i === 0 ? ' active' : ''}" aria-label="Review ${i + 1}"></button>`)
        .join('');
    }
    const dots = document.querySelectorAll('.testimonials-dot');

    let currentIndex = 0;
    let isMoving = false;

    function getStepWidth() {
      const first = track.querySelector('.testimonial-card');
      if (!first) return 280;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 20;
      return first.offsetWidth + gap;
    }

    function updateDots(activeIdx) {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === (activeIdx % totalOriginal));
      });
    }

    function scrollToIndex(idx, animated = true) {
      const stepWidth = getStepWidth();
      track.style.transition = animated ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
      track.style.transform = `translateX(-${idx * stepWidth}px)`;
      currentIndex = idx;
      updateDots(currentIndex % totalOriginal);
    }

    function goNext() {
      if (isMoving) return;
      isMoving = true;
      currentIndex++;
      scrollToIndex(currentIndex, true);

      if (currentIndex >= totalOriginal) {
        setTimeout(() => {
          currentIndex = 0;
          scrollToIndex(0, false);
          isMoving = false;
        }, 460);
      } else {
        setTimeout(() => {
          isMoving = false;
        }, 460);
      }
    }

    function goPrev() {
      if (isMoving) return;
      isMoving = true;

      if (currentIndex <= 0) {
        currentIndex = totalOriginal;
        scrollToIndex(currentIndex, false);
        void track.offsetHeight; // Force reflow to immediately apply jump
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          currentIndex--;
          scrollToIndex(currentIndex, true);
          setTimeout(() => {
            isMoving = false;
          }, 460);
        });
      });
    }

    nextBtn?.addEventListener('click', goNext);
    prevBtn?.addEventListener('click', goPrev);

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        if (isMoving) return;
        scrollToIndex(idx, true);
      });
    });

    // Auto-advance loop every 4.5 seconds with pause on hover
    let autoInterval = setInterval(goNext, 4500);
    const wrap = track.parentElement;
    if (wrap) {
      wrap.addEventListener('mouseenter', () => clearInterval(autoInterval));
      wrap.addEventListener('mouseleave', () => {
        clearInterval(autoInterval);
        autoInterval = setInterval(goNext, 4500);
      });
    }

    // Responsive alignment handling
    window.addEventListener('resize', () => {
      scrollToIndex(currentIndex, false);
    });

    // Touch swipe gesture support for mobile
    let testTouchStartX = 0;
    let testTouchEndX = 0;
    if (wrap) {
      wrap.addEventListener('touchstart', (e) => {
        testTouchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      wrap.addEventListener('touchend', (e) => {
        testTouchEndX = e.changedTouches[0].screenX;
        const diff = testTouchEndX - testTouchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            goNext();
          } else {
            goPrev();
          }
        }
      }, { passive: true });
    }
  }

  /* ==========================================================================
     4. EICTA Consortium Courses Sidebar & Dynamic Catalog
     ========================================================================== */
  // Baseline AI/ML courses with user-mandated URLs
  const DEFAULT_AIML_CARDS = `
    <!-- Card 1: Generative AI -->
    <div class="course-card">
      <div class="course-card-thumb">
        <img src="./images/consortium-genai-chip.jpg" alt="Professional Certificate Course in Generative AI" class="course-thumb-img" loading="lazy">
      </div>
      <div class="course-card-content">
        <h3 class="course-card-title">Professional Certificate Course in Generative AI...</h3>
        <div class="course-card-meta">
          <span class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>22/07/2026</span>
          </span>
          <span class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>11 Months</span>
          </span>
        </div>
        <p class="course-card-desc">
          To further the objectives of E&ICT Academy under the Ministry of Electronics & Information Technology (MeitY),... <a class="learn-more-link" href="https://www.eicta.iitk.ac.in/courses/professional-certificate-course-in-ai-ml" target="_blank" rel="noopener noreferrer">Learn More</a>
        </p>
        <div class="apply-by-chip">
          <span class="apply-label">Last Date to Apply :</span>
          <span class="apply-date-box">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>21/07/2026</span>
          </span>
        </div>
        <div class="course-card-footer">
          <span class="course-price">₹1,53,400</span>
          <a href="https://www.eicta.iitk.ac.in/payment/professional-certificate-course-in-ai-ml?mode=ONLINE" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
        </div>
      </div>
    </div>

    <!-- Card 2: Leadership -->
    <div class="course-card">
      <div class="course-card-thumb">
        <img src="./images/consortium-leader-city.jpg" alt="Professional Certificate Program in Leadership" class="course-thumb-img" loading="lazy">
      </div>
      <div class="course-card-content">
        <h3 class="course-card-title">Professional Certificate Program in Leadership...</h3>
        <div class="course-card-meta">
          <span class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>29/11/2026</span>
          </span>
          <span class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>8 Months</span>
          </span>
        </div>
        <p class="course-card-desc">
          Lead Business Innovation with AI Strategy, Generative AI, and Change Management <a class="learn-more-link" href="https://www.eicta.iitk.ac.in/courses/professional-certificate-program-in-leadership-with-ai" target="_blank" rel="noopener noreferrer">Learn More</a>
        </p>
        <div class="apply-by-chip">
          <span class="apply-label">Last Date to Apply :</span>
          <span class="apply-date-box">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>27/11/2026</span>
          </span>
        </div>
        <div class="course-card-footer">
          <span class="course-price">₹2,23,020</span>
          <a href="https://www.eicta.iitk.ac.in/payment/professional-certificate-program-in-leadership-with-ai?mode=ONLINE" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
        </div>
      </div>
    </div>

    <!-- Card 3: AI for Leaders -->
    <div class="course-card">
      <div class="course-card-thumb">
        <img src="./images/consortium-ai-leaders.jpg" alt="Advanced Certificate Program in AI for Leaders" class="course-thumb-img" loading="lazy">
      </div>
      <div class="course-card-content">
        <h3 class="course-card-title">Advanced Certificate Program in AI for Leaders</h3>
        <div class="course-card-meta">
          <span class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>29/11/2026</span>
          </span>
          <span class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>5 Months</span>
          </span>
        </div>
        <p class="course-card-desc">
          Strategic AI Thinking, Generative AI Tools, and Business Impact without Coding <a class="learn-more-link" href="https://www.eicta.iitk.ac.in/courses/advanced-certificate-program-in-ai-for-leaders" target="_blank" rel="noopener noreferrer">Learn More</a>
        </p>
        <div class="apply-by-chip">
          <span class="apply-label">Last Date to Apply :</span>
          <span class="apply-date-box">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>27/11/2026</span>
          </span>
        </div>
        <div class="course-card-footer">
          <span class="course-price">₹1,87,620</span>
          <a href="https://www.eicta.iitk.ac.in/courses/advanced-certificate-program-in-ai-for-leaders" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
        </div>
      </div>
    </div>
  `;

  // Domain directory mapping for other categories
  const CATEGORY_COURSES = {
    'fintech': [
      {
        title: 'Executive Program in FinTech & Digital Banking',
        image: './images/consortium-genai-chip.jpg',
        date: '10/08/2026',
        duration: '6 Months',
        desc: 'Master blockchain payments, algorithmic trading, neo-banking APIs, and AI in credit risk.',
        price: '₹1,25,000',
        lastDate: '05/08/2026',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'AI in Quantitative Finance & Algorithmic Trading',
        image: './images/consortium-leader-city.jpg',
        date: '15/09/2026',
        duration: '5 Months',
        desc: 'Hands-on quantitative modelling, stochastic calculus, risk hedging, and automated trading bots.',
        price: '₹1,45,000',
        lastDate: '10/09/2026',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Financial Risk Management & Regulatory Tech',
        image: './images/consortium-ai-leaders.jpg',
        date: '20/10/2026',
        duration: '4 Months',
        desc: 'Advanced fraud detection architectures, anti-money laundering pipelines, and Basel III/IV compliance.',
        price: '₹95,000',
        lastDate: '15/10/2026',
        url: 'https://www.eicta.iitk.ac.in/explore'
      }
    ],
    'cybersecurity': [
      {
        title: 'Advanced Certified DevSecOps & Cloud Security',
        image: './images/consortium-genai-chip.jpg',
        date: '12/08/2026',
        duration: '6 Months',
        desc: 'Enterprise Zero-Trust architectures, threat modelling, CI/CD pipeline auditing, and container runtime security.',
        price: '₹1,35,000',
        lastDate: '08/08/2026',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'Offensive Security & Red Teaming Operations',
        image: './images/consortium-leader-city.jpg',
        date: '01/09/2026',
        duration: '7 Months',
        desc: 'Advanced penetration testing, adversary emulation, kernel exploits, and network breach analysis.',
        price: '₹1,60,000',
        lastDate: '25/08/2026',
        url: 'https://www.eicta.iitk.ac.in/explore'
      },
      {
        title: 'AI-Powered Security Operations & Incident Response',
        image: './images/consortium-ai-leaders.jpg',
        date: '15/10/2026',
        duration: '4 Months',
        desc: 'Automating SOC incident correlation, threat hunting with LLMs, and digital forensics triage.',
        price: '₹1,15,000',
        lastDate: '10/10/2026',
        url: 'https://www.eicta.iitk.ac.in/explore'
      }
    ]
  };

  function updateConsortiumGrid(cat) {
    const grid = document.getElementById('consortium-cards-grid');
    if (!grid) return;

    if (cat === 'ai-ml') {
      grid.innerHTML = DEFAULT_AIML_CARDS;
      return;
    }

    const customList = CATEGORY_COURSES[cat];
    if (customList && customList.length) {
      grid.innerHTML = customList.map(c => `
        <div class="course-card">
          <div class="course-card-thumb">
            <img src="${c.image}" alt="${c.title}" class="course-thumb-img" loading="lazy">
          </div>
          <div class="course-card-content">
            <h3 class="course-card-title">${c.title}</h3>
            <div class="course-card-meta">
              <span class="meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>${c.date}</span>
              </span>
              <span class="meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>${c.duration}</span>
              </span>
            </div>
            <p class="course-card-desc">
              ${c.desc} <a class="learn-more-link" href="${c.url}" target="_blank" rel="noopener noreferrer">Learn More</a>
            </p>
            <div class="apply-by-chip">
              <span class="apply-label">Last Date to Apply :</span>
              <span class="apply-date-box">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>${c.lastDate}</span>
              </span>
            </div>
            <div class="course-card-footer">
              <span class="course-price">${c.price}</span>
              <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      // Dynamic fallback for any newly added category
      const label = cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      grid.innerHTML = `
        <div class="course-card">
          <div class="course-card-thumb">
            <img src="./images/consortium-genai-chip.jpg" alt="${label} Foundation" class="course-thumb-img" loading="lazy">
          </div>
          <div class="course-card-content">
            <h3 class="course-card-title">Professional Certificate in ${label}</h3>
            <div class="course-card-meta">
              <span class="meta-item"><span>15/09/2026</span></span>
              <span class="meta-item"><span>6 Months</span></span>
            </div>
            <p class="course-card-desc">
              Comprehensive industry-certified program by EICTA Consortium in ${label}. <a class="learn-more-link" href="https://www.eicta.iitk.ac.in/explore" target="_blank" rel="noopener noreferrer">Learn More</a>
            </p>
            <div class="course-card-footer">
              <span class="course-price">₹1,12,000</span>
              <a href="https://www.eicta.iitk.ac.in/explore" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
            </div>
          </div>
        </div>
        <div class="course-card">
          <div class="course-card-thumb">
            <img src="./images/consortium-leader-city.jpg" alt="Advanced ${label}" class="course-thumb-img" loading="lazy">
          </div>
          <div class="course-card-content">
            <h3 class="course-card-title">Advanced Certification in ${label} Systems</h3>
            <div class="course-card-meta">
              <span class="meta-item"><span>20/10/2026</span></span>
              <span class="meta-item"><span>8 Months</span></span>
            </div>
            <p class="course-card-desc">
              Accelerate your engineering leadership with hands-on lab immersions and live mentoring. <a class="learn-more-link" href="https://www.eicta.iitk.ac.in/explore" target="_blank" rel="noopener noreferrer">Learn More</a>
            </p>
            <div class="course-card-footer">
              <span class="course-price">₹1,58,000</span>
              <a href="https://www.eicta.iitk.ac.in/explore" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
            </div>
          </div>
        </div>
        <div class="course-card">
          <div class="course-card-thumb">
            <img src="./images/consortium-ai-leaders.jpg" alt="${label} Leadership" class="course-thumb-img" loading="lazy">
          </div>
          <div class="course-card-content">
            <h3 class="course-card-title">${label} Executive Leadership Accelerator</h3>
            <div class="course-card-meta">
              <span class="meta-item"><span>01/11/2026</span></span>
              <span class="meta-item"><span>4 Months</span></span>
            </div>
            <p class="course-card-desc">
              Strategic execution, deployment architectures, and regulatory frameworks tailored for specialists. <a class="learn-more-link" href="https://www.eicta.iitk.ac.in/explore" target="_blank" rel="noopener noreferrer">Learn More</a>
            </p>
            <div class="course-card-footer">
              <span class="course-price">₹1,35,000</span>
              <a href="https://www.eicta.iitk.ac.in/explore" target="_blank" rel="noopener noreferrer" class="btn-enroll-now">Enroll Now</a>
            </div>
          </div>
        </div>
      `;
    }
  }

  function initCategories() {
    const catBtns = document.querySelectorAll('.category-btn');
    const modeBtns = document.querySelectorAll('.mode-filter-pill');

    catBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        catBtns.forEach((b) => {
          b.classList.remove('active');
          const arrow = b.querySelector('.cat-arrow');
          if (arrow) arrow.remove();
        });

        btn.classList.add('active');
        if (!btn.querySelector('.cat-arrow')) {
          const arrowSpan = document.createElement('span');
          arrowSpan.className = 'cat-arrow';
          arrowSpan.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6" /></svg>';
          btn.appendChild(arrowSpan);
        }

        state.currentCategory = btn.getAttribute('data-cat') || 'ai-ml';
        updateConsortiumGrid(state.currentCategory);
      });
    });

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentMode = btn.getAttribute('data-mode') || 'Online';
      });
    });
  }

  /* ==========================================================================
     5. Auth Modal & Forms
     ========================================================================== */
  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('open'));
  }

  function initModals() {
    const authModal = document.getElementById('modal-auth');
    const authCloseBtn = document.getElementById('modal-auth-close');
    const loginBtn = document.getElementById('btn-login-open');
    const joinBtn = document.getElementById('btn-join-open');
    const authForm = document.getElementById('auth-form');
    const subscribeForm = document.getElementById('subscribe-form');

    loginBtn?.addEventListener('click', () => authModal?.classList.add('open'));
    joinBtn?.addEventListener('click', () => authModal?.classList.add('open'));
    authCloseBtn?.addEventListener('click', closeAllModals);

    // Overlay click and Escape key dismissal
    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAllModals();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    // Auth Form
    authForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Sign in successful! Redirecting to EICTA Student & Faculty Dashboard...');
      closeAllModals();
    });

    // Subscription Form
    subscribeForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('subscriber-email');
      alert(`Thank you for subscribing! Emerging tech course updates will be sent to ${email ? email.value : 'your email'}.`);
      if (email) email.value = '';
    });
  }

  /* ==========================================================================
     6. Mobile Navigation Drawer Controller
     ========================================================================== */
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const drawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-item:not(#btn-login-mobile):not(#btn-join-mobile)');
    const mobileLoginBtn = document.getElementById('btn-login-mobile');
    const mobileJoinBtn = document.getElementById('btn-join-mobile');
    const authModal = document.getElementById('modal-auth');

    function openMobileMenu() {
      drawer?.classList.add('open');
      backdrop?.classList.add('open');
      toggleBtn?.classList.add('active');
      toggleBtn?.setAttribute('aria-expanded', 'true');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      drawer?.classList.remove('open');
      backdrop?.classList.remove('open');
      toggleBtn?.classList.remove('active');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      drawer?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggleBtn?.addEventListener('click', () => {
      if (drawer?.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    closeBtn?.addEventListener('click', closeMobileMenu);
    backdrop?.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    mobileLoginBtn?.addEventListener('click', () => {
      closeMobileMenu();
      authModal?.classList.add('open');
      authModal?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    mobileJoinBtn?.addEventListener('click', () => {
      closeMobileMenu();
      authModal?.classList.add('open');
      authModal?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  /* ==========================================================================
     Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initAudienceFilter();
    initTestimonials();
    initCategories();
    initModals();
    initMobileNav();
  });
})();
