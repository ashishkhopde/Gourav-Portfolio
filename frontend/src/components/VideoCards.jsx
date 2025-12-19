import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoCards() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    { id: 1, title: "Promo Reel", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "Behind The Scenes", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 3, title: "Showreel 2025", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "VFX Breakdown", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 5, title: "Commercial Ad", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 6, title: "Cinematic Trailer", src: "https://www.w3schools.com/html/movie.mp4" },
  ];

  return (
    <div className="min-h-screen bg-black text-red-600 px-8 py-12">

      {/* Grid Layout — 3 Cards per Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer bg-red-600 text-white rounded-2xl overflow-hidden shadow-xl hover:bg-red-700 hover:shadow-red-400/40 transition-all duration-300"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="aspect-video bg-red-500 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">{video.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)} // click outside closes
          >
            <motion.div
              key="modal"
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // prevent closing on modal click
            >
              {/* ✅ Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(null);
                }}
                className="absolute top-4 right-4 bg-red-600 p-3 rounded-full hover:bg-red-700 transition z-50 cursor-pointer"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* 🎬 Responsive Full-Screen Video */}
              <video
                key={selectedVideo.id}
                src={selectedVideo.src}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent py-3 text-center font-semibold text-white text-lg">
                {selectedVideo.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
