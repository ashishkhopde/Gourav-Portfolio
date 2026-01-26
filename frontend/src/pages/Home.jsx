import React from "react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export default function Home() {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const offset = -80; // adjust for fixed navbar height
        const top = section.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    const [text] = useTypewriter({
        words: ['Sachin', 'A Video Editor', 'A Content Creator'],
        loop: true,
        typeSpeed: 150,
        deleteSpeed: 100,
        delaySpeed: 2000,
    });

    return (
        <section
            id="home"
            className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-18 text-white md:pt-0 pt-30"
        >
            {/* Left Content */}
            <div className="flex-1 md:text-left mt-10 md:mt-0 md:space-y-5 space-y-3 ml-0 md:ml-10">
                <h3 className="text-xl md:text-3xl font-bold tracking-wide">
                    Hello, I Am
                </h3>


                <h1 className="text-5xl md:text-7xl font-bold text-red-500">
                    <span className="">{text}</span>
                    <span className="text-white"><Cursor cursorStyle="|" /></span>
                </h1>

                <p className="text-base md:text-lg text-gray-300 max-w-md mx-auto md:mx-0">
                    Passionate video editor crafting visually engaging stories that captivate and connect audiences.
                </p>

                <div className="flex justify-center md:justify-start space-x-4 pt-4">
                    <button
                        onClick={() => scrollToSection("services")}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300">
                        View My Work
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all duration-300"
                    >
                        Contact Me
                    </button>
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center items-center">
                <div className="relative group">
                    <div className="absolute -inset-2 bg-red-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <img
                        src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80"
                        alt="Video Editing Setup"
                        className="relative z-10 rounded-2xl shadow-2xl w-[300px] md:w-[420px] object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
