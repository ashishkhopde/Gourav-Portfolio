import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Plus, Upload, Loader2, Trash2 } from "lucide-react";
import axios from "axios";

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "" });
  const [coverImage, setCoverImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch videos
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

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle Add Video
  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.title || !coverImage || !videoFile) {
      return alert("Please fill all fields and upload files");
    }

    const formData = new FormData();
    formData.append("title", newVideo.title);
    formData.append("coverImage", coverImage);
    formData.append("videoLink", videoFile);

    try {
      setUploading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/video`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setVideos((prev) => [...prev, res.data.video]);
        setShowAddModal(false);
        setNewVideo({ title: "" });
        setCoverImage(null);
        setVideoFile(null);
      } else {
        alert(res.data.message || "Failed to upload video");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading video");
    } finally {
      setUploading(false);
    }
  };

  // Handle Delete Video
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/video/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
      } else {
        alert(res.data.message || "Failed to delete video");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting video");
    } finally {
      setDeleting(false);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="overflow-hidden bg-gray-800/50 rounded-xl animate-pulse">
          <div className="aspect-[4/3] bg-gray-700"></div>
          <div className="p-4 space-y-2">
            <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen px-6 pt-24 pb-12 text-white bg-black md:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-red-500 md:text-4xl">Videos</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all bg-red-600 rounded-lg shadow-lg hover:bg-red-700"
        >
          <Plus size={18} /> Add Video
        </button>
      </div>

      {/* States */}
      {loading && <LoadingSkeleton />}
      {error && (
        <motion.div className="py-12 text-center">
          <div className="max-w-md p-6 mx-auto border bg-red-500/10 border-red-500/30 rounded-xl">
            <div className="mb-2 text-lg font-semibold text-red-400">Oops! Something went wrong</div>
            <p className="mb-4 text-gray-400">{error}</p>
            <button
              onClick={() => fetchVideos()}
              className="px-5 py-2 text-sm transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {!loading && !error && videos.length === 0 && (
        <motion.div className="py-12 text-center">
          <Play className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">No videos found. Upload one!</p>
        </motion.div>
      )}

      {/* Video Grid */}
      {!loading && !error && videos.length > 0 && (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {videos.map((video) => (
            <motion.div
              key={video._id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden transition-all border cursor-pointer group bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl hover:shadow-red-500/20 border-gray-700/50 hover:border-red-500/30"
            >
              {/* Trash Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(video._id);
                }}
                className="absolute z-20 p-2 text-white transition rounded-full top-2 right-2 bg-red-600/70 hover:bg-red-700"
                disabled={deleting}
              >
                <Trash2 size={18} />
              </button>

              <div
                className="aspect-[4/3] relative overflow-hidden"
                onClick={() => setSelectedVideo(video)}
              >
                <img
                  src={
                    video.coverImage?.includes("/upload/")
                      ? video.coverImage.replace("/upload/", "/upload/f_auto,q_auto,w_600/")
                      : video.coverImage
                  }
                  alt={video.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                  <div className="p-3 rounded-full bg-red-500/90">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold truncate transition-colors group-hover:text-red-400">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400">Click to watch</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden bg-black shadow-2xl rounded-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute p-2 transition rounded-full top-3 right-3 bg-black/80 hover:bg-red-600"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center justify-center bg-black">
                <video
                  key={selectedVideo._id}
                  src={selectedVideo.videoLink}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Video Modal (unchanged) */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] p-6 rounded-2xl w-[90%] max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute text-gray-400 top-3 right-3 hover:text-red-500"
              >
                <X size={22} />
              </button>
              <h2 className="mb-4 text-xl font-bold text-center text-red-500">Add New Video</h2>

              <form onSubmit={handleAddVideo} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm text-gray-300">Title</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ title: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-white bg-black border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">Cover Image</label>
                  <label
                    htmlFor="coverImage"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 rounded-lg cursor-pointer hover:bg-red-700"
                  >
                    <Upload size={16} /> Choose Image
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                  {coverImage && <p className="mt-1 text-xs text-gray-400">📸 {coverImage.name}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">Video File</label>
                  <label
                    htmlFor="videoFile"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 rounded-lg cursor-pointer hover:bg-red-700"
                  >
                    <Upload size={16} /> Choose Video
                  </label>
                  <input
                    type="file"
                    id="videoFile"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                  {videoFile && <p className="mt-1 text-xs text-gray-400">🎬 {videoFile.name}</p>}
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                >
                  {uploading ? <Loader2 className="inline-block animate-spin" /> : "Add Video"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
