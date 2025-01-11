"use client";
import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface Speaker {
  _id: string;
  name: string;
  imageUrl: string;
  title: string;
  link: string;
}

const Shortlist = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch shortlist speakers from API
  useEffect(() => {
    const fetchShortlist = async () => {
      try {
        const response = await fetch("/api/shortlist");
        const result = await response.json();
        if (result.success) {
          setSpeakers(result.data);
        } else {
          console.error("Error fetching shortlist:", result.error);
        }
      } catch (error) {
        console.error("Error fetching shortlist:", error);
      }
    };

    fetchShortlist();
  }, []);

  const handleClearShortlist = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch("/api/shortlist", {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setSpeakers([]);
      } else {
        console.error("Error clearing shortlist:", result.error);
      }
    } catch (error) {
      console.error("Error clearing shortlist:", error);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-[#fbf9ed]">
      {/* Header */}
      <header className="relative h-[50vh] w-full bg-[#748d92] py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="mt-32 text-4xl font-serif mb-4 text-white text-center">
            Your shortlist
          </h1>
          <p className="text-white text-center">
            Add speakers to your shortlist to see them all in one place. Once
            your list is complete, you can send it to yourself and <br />
            your team, or get in touch to enquire about speaker availability.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl text-[#748d92]">My Shortlist</div>
          <div className="flex gap-4">
            <button
              onClick={handleClearShortlist}
              className="px-4 py-2 border border-gray-700 text-gray-700 rounded hover:bg-gray-100"
            >
              CLEAR SHORTLIST
            </button>
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker._id}
              className="w-64 h-80 m-4 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105"
            >
              <img
                src={speaker.imageUrl}
                alt={speaker.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <h2 className="text-lg font-bold mt-2 text-[#14394b]">
                {speaker.name}
              </h2>
              <p className="text-sm mb-2 text-[#14394b]">{speaker.title}</p>
              <div className="flex justify-between items-center mt-2">
                <a
                  href={speaker.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-900"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}

          {/* Add Speaker Button */}
          <Link href="/findaspeaker">
            <div className="w-64 h-80 m-4 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-[#748d92] rounded-full flex items-center justify-center hover:bg-[#486c73] transition-colors">
                <span className="text-white text-4xl">+</span>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Add a Speaker</p>
            </div>
          </Link>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-16 rounded-lg max-w-md">
              <h2 className="text-3xl font-serif text-[#748d92] mb-6">
                Are you sure you want to delete your shortlist?
              </h2>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. All speakers will be removed from
                your shortlist.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-[#748d92] text-white rounded flex items-center"
                >
                  <Trash2 className="w-7 h-7" />
                  Delete Shortlist
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  Return to your Shortlist
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shortlist;
