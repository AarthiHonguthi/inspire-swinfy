"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

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
    const fetchInitialData = async () => {
      try {
        // Fetch speakers data
        const speakersResponse = await fetch("/api/speakers");
        const speakersResult = await speakersResponse.json();
        if (speakersResult.success) {
          setSpeakers(speakersResult.data);
        } else {
          console.error("Error fetching speakers:", speakersResult.error);
        }

        // Fetch shortlisted speakers data
        const shortlistResponse = await fetch("/api/shortlist");
        const shortlistResult = await shortlistResponse.json();
        if (shortlistResult.success) {
          const shortlistedIds = shortlistResult.data.map(
            (speaker: Speaker) => speaker._id
          );
          setShortlistedSpeakers(shortlistedIds);
        } else {
          console.error(
            "Error fetching shortlisted speakers:",
            shortlistResult.error
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
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

  const handleRemoveFromShortlist = async (speaker: Speaker) => {
    // Prevent removing a speaker that is not shortlisted
    if (!shortlistedSpeakers.includes(speaker._id)) return;

    try {
      const response = await fetch(`/api/shortlist?id=${speaker._id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setShortlistedSpeakers((prev) =>
          prev.filter((id) => id !== speaker._id)
        ); // Remove the speaker from the shortlist state
        console.log("Speaker removed from shortlist:", result.data);
      } else {
        console.error("Error removing speaker from shortlist:", result.error);
      }
    } catch (error) {
      console.error("Error removing speaker from shortlist:", error);
    }
  };

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? totalSpeakers - 1 : prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => (prev === totalSpeakers - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col justify-center items-center mt-12 bg-[#FBF6E2]">
      <h1
        className="text-4xl font-bold mb-4 text-center text-[#14394b]"
        style={{ fontFamily: "Playfair Display" }}
      >
        Our Top Speakers
      </h1>
      <div className="relative flex flex-wrap justify-center items-center mb-4 w-full">
        <button
          onClick={handlePrev}
          className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-[#748d92] text-white font-bold p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-[#748d92] text-white font-bold p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>
        <div className="relative flex flex-wrap justify-center items-center mb-4 w-full">
          <div className="flex space-x-8">
            {speakers
              .slice(currentSlide, currentSlide + cardsToShow)
              .map((speaker) => (
                <div
                  key={speaker._id}
                  className="w-64 h-80 m-4 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center"
                >
                  <img
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <h3 className="text-lg font-bold mt-2 text-[#14394b]">
                    {speaker.name}
                  </h3>
                  <p className="text-sm mb-2 text-[#14394b]">{speaker.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <a
                      href={speaker.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3a5a6b] hover:text-[#0b1a21]"
                    >
                      View Profile
                    </a>
                    <div className="relative ml-12">
                      <button
                        onClick={() =>
                          shortlistedSpeakers.includes(speaker._id)
                            ? handleRemoveFromShortlist(speaker)
                            : handleAddToShortlist(speaker)
                        }
                        className="group"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            shortlistedSpeakers.includes(speaker._id)
                              ? "fill-current text-[#748d92]" // Filled heart for shortlisted speakers
                              : "text-[#748d92] hover:text-[#46686e]" // Default color for non-shortlisted speakers
                          }`}
                        />
                        {/* Hover text */}
                        <span className="absolute left-1/2 transform -translate-x-1/2 text-[#748d92] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {shortlistedSpeakers.includes(speaker._id)
                            ? "Remove"
                            : "Add to PreferredList"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
