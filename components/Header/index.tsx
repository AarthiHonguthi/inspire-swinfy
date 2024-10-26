import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-[#fcfaee] flex items-center justify-between px-12 py-2 z-50 border-b border-gray-300 font-poppins">
      <div>
        <Link href="/">
          <img src="/images/inspirelogo.png" alt="Guest Connect Logo" className="h-16 w-auto" />
        </Link>
      </div>
      <nav className="flex items-center">
        <ul className="flex space-x-20 list-none font-poppins ...">
         <li className="m-6">
          <Link href="/" className="text-black font-bold group relative w-max">
            <span>HOME</span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
          </Link>
        </li>
        <li className= "m-6">
          <Link href="/findaspeaker" className="text-black font-bold group relative w-max">
            <span>FIND A SPEAKER</span> 
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
          </Link>
        </li>
         <li className= "m-6">
          <Link href="/aboutus" className="text-black font-bold group relative w-max">
            <span>ABOUT US</span> 
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
          </Link>
        </li>
        <li className= "m-6">
          <Link href="/topics" className="text-black font-bold group relative w-max">
            <span>TOPICS</span> 
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
          </Link>
        </li>
         <li className= "m-6">
          <Link href="/contactus" className="text-black font-bold group relative w-max">
            <span>CONTACT US</span> 
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
          </Link>
        </li>
        </ul>
      </nav>
              <button className="ml-6 bg-[#C5BDB5] px-4 py-2 rounded font-bold text-black-800 hover:bg-[#422F2F] hover:text-white">REQUEST A SPEAKER</button>

    </header>
  );
}
