"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Briefcase } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const progressBarRef = useRef(null);

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

      // Timeline fill line
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      // Entrance for each item
      const items = sectionRef.current.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -40, rotateY: -6 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // --- Recession: section scales back as user scrolls past ---
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

  const history = [
    {
      role: "Software Developer",
      company: "Ascinate Technology",
      period: "Aug 2024 – Present",
      desc: "Developing and maintaining scalable full-stack applications. Focused on API architecture, secure database connections, payment checkouts, and real-time messaging services.",
      bullets: [
        "Built full-stack applications using Next.js on the frontend and Laravel RESTful APIs on the backend.",
        "Implemented secure payment integrations with Stripe, dynamic admin panels, and role-based access controls.",
        "Created real-time communication modules, custom API systems, and focused heavily on server performance optimizations.",
      ],
      accent: "#ff7b00",
    },
    {
      role: "Software Developer Intern",
      company: "Assoft Technology",
      period: "5 Months",
      desc: "Assisted in building custom full-stack features, maintaining web applications, and writing clean, structured code.",
      bullets: [
        "Supported API development and backend routing integrations.",
        "Assisted in database management (MySQL) and frontend responsiveness.",
        "Participated in agile code reviews and team collaboration.",
      ],
      accent: "#00f2fe",
    },
    {
      role: "Full Stack Development Trainee",
      company: "QSpiders Kolkata",
      period: "Feb 2023 – Jan 2024",
      desc: "Completed intensive structured training in Java and MERN stack. Established robust OOP skills and logical problem-solving methods.",
      bullets: [
        "Mastered Core & Advanced Java programming, MERN stack, and DBMS foundations.",
        "Solved logical programming problems and built data structure & algorithm foundations.",
        "Developed full-stack practice applications, connected custom APIs, and utilized Git and Postman.",
      ],
      accent: "#7000ff",
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 border-t border-white/5 bg-[#03030f] relative overflow-hidden"
      style={{ transformOrigin: "center top", willChange: "transform, opacity, filter" }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-[#ff7b00]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#ff7b00] uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-6 h-[2px] bg-[#ff7b00] inline-block" />
            Professional Milestones
            <span className="w-6 h-[2px] bg-[#ff7b00] inline-block" />
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Work{" "}
            <span className="text-gradient-orange-pink">Experience</span>
          </h2>
          <p className="text-slate-400 font-light max-w-xl mx-auto mt-5 leading-relaxed text-[15px]">
            My career journey building performant architectures, leading frontend innovations,
            and delivering user-oriented business values.
          </p>
        </div>

        <div className="timeline-container relative max-w-4xl mx-auto pl-8 md:pl-14">
          {/* Background track line */}
          <div className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[2px] bg-white/5" />

          {/* Scroll-animated fill line */}
          <div
            ref={progressBarRef}
            className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#ff7b00] to-[#ff007b] origin-top scale-y-0"
          />

          <div className="flex flex-col gap-12">
            {history.map((item, idx) => (
              <div key={idx} className="timeline-item relative text-left">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[41px] md:-left-[57px] top-1.5 w-7 h-7 rounded-full bg-[#03030f] border-2 flex items-center justify-center z-10"
                  style={{
                    borderColor: item.accent,
                    boxShadow: `0 0 14px ${item.accent}60`,
                  }}
                >
                  <Briefcase className="w-3 h-3" style={{ color: item.accent }} />
                </div>

                {/* Card */}
                <div
                  className="p-8 flex flex-col gap-5 rounded-2xl group overflow-hidden relative"
                  style={{
                    background: "rgba(9,9,21,0.75)",
                    border: `1px solid ${item.accent}18`,
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.accent}35`;
                    e.currentTarget.style.boxShadow = `0 20px 60px -20px ${item.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${item.accent}18`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Corner accent glow */}
                  <div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: item.accent }}
                  />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.role}</h3>
                      <div
                        className="text-sm font-semibold mt-1"
                        style={{ color: item.accent }}
                      >
                        {item.company}
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-400 flex-shrink-0"
                      style={{
                        background: `${item.accent}10`,
                        border: `1px solid ${item.accent}20`,
                      }}
                    >
                      <Calendar className="w-3 h-3" style={{ color: item.accent }} />
                      {item.period}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                    {item.desc}
                  </p>

                  <ul className="flex flex-col gap-2.5 relative z-10">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed font-light"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: `${item.accent}90` }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
