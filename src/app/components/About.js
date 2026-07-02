"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, Heart, Smile } from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Make sure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.querySelectorAll(".stat-card");

    const ctx = gsap.context(() => {
      // Animate cards on scroll entrance
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#00f2fe]" />,
      value: "3+",
      label: "Years of Experience",
      desc: "Building high-performance full-stack web applications.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#7000ff]" />,
      value: "25+",
      label: "Projects Completed",
      desc: "From sleek SaaS landing pages to robust backend architectures.",
    },
    {
      icon: <Smile className="w-6 h-6 text-[#ff7b00]" />,
      value: "15+",
      label: "Happy Clients",
      desc: "Translating customer visions into functional digital products.",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#ff007b]" />,
      value: "100%",
      label: "Commitment",
      desc: "Ensuring clean code, scaleability, and visual excellence.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#03030f]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left text column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-xs font-bold tracking-widest text-[#00f2fe] uppercase mb-3">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            I craft clean code & high-end solutions
          </h2>
          <p className="text-slate-400 font-light leading-relaxed mb-6">
            As a dedicated Fullstack Software Engineer, I thrive on the boundary between design and architecture. I build applications that are not only performant and secure under the hood, but also offer smooth, visually captivating user experiences.
          </p>
          <p className="text-slate-400 font-light leading-relaxed">
            My engineering philosophy centers around modular architectures, optimized databases, and responsive layouts. Whether designing complex GraphQL APIs or choreographing animations using GSAP, my goal is to deliver clean code and premium usability.
          </p>
        </div>

        {/* Right stats cards column */}
        <div ref={cardsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card glow-card p-8 flex flex-col gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-300 mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
