import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Loader2 } from "lucide-react";
import axios from "axios";

export default function VideoCards() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos from backend API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/video`, {
          withCredentials: true,
        });
        setVideos(res.data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-10">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-gray-800/50 rounded-2xl md:rounded-3xl lg:rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-gray-700"></div>
          <div className="p-5 sm:p-6 md:p-12 lg:p-7 space-y-3 md:space-y-5 lg:space-y-3">
            <div className="h-5 md:h-8 lg:h-5 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 md:h-6 lg:h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="text-white px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

      {/* Loading State */}
      {loading && <LoadingSkeleton />}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-red-400 text-lg font-semibold mb-2">Oops! Something went wrong</div>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
            <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <div className="text-gray-300 text-lg font-semibold mb-2">No Videos Yet</div>
            <p className="text-gray-500">Check back soon for new video content!</p>
          </div>
        </motion.div>
      )}

      {/* Videos Grid */}
      {!loading && !error && videos.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {videos.map((video) => (
            <motion.div
              key={video._id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl lg:rounded-2xl overflow-hidden shadow-xl hover:shadow-red-500/20 border border-gray-700/50 hover:border-red-500/30 transition-all duration-300"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={
                    video.coverImage?.includes("/upload/")
                      ? video.coverImage.replace(
                          "/upload/",
                          "/upload/f_auto,q_auto,w_800/"
                        )
                      : video.coverImage
                  }
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 md:bottom-8 lg:bottom-4 left-4 md:left-8 lg:left-4 right-4 md:right-8 lg:right-4">
                    <h3 className="text-white font-semibold text-base sm:text-lg md:text-2xl lg:text-lg truncate">
                      {video.title}
                    </h3>
                  </div>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-500/90 backdrop-blur-sm rounded-full p-4 sm:p-5 md:p-8 lg:p-5 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-10 lg:h-10 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6 md:p-12 lg:p-7">
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-3xl lg:text-xl mb-2 md:mb-4 lg:mb-2 truncate group-hover:text-red-400 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-xl lg:text-base">Click to watch</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              key="modal"
              className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-black shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(null);
                }}
                className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm p-3 rounded-full hover:bg-red-600 transition-colors z-50 group"
                aria-label="Close video"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Video Title */}
              <div className="absolute top-4 left-4 z-50">
                <h3 className="text-white font-semibold text-lg sm:text-xl bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                  {selectedVideo.title}
                </h3>
              </div>

              {/* Video Player */}
              <div className="flex items-center justify-center w-full bg-black">
                <video
                  key={selectedVideo._id}
                  src={selectedVideo.videoLink}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-2xl"
                  onError={(e) => {
                    console.error("Video failed to load:", e);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
