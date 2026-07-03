"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const wrapperRef = useRef(null);   // tall scroll-distance container
  const sectionRef = useRef(null);   // sticky viewport panel
  const trackRef = useRef(null);     // horizontal sliding rail
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  const projects = [
    {
      title: "ZTS India — Dynamic Corporate Portal",
      desc: "A fully dynamic corporate website built from scratch for a major Kolkata company. Features a custom WordPress-like CMS in Laravel — admins control pages, blogs, media, navigation, and SEO metadata entirely from a dashboard.",
      tech: ["Laravel", "PHP", "MySQL", "Custom CMS", "SEO Management"],
      image: "/zts_mockup.png",
      demoLink: "https://ztsindia.com/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#00f2fe",
    },
    {
      title: "Enterprise HRM Ecosystem",
      desc: "All-in-one HRM System with 25+ modules: HR Core, AI Resume Screening, Biometric/GPS Attendance, Leave Management, Payroll with Bank Transfer, LMS Training Portal, and Advanced Analytics.",
      tech: ["Laravel", "MySQL", "PostgreSQL", "AI Features", "Real-time Analytics"],
      image: "/hrm_system.jpg",
      demoLink: "https://ascinate.in/demo/hrm_system",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#7000ff",
    },
    {
      title: "HerCompass — AI Health Companion",
      desc: "Personalized AI-powered health companion for women 45+. Tracks mood, symptoms, sleep, and energy — transforms raw daily logs into predictive, actionable wellness insights using intelligent AI pattern analysis.",
      tech: ["MERN Stack", "Node.js", "MongoDB", "AI Processing", "Predictive Analytics"],
      image: "/hercompass.jpg",
      demoLink: "https://newhercompass.vercel.app/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#ff007b",
    },
    {
      title: "IconsGeek",
      desc: "Subscription-based icon marketplace with dynamic SVG rendering, real-time colour/size customisation, downloadable PNG/JPG exports, and a full Stripe checkout flow. Independently architected and deployed.",
      tech: ["Next.js", "Laravel", "MySQL", "Stripe API", "REST APIs"],
      image: "/dashboard_mockup.png",
      demoLink: "https://www.iconsgeek.com/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#00f2fe",
    },
    {
      title: "SnapHive — Photo Sharing App",
      desc: "Full-stack mobile social platform: public/private photo hives, in-app camera filters, one-tap email invites, Firebase cloud storage, real-time chat, and AI-based image generation built into the creator flow.",
      tech: ["React Native CLI", "Node.js", "Express", "Firebase", "AI APIs"],
      image: "/workspace_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#ff7b00",
    },
    {
      title: "Louis — Video Dating App",
      desc: "Tinder-style matchmaking with vertical video profiles, swipe gesture UX, and real-time Socket.IO messaging. Engineered performant video loading pipelines. Published live on the iOS App Store.",
      tech: ["React Native Expo", "Node.js", "Socket.IO", "MongoDB", "Video Rendering"],
      image: "/ecommerce_mockup.png",
      demoLink: "https://apps.apple.com/in/app/louis-dating/id6472041327",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#7000ff",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !track || !wrapper) return;

    // Calculate how far the track needs to scroll horizontally
    const getScrollAmount = () => track.scrollWidth - section.offsetWidth;

    // Set wrapper height = scrollAmount + 1 viewport so we have enough scroll room
    const setWrapperHeight = () => {
      wrapper.style.height = `${getScrollAmount() + window.innerHeight}px`;
    };
    setWrapperHeight();

    // Main horizontal scroll animation — scrubbed to wrapper scroll progress
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      scrub: 1.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Drive the horizontal translation directly
        gsap.set(track, { x: -getScrollAmount() * self.progress });

        // 3D card tilt based on each card's position relative to viewport centre
        const cards = track.querySelectorAll(".proj-card");
        const centre = window.innerWidth / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCentre = rect.left + rect.width / 2;
          const dist = (cardCentre - centre) / window.innerWidth; // –1 … +1
          const rotY = dist * 18; // degrees
          const scale = 1 - Math.abs(dist) * 0.06;
          gsap.set(card, {
            rotateY: rotY,
            scale,
            transformOrigin: "center center",
            force3D: true,
          });
        });

        // Update UI
        if (progressRef.current)
          progressRef.current.style.width = `${self.progress * 100}%`;
        if (counterRef.current) {
          const cards2 = track.querySelectorAll(".proj-card");
          const idx = Math.min(
            Math.round(self.progress * (cards2.length - 1)),
            cards2.length - 1
          );
          counterRef.current.textContent = `0${idx + 1}`;
        }
      },
    });

    // Resize handler
    const onResize = () => {
      setWrapperHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* ── Tall wrapper — creates vertical scroll distance ─────────── */}
      <div ref={wrapperRef} id="projects" style={{ position: "relative" }}>

        {/* ── Sticky viewport panel — stays fixed while wrapper scrolls ─ */}
        <div
          ref={sectionRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#03030f",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Ambient bg glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(112,0,255,0.07) 0%, transparent 70%)",
            }}
          />

          {/* ── Header bar ──────────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "2rem 4rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "#00f2fe",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Portfolio Case Studies
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Featured Projects
              </h2>
            </div>

            {/* Scroll hint */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.65rem",
                fontFamily: "monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <ArrowRight size={14} style={{ color: "#00f2fe" }} />
              Scroll to explore
            </div>

            {/* Counter */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
              <span
                ref={counterRef}
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#00f2fe",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                01
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.1rem", fontFamily: "monospace" }}>
                / 0{projects.length}
              </span>
            </div>
          </div>

          {/* ── Progress bar ─────────────────────────────────────────── */}
          <div style={{ height: "2px", background: "rgba(255,255,255,0.05)", margin: "0 4rem" }}>
            <div
              ref={progressRef}
              style={{
                height: "100%",
                width: "0%",
                background: "linear-gradient(90deg, #00f2fe, #7000ff, #ff007b)",
                transition: "none",
              }}
            />
          </div>

          {/* ── Horizontal track ─────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "calc(100vh - 110px)",
              perspective: "1400px",
              perspectiveOrigin: "center center",
            }}
          >
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: "2rem",
                paddingLeft: "4rem",
                paddingRight: "4rem",
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="proj-card"
                  style={{
                    flexShrink: 0,
                    width: "clamp(300px, 35vw, 500px)",
                    height: "calc(100vh - 180px)",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    background: "rgba(9,9,21,0.85)",
                    border: `1px solid ${project.color}20`,
                    backdropFilter: "blur(20px)",
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 30px 80px -20px ${project.color}40, 0 0 0 1px ${project.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Image area */}
                  <div style={{ position: "relative", height: "42%", flexShrink: 0, overflow: "hidden" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="500px"
                      style={{ objectFit: "cover" }}
                      priority={idx < 2}
                    />
                    {/* Gradient scrim */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, transparent 40%, rgba(9,9,21,0.98) 100%)",
                      }}
                    />
                    {/* Index chip */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "0.65rem",
                        fontFamily: "monospace",
                        color: "rgba(255,255,255,0.5)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </div>
                    {/* Accent glow dot */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1rem",
                        right: "1rem",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: project.color,
                        boxShadow: `0 0 16px ${project.color}`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      flex: 1,
                      padding: "1.5rem 1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                      overflow: "hidden",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(148,163,184,0.9)",
                        lineHeight: 1.65,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.desc}
                    </p>

                    {/* Tech badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "auto" }}>
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "0.2rem 0.6rem",
                            borderRadius: "0.375rem",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: project.color,
                            background: `${project.color}14`,
                            border: `1px solid ${project.color}28`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        paddingTop: "0.75rem",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          padding: "0.45rem 1.1rem",
                          borderRadius: "999px",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#000",
                          backgroundColor: project.color,
                          boxShadow: `0 4px 20px ${project.color}50`,
                          textDecoration: "none",
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        Live Demo <ExternalLink size={11} />
                      </a>
                      <a
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(148,163,184,0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(148,163,184,0.7)")}
                      >
                        <Github size={14} /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* End spacer */}
              <div style={{ flexShrink: 0, width: "4rem" }} />
            </div>
          </div>
        </div>
        {/* End sticky section */}
      </div>
      {/* End tall wrapper */}
    </>
  );
}
