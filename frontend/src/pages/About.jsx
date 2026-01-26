import { motion } from "framer-motion";
import { Play, Award, Users, Clock } from "lucide-react";
import Console from "../assets/edioterConsole.png"

export default function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.3
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
        hidden: { opacity: 0, scale: 0.8, x: -50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const skills = [
        { name: "Video Editing", level: 95 },
        { name: "Motion Graphics", level: 85 },
        { name: "Color Grading", level: 90 },
        { name: "Audio Mixing", level: 80 }
    ];

    const achievements = [
        { icon: Award, title: "Professional Certified", desc: "Adobe Premiere Pro" },
        { icon: Users, title: "50+ Happy Clients", desc: "Worldwide" },
        { icon: Clock, title: "3+ Years", desc: "Experience" }
    ];

    return (
        <section
            id="about"
            className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-12 lg:px-8 xl:px-16 text-white py-16 md:py-24 lg:py-16"
        >
            {/* Left Image */}
            <motion.div 
                className="flex-1 flex justify-center items-center mb-12 md:mb-20 lg:mb-0 lg:pr-8"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="relative group max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-lg xl:max-w-xl">
                    {/* Animated background elements */}
                    <div className="absolute -inset-4 md:-inset-8 lg:-inset-4 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-3xl md:rounded-[3rem] lg:rounded-3xl blur-2xl md:blur-3xl lg:blur-2xl group-hover:blur-3xl md:group-hover:blur-[4rem] lg:group-hover:blur-3xl transition-all duration-700"></div>
                    <div className="absolute -inset-2 md:-inset-4 lg:-inset-2 bg-red-500/20 rounded-2xl md:rounded-[2rem] lg:rounded-2xl blur-xl md:blur-2xl lg:blur-xl group-hover:blur-2xl md:group-hover:blur-3xl lg:group-hover:blur-2xl transition-all duration-500"></div>
                    
                    {/* Main image */}
                    <img
                        src={Console}
                        alt="Professional video editing console and workspace setup"
                        className="relative z-10 rounded-2xl md:rounded-[2rem] lg:rounded-2xl shadow-2xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />

                </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
                className="flex-1 text-center lg:text-left space-y-6 md:space-y-10 lg:space-y-8 max-w-2xl lg:max-w-none mt-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={itemVariants}>
                    <h3 className="text-sm sm:text-base md:text-xl lg:text-base font-medium text-red-400 tracking-wide uppercase flex items-center justify-center lg:justify-start gap-2 mb-2 md:mb-4 lg:mb-2">
                        <Play className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 fill-red-500 stroke-none" />
                        About Me
                    </h3>
                    <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                        Who Am I
                    </h2>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <p className="text-gray-300 text-base sm:text-lg md:text-2xl lg:text-xl leading-relaxed">
                        I'm a passionate <span className="text-red-400 font-semibold">video editor</span> who transforms
                        raw footage into visually engaging stories that connect with people emotionally.
                        I specialize in crafting impactful visuals that enhance brand storytelling and audience engagement.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <p className="text-gray-400 text-sm sm:text-base md:text-xl lg:text-lg leading-relaxed">
                        With over 3 years of experience in the industry, I've worked with diverse clients ranging from 
                        small businesses to content creators, helping them bring their vision to life through the power of video.
                    </p>
                </motion.div>

                {/* Skills */}
                {/* <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 lg:space-y-4">
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-white">Skills & Expertise</h4>
                    <div className="space-y-3 md:space-y-5 lg:space-y-3">
                        {skills.map((skill, index) => (
                            <div key={index} className="space-y-1 md:space-y-2 lg:space-y-1">
                                <div className="flex justify-between text-sm md:text-lg lg:text-sm">
                                    <span className="text-gray-300">{skill.name}</span>
                                    <span className="text-red-400">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 md:h-4 lg:h-2">
                                    <motion.div
                                        className="bg-gradient-to-r from-red-500 to-red-400 h-2 md:h-4 lg:h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div> */}

                {/* Achievements */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-4 pt-4 md:pt-8 lg:pt-4">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="text-center lg:text-left p-4 md:p-8 lg:p-4 bg-white/5 rounded-xl md:rounded-2xl lg:rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300">
                            <achievement.icon className="w-8 h-8 md:w-12 md:h-12 lg:w-8 lg:h-8 text-red-500 mx-auto lg:mx-0 mb-2 md:mb-4 lg:mb-2" />
                            <div className="text-sm md:text-lg lg:text-sm font-semibold text-white">{achievement.title}</div>
                            <div className="text-xs md:text-base lg:text-xs text-gray-400">{achievement.desc}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}