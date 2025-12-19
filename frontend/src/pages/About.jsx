import React from "react";
import { Play } from "lucide-react";

export default function About() {
    return (
        <section
            id="about"
            className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 text-white"
        >
            {/* Left Image */}
            <div className="flex-1 flex justify-center items-center mb-10 md:mb-0">
                <div className="relative group">
                    {/* Glow effect behind image */}
                    <div className="absolute -inset-2 bg-red-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <img
                        src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80"
                        alt="Video Editing Setup"
                        className="relative z-10 rounded-2xl shadow-2xl w-[320px] md:w-[600px] object-cover"
                    />
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 md:text-left space-y-6 md:pl-12">
                <h3 className="text-xs md:text-sm font-medium text-white tracking-wide uppercase flex items-center gap-2">
                    <Play className="w-5 h-5 fill-red-500 stroke-none" />
                    About Me
                </h3>



                <h2 className="text-xl md:text-3xl font-bold leading-tight">
                    Who Am I
                </h2>

                <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                    I’m a passionate <span className="text-red-400 font-medium">video editor</span> who turns
                    raw footage into visually engaging stories that connect with people emotionally.
                    I specialize in crafting impactful visuals that enhance brand storytelling and audience engagement.
                </p>

            </div>
        </section>
    );
}
