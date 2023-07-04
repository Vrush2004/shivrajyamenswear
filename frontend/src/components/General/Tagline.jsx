import React, { useEffect, useState } from 'react'

// आवड तुमची निवड आमची 
const textArray = ['आवड तुमची ❤', 'निवड आमची 💌'];
const typingSpeed = 300; // Adjust the speed as desired (in milliseconds)
const pauseDuration = 3000; // Adjust the pause duration between texts (in milliseconds)

const Tagline = () => {

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let isMounted = true;

    const animateText = (text) => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (isMounted) {
          setCurrentText(text.slice(0, currentIndex + 1));
          currentIndex++;

          if (currentIndex === text.length) {
            clearInterval(typingInterval);
            setTimeout(() => {
              if (isMounted) {
                setCurrentText('');
                setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
              }
            }, pauseDuration);
          }
        }
      }, typingSpeed);
    };

    animateText(textArray[currentTextIndex]);

    return () => {
      isMounted = false;
    };
  }, [textArray, typingSpeed, pauseDuration, currentTextIndex]);

  return (
    <div className="typing-text py-1 flex justify-center text-sm font-bold">
      {currentText}
    </div>
  );
};

export default Tagline;
