import React, { useEffect, useState } from "react";
import api from "../config/api";
import { Trash2 } from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/message");
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Delete message function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await api.delete(`/message/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message. Make sure you are logged in.");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white pt-24 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-12">Messages</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-400">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-[#111] border border-red-500/30 rounded-2xl p-6 hover:bg-red-500/10 transition-all duration-300 shadow-lg relative"
            >
              {/* Trash icon at top right */}
              <Trash2
                className="absolute top-4 right-4 text-red-500 cursor-pointer hover:text-red-600"
                size={20}
                onClick={() => handleDelete(msg._id)}
              />

              <h2 className="text-xl font-semibold mb-2 text-red-500">{msg.name}</h2>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold">Email:</span> {msg.email}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Phone:</span> {msg.phone}
              </p>
              <p className="text-gray-200">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
