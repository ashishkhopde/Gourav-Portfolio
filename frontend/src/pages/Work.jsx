import React from 'react';
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import VideoCards from '../components/VideoCards';

export default function Work() {
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
    <section id="work" className="min-h-screen px-4 py-20 text-white sm:px-6 md:px-12 lg:px-8 xl:px-16 md:py-32 lg:py-24">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center lg:text-left md:mb-24 lg:mb-20">
          <h3 className="flex items-center justify-center gap-2 mb-4 text-sm font-medium tracking-wide text-red-400 uppercase sm:text-base md:text-xl lg:text-base lg:justify-start md:mb-6 lg:mb-4">
            <Play className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 fill-red-500 stroke-none" />
            My Work
          </h3>
          <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-7xl lg:text-5xl xl:text-6xl md:mb-10 lg:mb-6">
            Projects I Work With
          </h2>
        </motion.div>

        {/* Video Portfolio */}
        <motion.div variants={itemVariants} className="pb-8 md:pb-16 lg:pb-8">
          <VideoCards />
        </motion.div>
      </motion.div>
    </section>
  )
}
