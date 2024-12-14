//import React from 'react';
import { useEffect, useRef } from 'react';

const FloatingDate = ({ date, isWeekend }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const floatHeight = Math.random() * 3 + 2;
    const duration = Math.random() * 1 + 1.5;
    const delay = Math.random() * -2;
    
    // Create unique animation name
    const animationName = `float-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create and inject styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animationName} {
        0% {
          transform: translateY(0) translateZ(0) rotateX(20deg) rotateY(10deg);
        }
        50% {
          transform: translateY(-${floatHeight}px) translateZ(10px) rotateX(25deg) rotateY(15deg);
        }
        100% {
          transform: translateY(0) translateZ(0) rotateX(20deg) rotateY(10deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    element.style.animation = `${animationName} ${duration}s ease-in-out infinite`;
    element.style.animationDelay = `${delay}s`;
    
    return () => {
      style.remove();
    };
  }, []);

  return (
    <div className="relative perspective-500">
      <div
        ref={ref}
        className={`
          inline-block
          font-bold
          text-lg
          transform-gpu
          ${isWeekend ? 'text-red-500' : 'text-gray-700'}
          shadow-lg
          transition-colors
          duration-200
        `}
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {date}
      </div>
    </div>
  );
};

export default FloatingDate;