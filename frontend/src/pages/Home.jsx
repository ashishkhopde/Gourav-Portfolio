import React from "react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Home() {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const offset = -80;
        const top = section.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    const [text] = useTypewriter({
        words: ['Sachin', 'A Video Editor', 'A Content Creator'],
        loop: true,
        typeSpeed: 120,
        deleteSpeed: 80,
        delaySpeed: 2000,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, x: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section
            id="home"
            className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-6 md:px-12 lg:px-8 xl:px-16 text-white pt-24 sm:pt-28 md:pt-40 lg:pt-20 gradient-bg"
        >
            {/* Left Content */}
            <motion.div 
                className="flex-1 text-center lg:text-left mt-12 sm:mt-16 md:mt-24 lg:mt-0 space-y-4 sm:space-y-6 md:space-y-10 lg:space-y-8 max-w-2xl lg:max-w-none"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <h3 className="text-lg sm:text-xl md:text-3xl lg:text-xl font-semibold tracking-wide text-gray-300">
                        Hello, I Am
                    </h3>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                        <span className="gradient-text">{text}</span>
                        <span className="text-white">
                            <Cursor cursorStyle="|" />
                        </span>
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <p className="text-base sm:text-lg md:text-2xl lg:text-lg text-gray-300 max-w-lg md:max-w-2xl lg:max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Passionate video editor crafting visually engaging stories that captivate and connect audiences through the power of visual storytelling.
                    </p>
                </motion.div>

                <motion.div 
                    className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6 lg:gap-4 pt-6 md:pt-10 lg:pt-6"
                    variants={itemVariants}
                >
                    <button
                        onClick={() => scrollToSection("services")}
                        className="group px-8 sm:px-10 md:px-16 lg:px-8 py-4 sm:py-5 md:py-8 lg:py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl md:rounded-2xl lg:rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105 outline-none focus:outline-none focus:ring-0 flex items-center justify-center gap-2 md:gap-4 lg:gap-2 text-base md:text-2xl lg:text-base whitespace-nowrap"
                        aria-label="View my work portfolio"
                    >
                        <Play className="w-5 h-5 md:w-8 md:h-8 lg:w-5 lg:h-5" />
                        View My Work
                        <ArrowRight className="w-4 h-4 md:w-7 md:h-7 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="px-8 sm:px-10 md:px-16 lg:px-8 py-4 sm:py-5 md:py-8 lg:py-4 border-2 md:border-4 lg:border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-xl md:rounded-2xl lg:rounded-xl font-semibold transition-all duration-300 hover:scale-105 outline-none focus:outline-none focus:ring-0 text-base md:text-2xl lg:text-base whitespace-nowrap"
                        aria-label="Get in touch with me"
                    >
                        Contact Me
                    </button>
                </motion.div>

                {/* Stats or additional info */}
                <motion.div 
                    className="hidden lg:flex items-center gap-6 pt-6"
                    variants={itemVariants}
                >
                    <div className="text-center">
                        <div className="text-2xl xl:text-3xl font-bold text-red-500">50+</div>
                        <div className="text-sm text-gray-400">Projects Completed</div>
                    </div>
                    <div className="w-px h-12 bg-gray-600"></div>
                    <div className="text-center">
                        <div className="text-2xl xl:text-3xl font-bold text-red-500">3+</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                    </div>
                    <div className="w-px h-12 bg-gray-600"></div>
                    <div className="text-center">
                        <div className="text-2xl xl:text-3xl font-bold text-red-500">100%</div>
                        <div className="text-sm text-gray-400">Client Satisfaction</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
                className="flex-1 flex justify-center items-center mb-12 sm:mb-16 md:mb-24 lg:mb-0"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="relative group max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-lg xl:max-w-xl">
                    {/* Animated background elements */}
                    <div className="absolute -inset-4 md:-inset-8 lg:-inset-4 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-3xl md:rounded-[3rem] lg:rounded-3xl blur-2xl md:blur-3xl lg:blur-2xl group-hover:blur-3xl md:group-hover:blur-[4rem] lg:group-hover:blur-3xl transition-all duration-700 animate-pulse"></div>
                    <div className="absolute -inset-2 md:-inset-4 lg:-inset-2 bg-red-500/20 rounded-2xl md:rounded-[2rem] lg:rounded-2xl blur-xl md:blur-2xl lg:blur-xl group-hover:blur-2xl md:group-hover:blur-3xl lg:group-hover:blur-2xl transition-all duration-500"></div>
                    
                    {/* Main image */}
                    <img
                        src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80"
                        alt="Professional video editing setup with multiple monitors and equipment"
                        className="relative z-10 rounded-2xl md:rounded-[2rem] lg:rounded-2xl shadow-2xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                    />
                    
                </div>
            </motion.div>
        </section>
    );
}
