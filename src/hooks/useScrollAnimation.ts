import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Add animation classes based on element's data attributes
            if (element.classList.contains('fade-in-up')) {
              element.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
            if (element.classList.contains('fade-in-left')) {
              element.style.animation = 'fadeInLeft 0.8s ease-out forwards';
            }
            if (element.classList.contains('fade-in-right')) {
              element.style.animation = 'fadeInRight 0.8s ease-out forwards';
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.setProperty('--parallax-offset', `${yPos}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};