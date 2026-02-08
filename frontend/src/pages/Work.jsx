import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import VideoCards from '../components/VideoCards';
import api from "../config/api";

export default function Work() {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [catError, setCatError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCats(true);
        setCatError(null);
        const res = await api.get("/category");
        const list = res.data?.categories || [];
        setCategories(list);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCatError("Failed to load categories.");
      } finally {
        setLoadingCats(false);
      }
    };

    fetchCategories();
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
    <section id="work" className="min-h-screen px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12 lg:py-28 xl:px-16">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center sm:mb-14 md:mb-20 lg:mb-16 lg:text-left">
          <h3 className="flex items-center justify-center gap-2 mb-3 text-sm font-medium tracking-wide text-red-400 uppercase sm:text-base sm:mb-4 md:text-lg md:mb-5 lg:text-base lg:mb-4 lg:justify-start">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 fill-red-500 stroke-none" />
            My Work
          </h3>
          <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl sm:mb-5 md:text-5xl md:mb-8 lg:text-4xl lg:mb-6 xl:text-5xl">
            Projects I Work With
          </h2>
        </motion.div>

        {/* Categories Nav */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-10 md:mb-12 lg:mb-10">
          {loadingCats && <p className="text-sm text-gray-400 sm:text-base md:text-lg lg:text-base">Loading categories...</p>}
          {!loadingCats && catError && <p className="text-sm text-red-400 sm:text-base md:text-lg lg:text-base">{catError}</p>}
          {!loadingCats && !catError && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide sm:gap-4 md:gap-5 lg:gap-4">
              <button
                className={`px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition outline-none focus:outline-none focus:ring-0 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg lg:px-6 lg:py-3 lg:text-base whitespace-nowrap flex-shrink-0 ${
                  activeCategory === "All"
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-red-500 text-gray-200 hover:bg-red-500/10 hover:border-red-400"
                }`}
                onClick={() => setActiveCategory("All")}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition outline-none focus:outline-none focus:ring-0 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg lg:px-6 lg:py-3 lg:text-base whitespace-nowrap flex-shrink-0 ${
                    activeCategory === cat.category
                      ? "bg-red-600 border-red-600 text-white"
                      : "border-red-500 text-gray-200 hover:bg-red-500/10 hover:border-red-400"
                  }`}
                  onClick={() => setActiveCategory(cat.category)}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Video Portfolio */}
        <motion.div variants={itemVariants} className="pb-6 sm:pb-8 md:pb-12 lg:pb-8">
          <VideoCards category={activeCategory} />
        </motion.div>
      </motion.div>
    </section>
  )
}
