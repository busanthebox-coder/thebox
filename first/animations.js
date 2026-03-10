// ===== 숫자 카운팅 애니메이션 =====
function initCountUpAnimation() {
    const countElements = document.querySelectorAll('.count-up');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCount(entry.target);
            }
        });
    }, observerOptions);
    
    countElements.forEach(el => observer.observe(el));
}

function animateCount(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const increment = target / (duration / 16); // 60fps 기준
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===== 스크롤 트리거 애니메이션 시스템 =====
function initScrollAnimations() {
    // 모든 reveal 계열 요소 감시
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale';
    const revealElements = document.querySelectorAll(revealSelectors);
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger 컨테이너 감시
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.stagger-item, .stagger-left');
                items.forEach((item, index) => {
                    item.style.setProperty('--i', index);
                    // 약간의 지연 후 is-visible 추가하여 부드럽게
                    requestAnimationFrame(() => {
                        item.classList.add('is-visible');
                    });
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    staggerContainers.forEach(el => staggerObserver.observe(el));
}

// ===== 페이지 로드 시 초기화 =====
function initAll() {
    initCountUpAnimation();
    initScrollAnimations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
