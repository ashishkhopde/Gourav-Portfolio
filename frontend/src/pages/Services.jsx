import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import api from "../config/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/services");
        setServices(res.data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="px-4 py-16 text-white sm:px-6 md:px-12 lg:px-8 xl:px-16 md:py-20 lg:py-16">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center lg:text-left md:mb-24 lg:mb-20">
          <h3 className="flex items-center justify-center gap-2 mb-4 text-sm font-medium tracking-wide text-red-400 uppercase sm:text-base md:text-xl lg:text-base lg:justify-start md:mb-6 lg:mb-4">
            <Play className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 fill-red-500 stroke-none" />
            My Services
          </h3>
          <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-7xl lg:text-5xl xl:text-6xl md:mb-10 lg:mb-6">
            What Can I Do
          </h2>
          <p className="max-w-3xl mx-auto text-base leading-relaxed text-gray-400 sm:text-lg md:text-2xl lg:text-xl lg:mx-0">
            Explore my portfolio of video editing projects, from promotional content to creative storytelling. 
            Each project showcases my passion for visual excellence and attention to detail.
          </p>
        </motion.div>

        {/* Services List */}
        <motion.div variants={itemVariants} className="pb-8 md:pb-16 lg:pb-8">
          {loading && <p className="text-center text-gray-400">Loading services...</p>}
          {!loading && error && <p className="text-center text-red-400">{error}</p>}
          {!loading && !error && services.length === 0 && (
            <p className="text-center text-gray-400">No services found.</p>
          )}
          {!loading && !error && services.length > 0 && (
            <ul className="max-w-3xl space-y-3 text-base sm:text-lg text-left">
              {services.map((service) => (
                <li
                  key={service._id}
                  className="flex items-start gap-3 text-gray-200"
                >
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-red-500"></span>
                  <span>{service.serviceName}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
