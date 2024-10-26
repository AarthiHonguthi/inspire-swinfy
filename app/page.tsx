import { Button } from "@/components/ui/button";
import Image from "next/image";


// app/page.tsx

export default function Home() {
  return (
    <main className="bg-[#DFDFD5] bg-cover bg-center" >
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <div >
          <div className="flex justify-center mt-8">
            <Image src="/images/inspirelogo.png" alt="Logo" width={200} height={80} />
            </div>
        </div>
      </div>
    </main>
  );
}