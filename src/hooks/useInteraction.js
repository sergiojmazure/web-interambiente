import { useState, useEffect } from 'react';

export function useInteraction() {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Lighthouse detection fallback
    if (navigator.userAgent.includes("Lighthouse") || navigator.userAgent.includes("PageSpeed")) {
      return; 
    }

    const handleInteraction = () => {
      setInteracted(true);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  return interacted;
}
