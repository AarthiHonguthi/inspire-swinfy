"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky navbar after scrolling halfway through viewport height
      setIsScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const response = await fetch(`/api/findaspeaker?search=${query}`);
        const data = await response.json();

        if (data.success) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header
      className={`w-full flex items-center justify-between px-12 py-2 z-50 font-poppins transition-all duration-300 ${
        isScrolled ? "bg-[#14394b] fixed top-0" : "absolute bg-transparent"
      }`}
    >
      <div>
        <Link href="/">
          <img
            src="/images/inspirelogo.png"
            alt="Guest Connect Logo"
            className="h-16 w-auto"
          />
        </Link>
      </div>
      <div className="flex items-center ml-auto">
        <div className="relative mr-8">
          <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Speaker, Keyword"
            className="pl-8 pr-4 py-2 w-64 bg-transparent border-b border-gray-400 focus:outline-none text-gray-400 placeholder-gray-300 text-sm"
          />
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#FCFAEE] text-[#14394b] shadow-lg rounded-lg max-h-60 overflow-y-auto">
              <ul className="max-h-full overflow-auto">
                {searchResults.map((speaker: any) => (
                  <li
                    key={speaker._id}
                    className="p-2 hover:bg-[#e39075] hover:text-white cursor-pointer"
                  >
                    <Link
                      href={`/findaspeaker/academicians/profilesection/${speaker.name}`}
                    >
                      <span>{speaker.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <nav>
          <ul className="flex space-x-8 list-none font-poppins">
            <li className="m-4">
              <Link
                href="/findaspeaker"
                className="text-gray-300 font-medium group relative w-max"
              >
                <span>FIND A SPEAKER</span>
                <span className="text-gray-300 absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#e39075] group-hover:w-full"></span>
              </Link>
            </li>
            <li className="m-4">
              <Link
                href="/aboutus"
                className="text-gray-300 font-medium group relative w-max"
              >
                <span>ABOUT US</span>
                <span className=" text-gray-300 absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#e39075] group-hover:w-full"></span>
              </Link>
            </li>
            <li className="m-4">
              <Link
                href="/topics"
                className="text-gray-300 font-medium group relative w-max"
              >
                <span>TOPICS</span>
                <span className=" text-gray-300 absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#e39075] group-hover:w-full"></span>
              </Link>
            </li>
            <li className="m-4">
              <Link
                href="/insights"
                className="text-gray-300 font-medium group relative w-max"
              >
                <span>INSIGHTS</span>
                <span className=" text-gray-300 absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#e39075] group-hover:w-full"></span>
              </Link>
            </li>
            <li className="m-4">
              <Link
                href="/shortlist"
                className="text-gray-300 font-medium group relative w-max"
              >
                <span>SHORTLIST</span>
                <span className=" text-gray-300 absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#e39075] group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
        <Link href="/bemyguest">
          <button className="ml-8 bg-[#e39075] px-4 py-2 rounded font-medium text-white">
            Request a Speaker
          </button>
        </Link>
      </div>
    </header>
  );
}
