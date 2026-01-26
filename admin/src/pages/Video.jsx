import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Upload } from "lucide-react";
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


  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/video`, {
          withCredentials: true,
        });
        setVideos(res.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

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

  return (
    <section className="min-h-screen bg-black text-white pt-24 px-6 md:px-20 relative">
      {/* Header with Add Video Button */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-red-500">Videos</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300"
        >
          <Plus size={20} /> Add Video
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-400">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400">No videos found.</p>
      ) : (
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
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">
                    {video.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Player Modal (Preserve Aspect Ratio) */}
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

              {/* ✅ Preserve Aspect Ratio */}
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

      {/* Add Video Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] p-8 rounded-2xl w-[90%] max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
                Add New Video
              </h2>

              <form onSubmit={handleAddVideo} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, title: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter video title"
                  />
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-gray-300 mb-2">Cover Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="coverImage"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setCoverImage(e.target.files[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor="coverImage"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg cursor-pointer text-white font-medium transition-all duration-300 shadow-md"
                    >
                      <Upload size={18} /> Choose Cover Image
                    </label>
                    {coverImage && (
                      <p className="mt-2 text-gray-400 text-sm truncate">
                        📸 {coverImage.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Video File Upload */}
                <div>
                  <label className="block text-gray-300 mb-2">Video File</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="videoFile"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor="videoFile"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg cursor-pointer text-white font-medium transition-all duration-300 shadow-md"
                    >
                      <Upload size={18} /> Choose Video File
                    </label>
                    {videoFile && (
                      <p className="mt-2 text-gray-400 text-sm truncate">
                        🎬 {videoFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
                >
                  {uploading ? "Uploading..." : "Add Video"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
