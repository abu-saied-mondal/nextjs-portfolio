export default function About() {
  return (
    <section id="about" className="mt-16 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">About me</h2>
      <p className="text-gray-300">
        I started my software journey from photography. Through that&#44; I learned to love the process of creating from scratch. 
        Since then&#44; this has led me to software development as it fulfills my love for learning and building things.
      </p>
      <div className="flex justify-center mt-8 gap-10 text-center">
        <div>
          <h3 className="text-3xl font-bold text-orange-400">120+</h3>
          <p className="text-sm text-gray-400">Completed Projects</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-orange-400">95%</h3>
          <p className="text-sm text-gray-400">Client Satisfaction</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-orange-400">10+</h3>
          <p className="text-sm text-gray-400">Years of Experience</p>
        </div>
      </div>
    </section>
  );
}
