import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import IconsGuruProject from "./components/IconsGuruProject";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-28 px-8 bg-dark text-white min-h-screen font-sans">
        <Hero />
        <Skills />
        <IconsGuruProject />
        <About />
      </main>
    </>
  );
}
