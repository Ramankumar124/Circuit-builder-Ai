import { useState } from "react";

const LandingNavbar = () => {
  const [toggleMobilemenu, settoggleMobilemenu] = useState(false);
  return (
    <nav
      id="header"
      className="fixed w-full z-50 bg-neutral-900 bg-opacity-90 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#hero" className="text-white font-bold text-xl">
            <span className="text-[#6E56CF]">Circuit</span>Builder
            <span className="text-[#6E56CF]">AI</span>
          </a>
        </div>

        {/* <!-- Desktop Menu --> */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="home"
              className="text-white hover:text-[#6E56CF] transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-white hover:text-[#6E56CF] transition-colors duration-300"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#templates"
              className="text-white hover:text-[#6E56CF] transition-colors duration-300"
            >
              Templates
            </a>
          </li>
          <li>
            <a
              href="#editor"
              className="text-white hover:text-[#6E56CF] transition-colors duration-300"
            >
              Editor
            </a>
          </li>
        </ul>

        {/* <!-- Mobile Menu Button --> */}

        <button
          onClick={() => settoggleMobilemenu(!toggleMobilemenu)}
          id="mobile-menu-button"
          className="md:hidden flex items-center"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* <!-- Mobile Menu --> */}
      <div
        id="mobile-menu"
        className={` 
        ${toggleMobilemenu ? "hidden" : "block"}
        md:hidden bg-neutral-800 animate__animated animate__fadeIn`}
      >
        <ul className="py-4 px-4 space-y-3">
          <li>
            <a
              href="home"
              className="block text-white hover:text-[#6E56CF] transition-colors duration-300 py-2"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="block text-white hover:text-[#6E56CF] transition-colors duration-300 py-2"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#templates"
              className="block text-white hover:text-[#6E56CF] transition-colors duration-300 py-2"
            >
              Templates
            </a>
          </li>
          <li>
            <a
              href="#editor"
              className="block text-white hover:text-[#6E56CF] transition-colors duration-300 py-2"
            >
              Editor
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;
