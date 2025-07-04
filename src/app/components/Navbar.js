"use client";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-dark text-white">
      <h1 className="text-xl font-bold">Abu Saied</h1>
      <ul className="flex space-x-6 font-medium">
        <li><a href="#home" className="hover:text-orange-400">Home</a></li>
        <li><a href="#about" className="hover:text-orange-400">About</a></li>
        <li><a href="#projects" className="hover:text-orange-400">Projects</a></li>
        <li><a href="#contact" className="hover:text-orange-400">Contacts</a></li>
      </ul>
    </nav>
  );
}
