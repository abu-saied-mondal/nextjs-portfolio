"use client";


export default function Hero() {
  return (
    <section className="hero-section d-flex align-items-center justify-content-center text-center text-white">
      <div className="container">
        <p className="intro-text">Hello<span className="dot">.</span></p>
        <h1 className="hero-heading">I&#39;m Abu Saied</h1>
        <h2 className="hero-subheading">Software Developer</h2>
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-orange">Got a project&#63;</button>
           <a
            href="https://drive.google.com/file/d/1ki1FC11aE1wd6YxRjKNUZmFLWnmoBbOP/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-orange"
          >
            My resume
          </a>
        </div>
      </div>
    </section>
  );
}
