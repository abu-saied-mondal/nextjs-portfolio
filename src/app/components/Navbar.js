"use client";
import Link from "next/link";
import { useState } from "react";
  import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
   const [isContactOpen, setIsContactOpen] = useState(false); 
  const toggleMenu = () => setIsOpen(!isOpen);


  return (
    <>
    <nav className="navbar-custom py-3 px-4 d-flex align-items-center justify-content-between">
      {/* Left: Logo */}
      <h1 className="navbar-title m-0 text-cyan">Abu Saied</h1>

      {/* Right: Desktop Links */}
      <ul className="nav-links list-unstyled d-none d-md-flex gap-4 m-0">
        <li><Link href="#home" className="nav-link-custom text-cyan">Home</Link></li>
        <li><Link href="#about" className="nav-link-custom text-cyan">About</Link></li>
        <li><Link href="#projects" className="nav-link-custom text-cyan">Projects</Link></li>
        <li>
            <button
              onClick={() => setIsContactOpen(true)}
              className="nav-link-custom text-cyan"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Contacts
            </button>
          </li>
      </ul>

      {/* Right: Mobile Menu Toggle (shown only on mobile) */}
      <div onClick={toggleMenu} className="d-md-none">
        {isOpen ? (
          // Close Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </div>

      {/* Dropdown Menu (mobile only) */}
      {isOpen && (
        <ul className="mobile-nav-links list-unstyled position-absolute top-100 end-0 bg-dark w-100 text-center">
          <li><Link href="#home" className="nav-link-custom d-block py-2" onClick={toggleMenu}>Home</Link></li>
          <li><Link href="#about" className="nav-link-custom d-block py-2" onClick={toggleMenu}>About</Link></li>
          <li><Link href="#projects" className="nav-link-custom d-block py-2" onClick={toggleMenu}>Projects</Link></li>
          <li><Link href="#contact" className="nav-link-custom d-block py-2" onClick={toggleMenu}>Contacts</Link></li>
        </ul>
      )}
    </nav>
    {/* ✅ Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
  );
}
