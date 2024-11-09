import Link from 'next/link';
import { Archivo_Black } from 'next/font/google';
import localFont from "next/font/local";


const archivoBlack = Archivo_Black({
  weight: '400', // Archivo Black only has a weight of 400
  subsets: ['latin'], // Choose the subset that fits your needs
});
const poppins = {
  subsets: ['latin'],
  variable: '--font-poppins', 
  weight: ['400', '700'],
};

export default function Footer() {
  return (
    <footer className="bg-[#212121] text-white py-8 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-48">
        
        {/* Left Section */}
        <div>
          <h2 className={`text-2xl font-extrabold ${archivoBlack.className}`}>
            READY TO CONNECT<br /> WITH
            <span className="text-[#3A6D8C]">  TOP SPEAKERS <br/>WORLDWIDE</span>
          </h2>

          <p className="mt-4">Let’s get to know what you want!!</p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center border-solid border-2 border-white  w-48 h-12 p-2">
              <img src="/images/12.png" alt="Email Icon" className="mr-2 w-6 h-6" /> {/* Use an appropriate email icon image here */}
              <a href="mailto:info@inspire.org" className="hover:underline">info@inspire.org</a>
            </div>
            <div className="flex items-center border-solid border-2 border-white  w-48 h-12 p-2">
              <img src="/images/13.png" alt="Phone Icon" className="mr-2 w-6 h-6" /> {/* Use an appropriate phone icon image here */}
              <a href="tel:+91 9626123456" className="hover:underline">+91 9626123456</a>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className = {' '+ poppins.variable}>
          <h2 className="text-2xl font-extrabold mb-4">Website Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className=" group relative w-max">
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
            <li>
              <Link href="/find-speaker" className=" group relative w-max">
            <span>Find A Speaker</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
             <li>
              <Link href="/about" className=" group relative w-max">
            <span>About Us</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
             <li>
              <Link href="/topics" className=" group relative w-max">
            <span>Topics</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
            <li>
              <Link href="/contact" className=" group relative w-max">
            <span>Contact Us</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
             
           
          </ul>
        </div>

        {/* Right Section */}
        <div className = {' '+ poppins.variable}>
          <h2 className="text-2xl font-extrabold mb-4">Socials</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className=" group relative w-max">
            <span>Instagram</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
             <li>
              <Link href="/about" className=" group relative w-max">
            <span>Facebook</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>
             <li>
              <Link href="/topics" className=" group relative w-max">
            <span>Twitter</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
          </Link>
            </li>

          </ul>
        </div>

      </div>

      <div className="border-t border-gwhite mt-8 pt-4 text-center text-sm text-white">
        © 2024 Guest Connect. All rights reserved.
      </div>
    </footer>
  );
}

