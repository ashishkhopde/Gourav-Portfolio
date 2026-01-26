import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black via-[#0a0000] to-black border-t border-red-500/20 text-white py-8 md:py-16 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10 lg:space-y-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-3xl font-bold text-white tracking-wide">
              <span className="text-red-500">S</span>achin
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-center max-w-md text-sm sm:text-base md:text-xl lg:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Passionate video editor crafting visually engaging stories that captivate and connect audiences.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="w-24 md:w-32 lg:w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          {/* Copyright */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 lg:gap-2 text-gray-500 text-sm md:text-lg lg:text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span>© {currentYear} Sachin. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 md:gap-2 lg:gap-1">
              Made with <Heart className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-red-500 fill-red-500" /> for great videos
            </span>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="group mt-4 md:mt-8 lg:mt-4 p-3 md:p-5 lg:p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-full transition-all duration-300 hover:scale-110"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 md:w-8 md:h-8 lg:w-5 lg:h-5 text-red-400 group-hover:text-red-300 transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}