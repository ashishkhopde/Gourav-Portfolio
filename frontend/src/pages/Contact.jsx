import React from "react";
import { Play } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 md:px-16 py-16 text-white bg-gradient-to-b from-black via-[#1a0000] to-black"
    >
      {/* Header */}
      <div className="space-y-4 md:ml-10 mb-12 text-center md:text-left">
        <h3 className="text-xs md:text-sm font-medium tracking-wide uppercase flex items-center justify-center md:justify-start gap-2">
          <Play className="w-5 h-5 fill-red-500 stroke-none" />
          Contact Me
        </h3>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
          Let's Work Together
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto md:mx-0 mt-2">
          Have a project or idea in mind? I’d love to hear from you. Send me a
          message and let’s create something amazing together!
        </p>
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-start">
        <div className="w-full max-w-xl bg-gradient-to-br from-[#1a0000]/90 to-black/90 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/30 hover:shadow-red-600/50 transition-all duration-500">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-200 mb-2 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-red-500/30 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300 text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-200 mb-2 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-red-500/30 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300 text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-200 mb-2 font-semibold"
              >
                Phone No.
              </label>
              <input
                type="phone"
                id="phone"
                placeholder="Your Phone Number"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-red-500/30 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300 text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-200 mb-2 font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-red-500/30 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300 text-white placeholder-gray-400 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl text-lg shadow-lg shadow-red-900/40 hover:shadow-red-700/50"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
