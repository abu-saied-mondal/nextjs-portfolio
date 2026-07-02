"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Code, Sparkles, Terminal } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating neon orbs animation
      gsap.to(".orb-cyan", {
        x: "random(-30, 30)",
        y: "random(-30, 30)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orb-purple", {
        x: "random(-25, 25)",
        y: "random(-25, 25)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Staggered entrance animation
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          [buttonRef1.current, buttonRef2.current],
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
          "-=0.3"
        )
        .fromTo(
          ".tech-tag",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const techStack = ["Next.js", "React", "Node.js", "GraphQL", "PostgreSQL", "AWS", "GSAP"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 md:px-12 pt-32 overflow-hidden bg-[#03030f]"
    >
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] orb-cyan rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] orb-purple rounded-full bg-[#7000ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="hero-badge mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#00f2fe] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            Available for new projects
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-4 select-none leading-[1.1]"
        >
          Building Digital Products, <br />
          <span className="text-gradient-cyan-purple">Brands & Experiences</span>
        </h1>

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="text-xl md:text-3xl font-medium text-slate-300 mb-6 flex items-center gap-2"
        >
          <Code className="w-6 h-6 text-[#7000ff]" /> Fullstack Software Engineer & Creative Developer
        </h2>

        {/* Pitch Statement */}
        <p
          ref={textRef}
          className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light"
        >
          I design and develop high-performance web applications with robust architectures and buttery smooth user interfaces. Specialist in performance optimization, interactive typography, and clean layouts.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
          <a
            ref={buttonRef1}
            href="#projects"
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wider text-black bg-[#00f2fe] hover:bg-white rounded-xl shadow-[0_10px_20px_-5px_rgba(0,242,254,0.3)] hover:shadow-[0_12px_24px_-5px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
          >
            <Terminal className="w-4 h-4" /> VIEW MY WORK
          </a>
          <a
            ref={buttonRef2}
            href="#contact"
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wider text-white border border-white/10 hover:border-white rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
          >
            LET&apos;S CHAT
          </a>
        </div>

        {/* Technology Highlights */}
        <div ref={techRef} className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="tech-tag px-4 py-1.5 text-xs font-semibold text-slate-400 bg-white/5 border border-white/5 rounded-full select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1.5 opacity-55 animate-bounce">
        <span className="text-[10px] tracking-widest text-slate-500 uppercase font-bold">Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 text-[#00f2fe]" />
      </div>
    </section>
  );
}
