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
      answer:
        "Yes, we offer a 14-day free trial for new users. During this period, you can explore all features and cancel at any time without being charged.",
    },
    {
      question: "How can I invite an expert to my event?",
      answer:
        "To invite an expert, simply create an invitation request with details about your event, specify your requirements, and select experts from our searchable database. We'll assist in coordinating the rest.",
    },
    {
      question: "Can I cancel or modify an invitation request?",
      answer:
        "Yes, you can modify or cancel an invitation request before it is accepted by the expert. You’ll receive an email confirmation once your request is updated or canceled.",
    },
    {
      question: "How do I manage logistics and payments?",
      answer:
        "Inspire Swinfy allows you to handle all logistics, including transport and accommodation arrangements, and secure payment processing through Stripe—all from your account.",
    },
    {
      question: "Where can I track my event details and expert confirmations?",
      answer:
        "You’ll receive real-time email notifications for all updates regarding event details, expert confirmations, and logistics. No need for a dashboard—everything important will come directly to your inbox.",
    },
    {
      question: "How do I get support?",
      answer:
        "Our support team is available 24/7. You can reach us via email, chat, or phone for any assistance with the platform.",
    },
  ];

  return (
    <section className="py-12 mt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold tracking-tight text-[#14394b] sm:text-4xl"
            style={{ fontFamily: "Playfair Display" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our product and service. Can't
            find what you're looking for? Feel free to contact our support team.
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