import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";


interface Speaker {
  id: number;
  name: string;
  description: string;
  image: string;
}

const SpeakerList: React.FC<{ category: string }> = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchSpeakers = async () => {
    try {
      const response = await fetch(`/api/findaspeaker/${category}`);
      const data = await response.json();
      setSpeakers(data.data);
      setTotalItems(data.data.length);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, [category]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedSpeakers = speakers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1
        className="text-4xl font-bold text-[#14394b] text-center pt-16 pb-8 mt-20"
        style={{ fontFamily: "Playfair Display" }}
      >
        Connect With Your Guest
      </h1>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {displayedSpeakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="bg-[#486776] rounded-lg p-4 mb-4 flex gap-4 items-center mt-20">
      {/* Render image on the left side */}
      <div className="flex-shrink-0 w-48 h-48">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <h2 className="text-2xl font-bold mb-2 text-white">{speaker.name}</h2>
        <p className="text-white mb-6">{speaker.description}</p>
        <div className="flex gap-4 items-center">
          <Link
            href={`/findaspeaker/academicians/requestaspeaker/${speaker.name}`}
            className="bg-[#14394b] text-white px-8 py-2 rounded-full hover:bg-[#0b1f29] transition-colors"
          >
            Request
          </Link>
          <Link
            href={`/findaspeaker/academicians/profilesection/${speaker.name}`}
            className="bg-[#14394b] text-white px-8 py-2 rounded-full hover:bg-[#0b1f29] transition-colors"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (showEllipsisStart) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showEllipsisEnd) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#14394b] disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() =>
            typeof page === "number" ? onPageChange(page) : undefined
          }
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentPage === page
              ? "bg-[#14394b] text-white"
              : page === "..."
              ? "cursor-default"
              : "hover:bg-[#14394b]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#14394b] disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default SpeakerList;
