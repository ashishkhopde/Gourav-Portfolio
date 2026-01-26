import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Send, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!message.name.trim()) {
      newErrors.name = "Name is required";
    } else if (message.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!message.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(message.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!message.message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/message`, message);
      
      if (res.data.status === "Message sent successfull") {
        toast.success("✅ Message sent successfully! I'll get back to you soon.");
        setMessage({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setMessage({ ...message, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const InputField = ({ icon: Icon, label, type, id, placeholder, value, onChange, error, ...props }) => (
    <motion.div variants={itemVariants} className="space-y-2 md:space-y-4 lg:space-y-2">
      <label htmlFor={id} className="block text-gray-200 text-sm sm:text-base md:text-xl lg:text-base font-semibold flex items-center gap-2 md:gap-4 lg:gap-2">
        <Icon className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-red-400" />
        {label}
      </label>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 md:px-8 lg:px-4 py-3 md:py-6 lg:py-3 rounded-xl md:rounded-2xl lg:rounded-xl bg-black/50 border transition-all duration-300 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 text-base md:text-xl lg:text-base ${
              error 
                ? "border-red-500 focus:border-red-500" 
                : "border-red-500/30 focus:border-red-500"
            }`}
            {...props}
          />
        ) : (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 md:px-8 lg:px-4 py-3 md:py-6 lg:py-3 rounded-xl md:rounded-2xl lg:rounded-xl bg-black/50 border transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-base md:text-xl lg:text-base ${
              error 
                ? "border-red-500 focus:border-red-500" 
                : "border-red-500/30 focus:border-red-500"
            }`}
            {...props}
          />
        )}
        {error && (
          <div className="absolute -bottom-6 md:-bottom-8 lg:-bottom-6 left-0 flex items-center gap-1 md:gap-2 lg:gap-1 text-red-400 text-sm md:text-lg lg:text-sm">
            <AlertCircle className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4" />
            {error}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section
      id="contact"
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-8 xl:px-16 py-16 md:py-24 lg:py-20 text-white bg-gradient-to-b from-black via-[#1a0000] to-black"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center lg:text-left mb-12 md:mb-20 lg:mb-16">
          <h3 className="text-sm sm:text-base md:text-xl lg:text-base font-medium text-red-400 tracking-wide uppercase flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6 lg:mb-4">
            <Play className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 fill-red-500 stroke-none" />
            Contact Me
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-8 lg:mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-2xl lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Have a project or idea in mind? I'd love to hear from you. Send me a
            message and let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-16 items-start">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8 md:space-y-12 lg:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-6 md:mb-10 lg:mb-6">Get In Touch</h3>
              <div className="space-y-4 md:space-y-6 lg:space-y-4">
                <div className="flex items-center gap-4 md:gap-6 lg:gap-4 p-4 md:p-8 lg:p-4 bg-white/5 rounded-xl md:rounded-2xl lg:rounded-xl backdrop-blur-sm border border-white/10">
                  <Mail className="w-6 h-6 md:w-10 md:h-10 lg:w-6 lg:h-6 text-red-400" />
                  <div>
                    <div className="text-sm md:text-lg lg:text-sm text-gray-400">Email</div>
                    <div className="text-white font-medium text-base md:text-xl lg:text-base">sachin@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 lg:gap-4 p-4 md:p-8 lg:p-4 bg-white/5 rounded-xl md:rounded-2xl lg:rounded-xl backdrop-blur-sm border border-white/10">
                  <Phone className="w-6 h-6 md:w-10 md:h-10 lg:w-6 lg:h-6 text-red-400" />
                  <div>
                    <div className="text-sm md:text-lg lg:text-sm text-gray-400">Phone</div>
                    <div className="text-white font-medium text-base md:text-xl lg:text-base">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg md:text-2xl lg:text-lg font-semibold text-white mb-4 md:mb-8 lg:mb-4">Why Work With Me?</h4>
              <ul className="space-y-3 md:space-y-5 lg:space-y-3 text-gray-300">
                <li className="flex items-center gap-3 md:gap-5 lg:gap-3">
                  <CheckCircle className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 text-red-400 flex-shrink-0" />
                  <span className="text-base md:text-xl lg:text-base">Professional quality guaranteed</span>
                </li>
                <li className="flex items-center gap-3 md:gap-5 lg:gap-3">
                  <CheckCircle className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 text-red-400 flex-shrink-0" />
                  <span className="text-base md:text-xl lg:text-base">Fast turnaround times</span>
                </li>
                <li className="flex items-center gap-3 md:gap-5 lg:gap-3">
                  <CheckCircle className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 text-red-400 flex-shrink-0" />
                  <span className="text-base md:text-xl lg:text-base">Unlimited revisions</span>
                </li>
                <li className="flex items-center gap-3 md:gap-5 lg:gap-3">
                  <CheckCircle className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 text-red-400 flex-shrink-0" />
                  <span className="text-base md:text-xl lg:text-base">Competitive pricing</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-[#1a0000]/90 to-black/90 backdrop-blur-md p-6 sm:p-8 md:p-16 lg:p-12 rounded-2xl md:rounded-3xl lg:rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/30 hover:shadow-red-600/50 transition-all duration-500">
              <form className="space-y-8 md:space-y-12 lg:space-y-8" onSubmit={handleSubmit}>
                <InputField
                  icon={User}
                  label="Full Name"
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={message.name}
                  onChange={(value) => handleInputChange("name", value)}
                  error={errors.name}
                  required
                />

                <InputField
                  icon={Mail}
                  label="Email Address"
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={message.email}
                  onChange={(value) => handleInputChange("email", value)}
                  error={errors.email}
                  required
                />

                <InputField
                  icon={Phone}
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={message.phone}
                  onChange={(value) => handleInputChange("phone", value)}
                  error={errors.phone}
                  required
                />

                <InputField
                  icon={MessageSquare}
                  label="Message"
                  type="textarea"
                  id="message"
                  placeholder="Tell me about your project..."
                  value={message.message}
                  onChange={(value) => handleInputChange("message", value)}
                  error={errors.message}
                  rows="6"
                  required
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition-all duration-300 text-white font-semibold py-4 md:py-8 lg:py-4 rounded-xl md:rounded-2xl lg:rounded-xl text-lg md:text-2xl lg:text-lg shadow-lg shadow-red-900/40 hover:shadow-red-700/50 flex items-center justify-center gap-3 md:gap-5 lg:gap-3 group"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 md:w-8 md:h-8 lg:w-5 lg:h-5 border-2 md:border-4 lg:border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 md:w-8 md:h-8 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}