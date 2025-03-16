import React from "react";
import { useSearchParams } from "next/navigation";

const Hero = () => {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-16 px-6">
   <div className="relative">
        {/* GlobeTrotter Text with Shadow & 3D Effect */}
        <h1 className="text-6xl font-extrabold tracking-wide relative">
          <span className="text-yellow-400 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">GLOBE</span>
          <span className="text-purple-500 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)]">TROTTER</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg text-[#6A0DAD] font-bold mt-4 max-w-lg leading-relaxed">
      🔍 Discover the World, One Clue at a Time!

      </p>
    {score&&<p>Your friend's score: {score}</p>}
  </section>
      

  );
};

export default Hero;
