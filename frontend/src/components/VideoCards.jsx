import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

export default function VideoCards() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy fallback videos (if API fails)
  // const fallbackVideos = [
  //   {
  //     _id: 1,
  //     title: "Promo Reel",
  //     coverImage:
  //       "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80",
  //     videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",
  //   },
  //   {
  //     _id: 2,
  //     title: "Behind The Scenes",
  //     coverImage:
  //       "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?auto=format&fit=crop&w=800&q=80",
  //     videoLink: "https://www.w3schools.com/html/movie.mp4",
  //   },
  //   {
  //     _id: 3,
  //     title: "Showreel 2025",
  //     coverImage:
  //       "https://images.unsplash.com/photo-1607082349566-187342de1235?auto=format&fit=crop&w=800&q=80",
  //     videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",
  //   },
  // ];

  // Fetch videos from backend API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/video`, {
          withCredentials: true,
        });
        setVideos(res.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-red-600 px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-12">
        Videos
      </h1>

      {/* Loader */}
      {loading ? (
        <p className="text-center text-gray-400">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400">No videos found.</p>
      ) : (
        // ✅ Grid Layout — 3 Cards per Row
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video._id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-red-600 text-white rounded-2xl overflow-hidden shadow-xl hover:bg-red-700 hover:shadow-red-400/40 transition-all duration-300"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-video relative">
                <img
                  src={
                    video.coverImage?.includes("/upload/")
                      ? video.coverImage.replace(
                          "/upload/",
                          "/upload/f_auto,q_auto/"
                        )
                      : video.coverImage
                  }
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">
                    {video.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ Popup Modal — Original Aspect Ratio */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              key="modal"
              className="relative w-full max-w-6xl rounded-2xl overflow-hidden flex items-center justify-center bg-black"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
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

              {/* Video Player */}
              <div className="flex items-center justify-center w-full h-full bg-black">
                <video
                  key={selectedVideo._id}
                  src={selectedVideo.videoLink}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-2xl object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
