import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chatbot.css";
import { ShopContext } from "../context/ShopContext";
import { axiosConfig } from "../utils/apiFunction";
import { parseApiData } from "../../utils/apiData";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(ShopContext);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Function to call your backend API
  const callBackendAPI = async (userMessage) => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.post(`/chat-box/${userId}/process`, {
        userId: userId,
        userMessage: userMessage,
      });

      if (response.data && response.data.responseType === "SUCCESS") {
        const parsedData = parseApiData(response.data, {});
        return parsedData.botResponse;
      } else {
        console.error("API response error:", response.data);
        return "Xin lỗi, tôi đang gặp sự cố khi xử lý câu hỏi của bạn.";
      }
    } catch (error) {
      console.error("Error calling backend API:", error);
      return "Xin lỗi, đã xảy ra lỗi khi kết nối với dịch vụ AI.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { text: newMessage, sender: "user" }]);
    const userQuery = newMessage;
    setNewMessage("");

    // Call backend API for a response
    const botResponse = await callBackendAPI(userQuery);
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div
        className={`chatbot-floating-icon ${isOpen ? "hidden" : ""}`}
        onClick={toggleChatbot}
      >
        <div className="bot-icon">💬</div>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-container">
            <div className="chatbot-header">
              <div className="chatbot-icon">
                <div className="bot-icon">🤖</div>
              </div>
              <div className="chatbot-title">AI Assistant</div>
              <div className="chatbot-close" onClick={toggleChatbot}>
                ✕
              </div>
            </div>

            <div className="chatbot-body">
              <div className="messages-container">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="bot-avatar">
                        <div className="bot-icon-small">🤖</div>
                      </div>
                    )}
                    <div className="message-bubble">{message.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot-message">
                    <div className="bot-avatar">
                      <div className="bot-icon-small">🤖</div>
                    </div>
                    <div className="message-bubble typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                className="message-input-container"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="message-input"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="send-button"
                  disabled={isLoading || newMessage.trim() === ""}
                >
                  <span>➤</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
