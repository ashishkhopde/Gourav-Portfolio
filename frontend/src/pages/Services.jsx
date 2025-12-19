import React from 'react';
import { Play } from "lucide-react";
import VideoCards from '../components/VideoCards';


export default function Services() {
  return (
    <section id="services" className="min-h-screen px-6 md:px-16 text-white">

      <div className='space-y-4 md:ml-10 mt-3'>
        <h3 className="text-xs md:text-sm font-medium text-white tracking-wide uppercase flex items-center gap-2">
          <Play className="w-5 h-5 fill-red-500 stroke-none" />
          My Work
        </h3>
        <h2 className="text-xl md:text-3xl font-bold leading-tight">
          What Can I Do
        </h2>
      </div>

      <div className='mt-3'>
        <VideoCards />
      </div>
      
    </section>
  )
}
