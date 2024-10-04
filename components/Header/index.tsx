"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-dark"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="logo flex items-center">
          <Image src="/images/inspirelogo.png" alt="Logo" width={100} height={40} />
         
        </div>

        {/* Navigation */}
        <nav className="flex space-x-14 text-white">
  <Link href="/find-a-speaker" className="hover:text-gray-300" style={{ fontFamily: 'var(--font-tt-rounds-condensed)',fontWeight: 'bold' }}>
    FIND A SPEAKER
  </Link>
  <Link href="/topics" className="hover:text-gray-300" style={{ fontFamily: 'var(--font-tt-rounds-condensed)',fontWeight: 'bold' }}>
    TOPICS
  </Link>
  <Link href="/about-us" className="hover:text-gray-300" style={{ fontFamily: 'var(--font-tt-rounds-condensed)',fontWeight: 'bold' }}>
    ABOUT US
  </Link>
  <Link href="/contact-us" className="hover:text-gray-300" style={{ fontFamily: 'var(--font-tt-rounds-condensed)',fontWeight: 'bold' }}>
    CONTACT US
  </Link>
</nav>


        {/* CTA Button */}
        <div>
          <Link
            href="/book-a-speaker"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition-all"
          style={{ fontFamily: 'var(--font-tt-rounds-condensed)',fontWeight: 'bold' }}>
            Book a Speaker
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
