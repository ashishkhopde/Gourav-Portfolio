import videoModel from "../models/video.model.js"
import { uploadOnCloudinary } from "../utils/cloudnary.js";

export const getAllVideos = async (req, res) => {
    try {
        const videos = await videoModel.find({});
        return res.json({ videos });
    } catch (error) {
        console.error("Error counting messages:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export const addVideo = async (req, res) => {
    try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    // Check if files exist
    if (!req.files || !req.files.coverImage || !req.files.videoLink) {
      return res.status(400).json({ success: false, message: "Both files are required" });
    }

    // Get file paths
    const coverImagePath = req.files.coverImage[0].path;
    const videoFilePath = req.files.videoLink[0].path;

    // Upload both to Cloudinary
    const coverUpload = await uploadOnCloudinary(coverImagePath);
    const videoUpload = await uploadOnCloudinary(videoFilePath);

    // Save in MongoDB
    const newVideo = await videoModel.create({
      title,
      coverImage: coverUpload.secure_url,
      videoLink: videoUpload.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error in addVideo:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading video",
      error: error.message,
    });
  }
}

