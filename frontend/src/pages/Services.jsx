import React from 'react';
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import VideoCards from '../components/VideoCards';

export default function Services() {
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

  return (
    <section id="services" className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-8 xl:px-16 text-white py-20 md:py-32 lg:py-24">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center lg:text-left mb-16 md:mb-24 lg:mb-20">
          <h3 className="text-sm sm:text-base md:text-xl lg:text-base font-medium text-red-400 tracking-wide uppercase flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6 lg:mb-4">
            <Play className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 fill-red-500 stroke-none" />
            My Work
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 md:mb-10 lg:mb-6">
            What Can I Do
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-2xl lg:text-xl max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            Explore my portfolio of video editing projects, from promotional content to creative storytelling. 
            Each project showcases my passion for visual excellence and attention to detail.
          </p>
        </motion.div>

        {/* Video Portfolio */}
        <motion.div variants={itemVariants} className="pb-8 md:pb-16 lg:pb-8">
          <VideoCards />
        </motion.div>
      </motion.div>
    </section>
  )
}
