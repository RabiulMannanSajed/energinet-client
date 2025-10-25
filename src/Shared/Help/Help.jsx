import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Help = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("userId"); // ✅ logged-in user id
  const adminId = "ADMIN_ID_HERE"; // Replace with your real admin id
  const API_URL = "http://localhost:5000/api/v1/chat";

  // ✅ Scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Fetch messages every 3 seconds
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      setMessages(res.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      senderId: userId,
      receiverId: adminId,
      message: inputMessage,
    };

    try {
      setLoading(true);
      await axios.post(API_URL, newMessage);
      setInputMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete message (only user’s own)
  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${API_URL}/${messageId}`);
        fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 border rounded-xl shadow-md bg-white">
      <div className="p-4 border-b bg-gray-100 rounded-t-xl">
        <h2 className="text-xl font-semibold text-gray-700">Help & Support</h2>
        <p className="text-sm text-gray-500">Chat directly with Admin</p>
      </div>

      {/* Chat Area */}
      <div className="p-4 h-[400px] overflow-y-auto flex flex-col space-y-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl max-w-xs ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.message}</p>
              <div className="text-[10px] text-gray-300 mt-1 text-right">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>

              {msg.senderId === userId && (
                <button
                  className="text-xs mt-1 text-red-300 hover:text-red-600"
                  onClick={() => handleDelete(msg._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="border-t flex items-center p-3 bg-gray-50 rounded-b-xl"
      >
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2 mr-3 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Help;
