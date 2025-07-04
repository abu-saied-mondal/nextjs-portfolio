import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Services from "./components/Services";
import About from "./components/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-28 px-8 bg-dark text-white min-h-screen font-sans">
        <Hero />
        <Skills />
        <Services />
        <About />
      </main>
    </>
  );
}
