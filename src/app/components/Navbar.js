"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar-custom py-3 px-4 d-flex align-items-center justify-content-between">
      <h1 className="navbar-title m-0">Abu Saied</h1>
      <ul className="nav-links list-unstyled d-flex gap-4 m-0">
        <li><Link href="#home" className="nav-link-custom">Home</Link></li>
        <li><Link href="#about" className="nav-link-custom">About</Link></li>
        <li><Link href="#projects" className="nav-link-custom">Projects</Link></li>
        <li><Link href="#contact" className="nav-link-custom">Contacts</Link></li>
      </ul>
    </nav>
  );
}
