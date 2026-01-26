import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Dashboard() {
  const [messageCount, setMessageCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);

  useEffect(()=>{
    try {
      const getcount = async () => {
        const message = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/count`, {
          withCredentials: true,
        });
        setMessageCount(message.data.totalMessages);

        const videos = await axios.get(`${import.meta.env.VITE_BASE_URL}/video/count`, {
          withCredentials: true,
        });
        setVideoCount(videos.data.totalVideos);
      }

      getcount();

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <section className="min-h-screen px-6 pt-24 text-white bg-black md:px-20">
      <h1 className="mb-12 text-4xl font-bold text-center text-red-500">
        Dashboard
      </h1>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div
          className="bg-[#111] border border-red-500/30 rounded-2xl p-8 w-64 text-center hover:bg-red-500/10 transition-all duration-300 shadow-lg"
        >
          <h2 className="mb-3 text-xl font-semibold text-red-500">
            Total Messages
          </h2>
          <p className="text-4xl font-bold">{messageCount}</p>
        </div>

        <div
          className="bg-[#111] border border-red-500/30 rounded-2xl p-8 w-64 text-center hover:bg-red-500/10 transition-all duration-300 shadow-lg"
        >
          <h2 className="mb-3 text-xl font-semibold text-red-500">
            Total Videos
          </h2>
          <p className="text-4xl font-bold">{videoCount}</p>
        </div>
      </div>
    </section>
  );
}
