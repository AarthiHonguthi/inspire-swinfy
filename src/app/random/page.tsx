"use client";
import React from "react";

const RequestaSpeaker = () => {
  return (
    <div className="pt-40 bg-[#14394b] flex justify-center h-full">
      {/* Main container with max-width to limit form width */}
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-[#ffffff]">
          REQUEST YOUR GUEST
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section with Image and Info Box */}
          <div className="flex">
            {/* Left side image */}
            <div className="w-1/4">
              <img
                src="/api/placeholder/400/400"
                alt="Speaker"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side info box */}
            <div className="w-3/4 bg-[#e39075] p-6">
              <h2 className="text-white text-lg font-semibold mb-2">
                BOOKING INFORMATION REQUEST
              </h2>
              <h3 className="text-white text-xl font-bold mb-2">P.V.SINDHU</h3>
              <p className="text-white text-sm">
                We are happy to assist you with your interest in booking a
                speaker or celebrity for your event, your organization, and the
                type of talent you would like to secure, and an agent will be in
                touch shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section with top margin */}
        <div className="mt-8 gap-10">
          <div className="p-8 bg-[#f5f5f5]">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <input
                type="text"
                placeholder="First Name:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <input
                type="text"
                placeholder="Last Name:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <input
                type="tel"
                placeholder="Phone:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <input
                type="text"
                placeholder="Organization:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <input
                type="text"
                placeholder="Position:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <input
                type="text"
                placeholder="Event Location:"
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] text-[#1a3b50]"
              />

              <textarea
                placeholder="What is Booking For?"
                rows={4}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] resize-none text-[#1a3b50]"
              />

              <textarea
                placeholder="Brief Description About the Event:"
                rows={6}
                className="w-full p-4 bg-[#e0e5e8] rounded border-none placeholder-[#486776] resize-none text-[#1a3b50]"
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#1a3b50] text-white px-12 py-3 rounded font-semibold hover:bg-opacity-90 transition-colors"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestaSpeaker;
