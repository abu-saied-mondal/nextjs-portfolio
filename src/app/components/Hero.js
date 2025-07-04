"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="max-w-xl">
        <p className="text-lg text-orange-400">Hello<span className="text-white">.</span></p>
        <h1 className="text-5xl font-bold mt-2">I'm Abu Saied</h1>
        <h2 className="text-3xl font-semibold mt-2">Software Developer</h2>
        <div className="mt-6 flex gap-4">
          <button className="bg-orange-500 px-5 py-2 text-white font-semibold rounded hover:bg-orange-600">Got a project?</button>
          <button className="border border-orange-400 px-5 py-2 font-semibold rounded text-orange-400 hover:bg-orange-400 hover:text-white">My resume</button>
        </div>
      </div>

      <div className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden flex items-center justify-center border-4 border-orange-500 shadow-xl">
        <Image
          src="/profile.png" // Replace this with your image later
          alt="Profile"
          layout="fill"
          objectFit="cover"
          className="rounded-full z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-black/70 rounded-full" />
      </div>
    </section>
  );
}
