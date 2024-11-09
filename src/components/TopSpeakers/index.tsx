"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface Speaker {
  _id: string;
  name: string;
  title: string;
  imageUrl: string;
  link: string;
}

export default function TopSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shortlistedSpeakers, setShortlistedSpeakers] = useState<string[]>([]); // Track shortlisted speakers
  const totalSpeakers = speakers.length;
  const cardsToShow = 4;

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("/api/speakers");
        const result = await response.json();
        if (result.success) {
          setSpeakers(result.data);
        } else {
          console.error("Error fetching speakers:", result.error);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);

  const handleAddToShortlist = async (speaker: Speaker) => {
    // Prevent adding the same speaker multiple times
    if (shortlistedSpeakers.includes(speaker._id)) return;

    try {
      const response = await fetch("/api/shortlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(speaker),
      });
      const result = await response.json();
      if (result.success) {
        setShortlistedSpeakers((prev) => [...prev, speaker._id]); // Update the state to mark the speaker as shortlisted
        console.log("Speaker added to shortlist:", result.data);
      } else {
        console.error("Error adding speaker to shortlist:", result.error);
      }
    } catch (error) {
      console.error("Error adding speaker to shortlist:", error);
    }
  };

  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? totalSpeakers - 1 : prev - 1));
  const handleNext = () => setCurrentSlide((prev) => (prev === totalSpeakers - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col justify-center items-center mt-12 bg-[#FCFAEE]">
      <h1 className="text-4xl font-bold mb-4 text-center text-[#14394b]" style={{ fontFamily: "Playfair Display" }}>Our Top Speakers</h1>
      <div className="relative flex flex-wrap justify-center items-center mb-4 w-full">
        <button
          onClick={handlePrev}
          className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-[#e39075] text-white font-bold p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-[#e39075] text-white font-bold p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>
        <div className="relative flex flex-wrap justify-center items-center mb-4 w-full">
          <div className="flex space-x-8">
            {speakers.slice(currentSlide, currentSlide + cardsToShow).map((speaker) => (
              <div key={speaker._id} className="w-64 h-80 m-4 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                <img src={speaker.imageUrl} alt={speaker.name} className="w-full h-48 object-cover rounded-t-md" />
                <h3 className="text-lg font-bold mt-2 text-[#14394b]">{speaker.name}</h3>
                <p className="text-sm mb-2 text-[#14394b]">{speaker.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <a href={speaker.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-900">
                    View Profile
                  </a>
                  <button
                    onClick={() => handleAddToShortlist(speaker)}
                    className="ml-12"
                    disabled={shortlistedSpeakers.includes(speaker._id)} // Disable if already shortlisted
                  >
                    <Plus
                      className={`w-5 h-5 ${shortlistedSpeakers.includes(speaker._id) ? "text-gray-400" : "text-[#e29074] hover:text-[#d27865]"}`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
