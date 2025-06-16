"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SpeakerCategory {
  id: string;
  title: string;
  image: string;
}

const categories: SpeakerCategory[] = [
  { id: "academicians", title: "Academicians", image: "/images/100.jpeg" },
  { id: "celebrities", title: "Celebrities", image: "/images/101.png" },
  { id: "scholars", title: "Scholars", image: "/images/103.png" },
  { id: "bureaucrats", title: "Bureaucrats", image: "/images/104.png" },
  { id: "politicians", title: "Politicians", image: "/images/105.png" },
  { id: "athletes", title: "Athletes", image: "/images/106.jpg" },
  { id: "notable", title: "Notable Achievers", image: "/images/108.png" },
  { id: "entrepreneurs", title: "Entrepreneurs", image: "/images/109.webp" },
];

export default function FindSpeakerPage() {
  return (
    <div className="min-h-screen bg-[#212a31] py-12 px-4 mt">
      <div className="max-w-6xl mx-auto bg-[#212a31]">
        <h1
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white mt-28"
          style={{ fontFamily: "Playfair Display" }}
        >
          FIND A SPEAKER
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              href={`/findaspeaker/${category.id}`}
              key={category.id}
              passHref
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-square rounded-full overflow-hidden cursor-pointer group"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-xl font-semibold text-center px-4">
                    {category.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
