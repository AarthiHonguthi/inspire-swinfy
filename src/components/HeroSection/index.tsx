// src/components/HeroSection.tsx
"use client";

import React, { useState, useEffect } from "react";

const HeroSection: React.FC = () => {
  const slides = [
    {
      image: "/images/slide1.png",
      quote:
        "Your dreams are what define your individuality. They have the power to give you wings and make you fly high.",
      header: "P.V. Sindhu",
    },
    {
      image: "/images/slide2.png",
      quote:
        "Connect with top experts, manage event logistics effortlessly, and let Guest Connect handle the details. Discover a smoother, more efficient way to plan and host events that inspire and impact.",
      header: "Where Experts Meet Your Event Vision",
    },
    {
      image: "/images/slide3.png",
      quote: "From Invitations to Invoicing, We’ve Got You Covered!",
      header: "Welcome to Guest Connect",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex items-center min-h-screen justify-center h-screen bg-cover bg-center bg-[#FCFAEE] text-white relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-700" />

      <div className="relative z-12 flex flex-col md:flex-row items-center justify-between w-full max-w-8xl px-8">
        <div className="flex-1 text-right md:pr-20 ml-auto ">
          <h1 className="text-4xl font-bold mb-4">
            {slides[currentSlide].header}
          </h1>
          <div className="flex justify-end">
            <p className="text-lg mb-8 w-1/3 text-right">
              {slides[currentSlide].quote}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-gray-400" : "bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
