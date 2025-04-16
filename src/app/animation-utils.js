'use client';

// Function to check if an element is in viewport
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Function to handle scroll animations
export function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animate');
    }
  });
}

// Initialize scroll animations
export function initScrollAnimations() {
  if (typeof window !== 'undefined') {
    // Initial check
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', handleScrollAnimations);
    };
  }
  
  return () => {};
}
