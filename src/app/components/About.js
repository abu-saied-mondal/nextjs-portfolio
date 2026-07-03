"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, Heart, Smile } from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // --- Entrance: inner content slides up & fades in ---
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // --- Stat cards stagger entrance ---
      const cards = cardsRef.current.querySelectorAll(".stat-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.13,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // --- Recession: section scales back as user scrolls OUT ---
      gsap.to(sectionRef.current, {
        scale: 0.88,
        opacity: 0.25,
        filter: "blur(4px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 60%",
          end: "bottom 10%",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#00f2fe]" />,
      value: "4+ Years",
      label: "Development Experience",
      desc: "Creating backend APIs, mobile apps, and frontend interfaces.",
      accent: "#00f2fe",
    },
    {
      icon: <Award className="w-6 h-6 text-[#7000ff]" />,
      value: "20+",
      label: "Projects Completed",
      desc: "From complex SaaS products to real-time mobile platforms.",
      accent: "#7000ff",
    },
    {
      icon: <Smile className="w-6 h-6 text-[#ff7b00]" />,
      value: "B.Tech",
      label: "ECE Graduate",
      desc: "Graduated with 89% marks in Electronics & Communication Engineering.",
      accent: "#ff7b00",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#ff007b]" />,
      value: "100%",
      label: "Product Ownership",
      desc: "Committed to writing clean, maintainable code from database to UI.",
      accent: "#ff007b",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 border-t border-white/5 bg-[#03030f] relative overflow-hidden"
      style={{ transformOrigin: "center top", willChange: "transform, opacity, filter" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />

      <div ref={innerRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left text column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-[#00f2fe] uppercase mb-4 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#00f2fe] inline-block" />
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-7 leading-tight">
              I craft clean code &{" "}
              <span className="text-gradient-cyan-purple">high-end solutions</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed mb-5 text-[15px]">
              As a self-motivated Fullstack Developer and Mobile Engineer, I specialize in building
              scalable web applications and high-performing mobile apps. With a Bachelor of Technology
              in Electronics and Communication Engineering, I bring strong logical thinking,
              object-oriented design, and architectural planning to every codebase.
            </p>
            <p className="text-slate-500 font-light leading-relaxed text-[14px]">
              My background spans Java, the MERN stack, Laravel, and React Native. From building
              complete subscription-based icon marketplaces like IconsGeek to developing
              video-chat matchmaking applications, I focus on clean, maintainable code and taking
              complete ownership of product life cycles.
            </p>

            {/* Accent line */}
            <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-[#00f2fe] to-transparent" />
          </div>

          {/* Right stats cards column */}
          <div
            ref={cardsRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-card relative p-8 flex flex-col gap-4 text-left rounded-2xl overflow-hidden group cursor-default"
                style={{
                  background: "rgba(9,9,21,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = `${stat.accent}35`;
                  e.currentTarget.style.boxShadow = `0 20px 50px -15px ${stat.accent}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Accent corner glow */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: stat.accent }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `${stat.accent}12`,
                    borderColor: `${stat.accent}25`,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-3xl md:text-4xl font-extrabold mb-1"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
