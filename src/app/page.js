export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Hi I m Abu Saied Mondal</h1>
      <p className="mt-4 text-lg">Software Developer  IconsGuru Project Contributor</p>
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <ul className="list-disc ml-5 mt-2">
          <li>IconsGuru  A Next.js-based UI tools site</li>
          <li>Portfolio Site  You re on it</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>Email yourname@email.com</p>
        <p>GitHub <a href="https://github.com/yourusername" className="text-blue-500">github.com/yourusername</a></p>
      </section>
    </main>
  );
}
