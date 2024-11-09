"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-base text-gray-500">{answer}</div>
      )}
    </div>
  );
};

const Faqs: React.FC = () => {
  const faqData = [
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial. You can cancel at any time during the trial period and you won't be charged."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "You can cancel your subscription at any time. You can do this from your account settings."
    },
    {
      question: "Where can I find my invoices?",
      answer: "You can find your invoices in your account settings."
    },
    {
      question: "How do I get support?",
      answer: " support team is available 24/7. You can reach us through email, chat, or phone."
    }
  ];

  return (
    <section className="py-12 mt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" style={{ fontFamily: "Playfair Display" }}>
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our product and service. Can't find what you're looking for? Feel free to contact our support team.
          </p>
        </div>
        
        <div className="space-y-1">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;