"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Step {
  imageUrl: string;
  number: number;
  title: string;
  description: string;
}

interface StepContentProps {
  step: Step;
  index: number;
  inView: boolean;
}

interface ProgressLineProps {
  inView: boolean;
  isLast: boolean;
}

const StepContent: React.FC<StepContentProps> = ({ step, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (index % 2 === 0 ? -50 : 50) }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`} // Adjust padding based on position
    >
      <div className="max-w-md inline-block">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-[#14394b] text-center">{step.title}</h3> {/* Center-align title */}
          <p className="text-gray-600">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressLine: React.FC<ProgressLineProps> = ({ inView, isLast }) => {
  return (
    <motion.div
      className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 origin-top ${isLast ? 'h-0' : 'h-24'}`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: inView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      imageUrl: "/images/1.png",
      number: 1,
      title: "Create an Invitation Request",
      description: "Tell us what you need to insure, how much it's worth, and where you live and estimate your rate (with different options for deductibles) in less than one minute."
    },
    {
      imageUrl: "/images/2.png",
      number: 2,
      title: "Coordinate and Confirm Availability",
      description: "Tell us a bit more about yourself and your jewelry and, in most cases, your coverage starts immediately. If someone else actually wears the jewelry, tell us about them too."
    },
    {
      imageUrl: "/images/3.png",
      number: 3,
      title: "Match with Industry Experts",
      description: "Enjoy your jewelry knowing you're protected worldwide against loss, theft, damage, and mysterious disappearance."
    },
    {
      imageUrl: "/images/4.png",
      number: 4,
      title: "Manage Logistics and Payments",
      description: "Enjoy your jewelry knowing you're protected worldwide against loss, theft, damage, and mysterious disappearance."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16  mt-16">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-[#14394b] mb-20 text-center" 
        style={{ fontFamily: "Playfair Display" }}
      >
        How it All Works
      </motion.h1>

      <div className="relative">
        <div className="space-y-24">
          {steps.map((step, index) => {
            const ref = useRef<HTMLDivElement>(null);
            const isInView = useInView(ref, { 
              margin: "-20% 0px -20% 0px",
              amount: 0.4 
            });
            
            return (
              <div
                key={index}
                ref={ref}
                className={`flex items-center gap-8 relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <StepContent step={step} index={index} inView={isInView} />

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10"
                  >
                    <img src={step.imageUrl} alt={step.title} className="w-16 h-16" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isInView ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-[#e39075] text-white rounded-full flex items-center justify-center font-bold"
                    >
                      {step.number}
                    </motion.div>
                  </motion.div>
                </div>

                <ProgressLine inView={isInView} isLast={index === steps.length - 1} />

                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
