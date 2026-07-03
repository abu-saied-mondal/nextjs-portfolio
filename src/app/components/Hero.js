"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Code, Sparkles, Terminal } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const techRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Floating background glow elements
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

      // Entrance sequence
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
          imageContainerRef.current,
          { opacity: 0, scale: 0.9, rotateY: 25 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".tech-tag",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        );

      // Parallax scroll on portrait picture relative to container
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    // Mouse movement interactive 3D tilt
    const card = imageContainerRef.current;
    if (card) {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const angleX = -y / (rect.height / 20); // max 10deg
        const angleY = x / (rect.width / 20); // max 10deg
        
        gsap.to(card, {
          rotateX: angleX,
          rotateY: angleY,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        ctx.revert();
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => ctx.revert();
  }, []);

  const techStack = ["Next.js", "React Native", "Laravel", "Node.js", "Java", "MySQL", "MongoDB", "GSAP"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-32 lg:pt-24 overflow-hidden bg-[#03030f]"
    >
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] orb-cyan rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] orb-purple rounded-full bg-[#7000ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Typography */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
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
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 select-none leading-[1.1]"
          >
            Building Digital Products, <br />
            <span className="text-gradient-cyan-purple">Brands & Experiences</span>
          </h1>

          {/* Subtitle */}
          <h2
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-300 mb-6 flex items-center justify-center lg:justify-start gap-2"
          >
            <Code className="w-5 h-5 lg:w-6 lg:h-6 text-[#7000ff]" /> Fullstack Developer & Mobile Engineer
          </h2>

          {/* Pitch Statement */}
          <p
            ref={textRef}
            className="text-base lg:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-light"
          >
            I design and develop high-performance web & mobile applications with robust backend APIs and buttery smooth interfaces. Specialist in mobile performance optimization, API architecture, and clean code.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center lg:justify-start">
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
          <div ref={techRef} className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 max-w-xl">
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

        {/* Right Side: Portrait Image Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={imageContainerRef}
            className="relative w-72 h-[420px] md:w-80 md:h-[480px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,242,254,0.15)] border border-white/10 bg-brand-card/30 backdrop-blur-md transform-gpu group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Inner background glow accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f2fe]/20 to-[#7000ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Animated Profile Photo */}
            <div
              ref={imageRef}
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
              <Image
                src="/profile.jpg"
                alt="Abu Saied Mondal"
                fill
                sizes="(max-width: 768px) 288px, 320px"
                className="object-cover object-top scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority
              />
            </div>
            
            {/* Visual Glass Overlay Details */}
            <div 
              className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#03030f] via-[#03030f]/80 to-transparent pointer-events-none"
              style={{ transform: "translateZ(30px)" }}
            >
              <h3 className="text-xl font-bold text-white mb-0.5">Abu Saied Mondal</h3>
              <p className="text-xs font-semibold text-[#00f2fe] tracking-wider uppercase">Fullstack Developer</p>
            </div>
          </div>
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
