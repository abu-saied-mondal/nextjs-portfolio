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
      value: "2+ Years",
      label: "Development Experience",
      desc: "Creating backend APIs, mobile apps, and frontend interfaces.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#7000ff]" />,
      value: "10+",
      label: "Projects Completed",
      desc: "From complex SaaS products to real-time mobile platforms.",
    },
    {
      icon: <Smile className="w-6 h-6 text-[#ff7b00]" />,
      value: "B.Tech",
      label: "ECE Graduate",
      desc: "Graduated with 89% marks in Electronics & Communication Engineering.",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#ff007b]" />,
      value: "100%",
      label: "Product Ownership",
      desc: "Committed to writing clean, maintainable code from database to UI.",
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
            As a self-motivated Fullstack Developer and Mobile Engineer, I specialize in building scalable web applications and high-performing mobile apps. With a Bachelor of Technology in Electronics and Communication Engineering, I bring strong logical thinking, object-oriented design, and architectural planning to every codebase.
          </p>
          <p className="text-slate-400 font-light leading-relaxed">
            My background spans across Java, the MERN stack, Laravel, and React Native. From building complete subscription-based icon marketplaces like IconsGeek to developing video-chat matchmaking applications, I focus on writing clean, maintainable code and taking complete ownership of product life cycles.
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
