import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SectionThree = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const logos = [
    { id: 1, name: 'BCG', src: '/images/24.png' },
    { id: 2, name: 'Shell', src: '/images/25.png' },
    { id: 3, name: 'Ashok Leyland', src: '/images/26.png' },
    { id: 4, name: 'Quora', src: '/images/27.png' },
    { id: 5, name: 'Hyundai', src: '/images/28.png' },
    { id: 6, name: 'Julius Bär', src: '/images/29.png' },
    { id: 7, name: 'FICCI', src: '/images/30.png' },
    { id: 8, name: 'Asian Paints', src: '/images/31.png' },
    { id: 9, name: 'Hyundai', src: '/images/28.png' },
    { id: 10, name: 'Julius Bär', src: '/images/29.png' },
    { id: 11, name: 'FICCI', src: '/images/30.png' },
    { id: 12, name: 'Asian Paints', src: '/images/31.png' },
  ];

  const visibleLogos = 6; // Number of logos visible at once
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === logos.length - visibleLogos ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [logos.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? logos.length - visibleLogos : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === logos.length - visibleLogos ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2
        className="text-3xl font-bold text-center mb-16 text-[#14394b]"
        style={{ fontFamily: "Playfair Display" }}
      >
        OUR CLIENTS
      </h2>

      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 z-10 p-2 bg-[#46686e] rounded-full shadow-lg hover:bg-[#748d92] transform -translate-x-1/2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Logo Container */}
        <div className="overflow-hidden mx-12 w-full">
          <motion.div
            className="flex items-center gap-8"
            animate={{
              x: `-${currentIndex * (100 / visibleLogos)}%`,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                className="flex-shrink-0 w-[calc(100%/6-2rem)] flex items-center justify-center"
                whileHover={{ scale: 1.1 }} // Scale up slightly on hover
                transition={{ type: "spring", stiffness: 300 }} // Spring transition for hover effect
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 bg-[#46686e] rounded-full shadow-lg hover:bg-[#748d92] transform translate-x-1/2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SectionThree;
