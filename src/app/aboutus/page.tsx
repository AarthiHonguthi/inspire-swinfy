"use client";
import React from 'react';
import SectionOne from '@/components/AboutUs/sectionone';
import SectionTwo from '@/components/AboutUs/sectiontwo';
import SectionThree from '@/components/AboutUs/sectionthree';

const FindSpeakerPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[50vh] w-full">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/slide3.png')", // You'll need to add your image
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl md:text-6xl font-bold text-center">
            About <br/>Guest Connect
          </h1>
        </div>
      </div>

      <SectionOne/>
      <SectionTwo/>
      <SectionThree/>
    </div>
  );
};

export default FindSpeakerPage;