"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Database, Layout, Settings } from "lucide-react";

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const [skillsData, setSkillsData] = useState([
    {
      title: "Frontend & Mobile Engineering",
      icon: "Layout",
      accent: "#00f2fe",
      skills: [
        { name: "HTML / CSS / JavaScript", level: "95%" },
        { name: "React / Next.js", level: "90%" },
        { name: "React Native / Expo", level: "85%" },
        { name: "GSAP / Tailwind CSS", level: "90%" },
      ],
    },
    {
      title: "Backend Development",
      icon: "Cpu",
      accent: "#7000ff",
      skills: [
        { name: "Java (Core & Advanced)", level: "85%" },
        { name: "PHP / Laravel MVC", level: "80%" },
        { name: "Node.js / Express", level: "85%" },
        { name: "REST APIs & Postman", level: "90%" },
      ],
    },
    {
      title: "Databases & CMS",
      icon: "Database",
      accent: "#ff7b00",
      skills: [
        { name: "MySQL / PostgreSQL", level: "85%" },
        { name: "MongoDB", level: "80%" },
        { name: "Strapi (Headless CMS)", level: "75%" },
        { name: "JSON & Promises", level: "90%" },
      ],
    },
    {
      title: "Tools & Logical Concepts",
      icon: "Settings",
      accent: "#ff007b",
      skills: [
        { name: "Git & Version Control", level: "85%" },
        { name: "Logical Programming & DSA", level: "80%" },
        { name: "Database Management (DBMS)", level: "80%" },
        { name: "Performance Optimization", level: "85%" },
      ],
    },
  ]);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        if (data.success && data.skills) {
          setSkillsData(data.skills);
        }
      } catch (err) {
        console.error("Failed to load skills content:", err);
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Card stagger entrance
      const categories = gridRef.current.querySelectorAll(".skill-category-card");
      gsap.fromTo(
        categories,
        { opacity: 0, y: 50, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Progress bars
      const progressBars = gridRef.current.querySelectorAll(".progress-bar-fill");
      gsap.fromTo(
        progressBars,
        { width: "0%" },
        {
          width: (i, target) => target.dataset.percent,
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // --- Recession: scale back as user scrolls past ---
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
  }, [skillsData]); // Re-trigger animations when data changes

  const renderIcon = (iconName, accent) => {
    const IconComponent = {
      Layout,
      Cpu,
      Database,
      Settings
    }[iconName];

    if (!IconComponent) return null;
    return <IconComponent className="w-5 h-5" style={{ color: accent }} />;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 border-t border-white/5 bg-[#03030f] relative overflow-hidden"
      style={{ transformOrigin: "center top", willChange: "transform, opacity, filter" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#7000ff]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#7000ff] uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-6 h-[2px] bg-[#7000ff] inline-block" />
            Skills & Technologies
            <span className="w-6 h-[2px] bg-[#7000ff] inline-block" />
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            My Technical{" "}
            <span className="text-gradient-cyan-purple">Arsenal</span>
          </h2>
          <p className="text-slate-400 font-light max-w-xl mx-auto mt-5 leading-relaxed text-[15px]">
            A comprehensive suite of modern front-end tools, back-end environments,
            databases, and continuous delivery flows — built through years of real-world shipping.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillsData.map((category, idx) => (
            <div
              key={idx}
              className="skill-category-card relative p-8 flex flex-col gap-6 rounded-2xl overflow-hidden group"
              style={{
                background: "rgba(9,9,21,0.75)",
                border: `1px solid ${category.accent}18`,
                backdropFilter: "blur(16px)",
                transformStyle: "preserve-3d",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${category.accent}35`;
                e.currentTarget.style.boxShadow = `0 20px 60px -20px ${category.accent}30, inset 0 1px 0 ${category.accent}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${category.accent}18`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: category.accent }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `${category.accent}12`,
                    borderColor: `${category.accent}25`,
                  }}
                >
                  {renderIcon(category.icon, category.accent)}
                </div>
                <h3 className="text-[15px] font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-5 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-300">{skill.name}</span>
                      <span
                        className="font-mono text-xs font-semibold"
                        style={{ color: category.accent }}
                      >
                        {skill.level}
                      </span>
                    </div>
                    {/* Track */}
                    <div className="w-full h-[3px] rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="progress-bar-fill h-full rounded-full"
                        data-percent={skill.level}
                        style={{
                          width: "0%",
                          background: `linear-gradient(90deg, ${category.accent}80, ${category.accent})`,
                          boxShadow: `0 0 8px ${category.accent}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
