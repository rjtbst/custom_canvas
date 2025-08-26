import { useState, useEffect } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypingEffect = ({ text, speed = 50, delay = 0 }: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay]);

  return { displayedText, isComplete };
};