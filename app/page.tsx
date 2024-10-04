import { Button } from "@/components/ui/button";
import Image from "next/image";


// app/page.tsx

export default function Home() {
  return (
    <main className="bg-[#1e232e] bg-cover bg-center" style={{ backgroundImage: "url('/images/connectbg.png')" }} >
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <div >
          <div className="flex justify-center mt-8">
            <Image src="/images/inspirelogo.png" alt="Logo" width={200} height={80} />
            </div>
          
          <h1 className="text-3xl font-bold text-center text-white">Welcome to Connect</h1>
          <p className="mt-4 text-gray-600 text-center">Connect with like-minded individuals</p>
          <div className="flex justify-center mt-8">
            <Button variant="default" className="w-[200px]">Get Started</Button>
          </div>
        </div>
      </div>
    </main>
  );
}