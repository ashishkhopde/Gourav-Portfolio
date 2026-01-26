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
      }

      getcount();

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <section className="min-h-screen bg-black text-white pt-24 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-12">
        Dashboard
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div
          className="bg-[#111] border border-red-500/30 rounded-2xl p-8 w-64 text-center hover:bg-red-500/10 transition-all duration-300 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-3 text-red-500">
            Total Messages
          </h2>
          <p className="text-4xl font-bold">{messageCount}</p>
        </div>

        <div
          className="bg-[#111] border border-red-500/30 rounded-2xl p-8 w-64 text-center hover:bg-red-500/10 transition-all duration-300 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-3 text-red-500">
            Total Videos
          </h2>
          <p className="text-4xl font-bold">{videoCount}</p>
        </div>
      </div>
    </section>
  );
}
