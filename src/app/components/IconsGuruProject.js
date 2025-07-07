export default function IconsGuruProject() {
    return (
        <section className="py-5 iconsguru-section text-white">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left: Loom Video */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", border: "none" }}>
                            <iframe
                                src="https://www.loom.com/embed/f20dc1cd1a424addbcbbbcbac0fec6fd?autoplay=1&muted=1&loop=1&hide_owner=true&hide_share=true&hide_title=true"
                                frameBorder="0"
                                allow="autoplay"
                                allowFullScreen
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Description */}
                    <div className="col-md-6">
                        <h2 className="section-title mb-3 text-cyan">IconsGuru Project</h2>
                        <p className="text-light mb-3 prohead">
                            <strong>IconsGuru</strong> is a modern web platform I built that offers a curated collection of icons for developers and designers&#44; 
                            enabling easy browsing&#44; searching&#44; and downloading of assets based on categories and tags
                        </p>
                        <ul className="text-light prohead">
                            <li>🔍 Live icon search &#44; filtering</li>
                            <li>🖼️ SVG preview and download support</li>
                            <li>📁 Organized by category &#44; tags</li>
                            <li>⚡ Fast&#44; responsive UI built with Next.js &#44; Node.js &#44; Laravel backend</li>
                        </ul>
                        <p className="mt-3 text-light prohead">
                            This project reflects my ability to merge frontend polish with backend structure&#44; 
                            offering real-time interaction&#44; modern design&#44; and efficient performance
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
