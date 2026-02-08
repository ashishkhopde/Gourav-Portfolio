import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Loader2 } from "lucide-react";
import api from "../config/api";

export default function VideoCards({ category = "All" }) {
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
        const res = await api.get("/video");
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-8 md:gap-12 lg:gap-10">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="overflow-hidden bg-gray-800/50 rounded-2xl md:rounded-3xl lg:rounded-2xl animate-pulse">
          <div className="aspect-[4/3] bg-gray-700"></div>
          <div className="p-5 space-y-3 sm:p-6 md:p-12 lg:p-7 md:space-y-5 lg:space-y-3">
            <div className="w-3/4 h-5 bg-gray-700 rounded md:h-8 lg:h-5"></div>
            <div className="w-1/2 h-4 bg-gray-700 rounded md:h-6 lg:h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const filteredVideos =
    category && category !== "All"
      ? videos.filter((video) => video.category === category)
      : videos;

  return (
    <div className="px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-12">

      {/* Loading State */}
      {loading && <LoadingSkeleton />}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center"
        >
          <div className="max-w-md p-8 mx-auto border bg-red-500/10 border-red-500/30 rounded-2xl">
            <div className="mb-2 text-lg font-semibold text-red-400">Oops! Something went wrong</div>
            <p className="mb-4 text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 text-white transition-colors duration-300 bg-red-500 rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center"
        >
          <div className="max-w-md p-8 mx-auto border border-gray-700 bg-gray-800/50 rounded-2xl">
            <Play className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <div className="mb-2 text-lg font-semibold text-gray-300">No Videos Yet</div>
            <p className="text-gray-500">
              {category && category !== "All"
                ? `No videos found in ${category}.`
                : "Check back soon for new video content!"}
            </p>
          </div>
        </motion.div>
      )}

      {/* Videos Grid */}
      {!loading && !error && filteredVideos.length > 0 && (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-8 md:gap-12 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredVideos.map((video) => (
            <motion.div
              key={video._id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="overflow-hidden transition-all duration-300 border shadow-xl cursor-pointer group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl lg:rounded-2xl hover:shadow-red-500/20 border-gray-700/50 hover:border-red-500/30"
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
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-100">
                  <div className="absolute bottom-4 md:bottom-8 lg:bottom-4 left-4 md:left-8 lg:left-4 right-4 md:right-8 lg:right-4">
                    <h3 className="text-base font-semibold text-white truncate sm:text-lg md:text-2xl lg:text-lg">
                      {video.title}
                    </h3>
                  </div>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="p-4 transition-transform duration-300 transform scale-75 rounded-full bg-red-500/90 backdrop-blur-sm sm:p-5 md:p-8 lg:p-5 group-hover:scale-100">
                    <Play className="w-8 h-8 text-white sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-10 lg:h-10 fill-white" />
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6 md:p-12 lg:p-7">
                <h3 className="mb-2 text-lg font-semibold text-white truncate transition-colors duration-300 sm:text-xl md:text-3xl lg:text-xl md:mb-4 lg:mb-2 group-hover:text-red-400">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400 sm:text-base md:text-xl lg:text-base">Click to watch</p>
                  {video.category && (
                    <span className="px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/30 rounded-full bg-red-500/10 sm:text-sm md:text-base lg:text-sm md:px-4 md:py-2 lg:px-3 lg:py-1">
                      {video.category}
                    </span>
                  )}
                </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              key="modal"
              className="relative w-full max-w-6xl overflow-hidden bg-black shadow-2xl rounded-2xl"
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
                className="absolute z-50 p-3 transition-colors rounded-full top-4 right-4 bg-black/80 backdrop-blur-sm hover:bg-red-600 group"
                aria-label="Close video"
              >
                <X className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" />
              </button>

              {/* Video Title */}
              <div className="absolute z-50 flex flex-col gap-2 top-4 left-4 sm:flex-row sm:items-center">
                <h3 className="px-4 py-2 text-lg font-semibold text-white rounded-lg sm:text-xl bg-black/80 backdrop-blur-sm">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.category && (
                  <span className="px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/30 rounded-full w-fit bg-black/80 backdrop-blur-sm sm:text-sm">
                    {selectedVideo.category}
                  </span>
                )}
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
