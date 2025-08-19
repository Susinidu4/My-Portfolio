import React from "react";
import "./App.css";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

function App() {
  {
    /** Navbar Items */
  }
  const navItems = [
    { name: "About Me", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Education & Certification", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  {
    /** home section */
  }
  return (
    <>
      <div className="bg-gradient-to-b from-[#130202] to-[#2F0000] text-white">
        {/* Navbar */}
        <nav className="fixed top-10 w-full z-50 shadow-md font-orbitron">
          <div className="container mx-auto flex justify-center gap-16 py-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.2 }}
              >
                <Link
                  to={item.id}
                  smooth={true}
                  duration={700}
                  offset={-70}
                  spy={true}
                  activeClass="active-link"
                  className="cursor-pointer text-lg md:text-xl transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Hello Section */}
        <section
          id="home"
          className="relative h-screen flex flex-col justify-center items-start pt-40 md:px-80 font-orbitron"
        >
          {/* Image Card */}
          <div className="absolute right-80 top-60 h-[60vh] w-[36rem] max-w-[80vw] rounded-3xl bg-white/5 shadow-xl backdrop-blur-sm hidden md:block" />

          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl text-gray-400 mb-12">
              Hello, I’m
            </h2>

            <h1 className="text-8xl md:text-9xl lg:text-10xl font-bold tracking-widest text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.35)]">
              SUSINIDU
            </h1>
            <h1 className="text-8xl md:text-9xl lg:text-10xl font-bold tracking-widest text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] mt-6">
              SACHINTHANA
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-gray-300 tracking-wide">
              Building Scalable &amp; User-Centric Software Solutions
            </p>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen pt-45 px-6 py-20 flex items-start"
        >
          <div
            className="
          relative mx-auto w-full max-w-6xl
          rounded-[28px] border border-white/30
          bg-gradient-to-b from-[#300606]/80 via-[#240404]/80 to-[#1a0202]/80
          shadow-[0_30px_60px_rgba(0,0,0,0.45)]
          ring-1 ring-white/10
          p-6 sm:p-10 lg:p-14
        "
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
              {/* LEFT: text */}
              <div>
                <h2 className="font-orbitron text-4xl sm:text-5xl text-white mb-6">
                  About Me
                </h2>

                <p className="text-neutral-200 leading-relaxed text-[17px]">
                  I’m an Information Technology undergraduate at Sri Lanka
                  Institute of Information Technology, specializing in
                  full‑stack development.
                </p>

                <p className="text-neutral-300 leading-relaxed text-[17px] mt-5">
                  With professional internship experience at Sri Lanka Telecom
                  and multiple completed projects in MERN stack and Spring Boot,
                  I thrive on creating efficient, scalable, and user‑friendly
                  applications.
                </p>

                <p className="text-neutral-300 leading-relaxed text-[17px] mt-5">
                  My focus is on solving real problems with clean code,
                  intuitive design, and seamless user experiences.
                </p>

                <a
                  href="#" // TODO: replace with your resume file
                  download
                  className="
                inline-flex items-center gap-2 mt-8
                rounded-full border border-white/40
                px-5 py-2.5
                text-white/90 hover:text-white
                hover:border-white/70
                bg-white/5 hover:bg-white/10
                transition
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              "
                >
                  <span className="font-orbitron">Resume</span>
                  {/* download icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3v12m0 0l-4-4m4 4l4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 21h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>

              {/* image */}
              <div className="relative">
                <div
                  className="
                overflow-hidden rounded-2xl
                shadow-[0_25px_50px_rgba(0,0,0,0.45)]
                border border-white/20
                bg-black/40
              "
                >
                  {/* your image */}
                  <img
                    src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1600&auto=format&fit=crop"
                    alt="Profile collage"
                    className="block w-full h-[320px] md:h-[380px] lg:h-[420px] object-cover mask-slices"
                  />

                 
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700/50 via-red-600/35 to-transparent mix-blend-multiply pointer-events-none" />
                  
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a0202] to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Programming</h3>
              <p>JavaScript, Java, Python, React.js, Node.js, Express</p>
            </div>
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Databases</h3>
              <p>MongoDB, MySQL, Microsoft SQL</p>
            </div>
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Dev Tools</h3>
              <p>Git, GitHub, Postman, VS Code, Figma</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
          <div className="bg-[#2a0000] p-6 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2">SereneMind</h3>
            <p className="text-gray-300">
              A Machine Learning based Personalized Mental Health Support
              Platform.
            </p>
            <ul className="list-disc list-inside text-gray-400 mt-2">
              <li>Developed using MERN stack.</li>
              <li>Integrated ML models for mental health prediction.</li>
              <li>REST APIs for authentication & journaling.</li>
            </ul>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Experience</h2>
          <div className="bg-[#2a0000] p-6 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold">Intern Software Developer</h3>
            <p className="text-gray-300">SLT-Mobitel | Jan 2025 - Apr 2025</p>
            <p className="mt-2 text-gray-400">
              Worked on scalable applications and backend integration,
              contributing to real-world solutions.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="text-xl font-bold">
                Sri Lanka Institute of Information Technology
              </h3>
              <p className="text-gray-300">
                BSc (Hons) in Information Technology
              </p>
            </div>
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="text-xl font-bold">Gonapala Central College</h3>
              <p className="text-gray-300">GCE Advanced Level</p>
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section id="certification" className="min-h-screen px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Certification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="font-bold">Higher Diploma in IT</h3>
              <button className="mt-2 px-3 py-1 bg-red-500 rounded">
                View
              </button>
            </div>
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="font-bold">RMIT Stage II</h3>
              <button className="mt-2 px-3 py-1 bg-red-500 rounded">
                View
              </button>
            </div>
            <div className="bg-[#2a0000] p-6 rounded-lg">
              <h3 className="font-bold">Diploma in IT</h3>
              <button className="mt-2 px-3 py-1 bg-red-500 rounded">
                View
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex flex-col justify-center items-center px-6 py-20"
        >
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="flex flex-col gap-4 text-lg">
            <a href="https://linkedin.com" className="hover:text-red-400">
              LinkedIn
            </a>
            <a href="https://github.com" className="hover:text-red-400">
              GitHub
            </a>
            <a
              href="mailto:susinidu.sachinthana@gmail.com"
              className="hover:text-red-400"
            >
              Email
            </a>
            <a href="tel:+94761241965" className="hover:text-red-400">
              +94 76 124 1965
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
