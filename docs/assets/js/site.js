const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('[data-reveal]');
const REVEAL_INTERSECTION_ROOT_MARGIN = '0px 0px -40px 0px';

document.documentElement.classList.add('js');

function showAllSections() {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Keep the enhancement tiny and optional so the page still works as plain static HTML.
if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
  showAllSections();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: REVEAL_INTERSECTION_ROOT_MARGIN
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
