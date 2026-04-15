"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const chatEndRef = useRef(null);

  // 🔥 auto scroll xuống cuối
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMsg = { role: "bot", text: data.reply };

      setChat((prev) => [...prev, botMsg]);
      setMessage("");
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Lỗi kết nối AI" },
      ]);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 10,
        padding: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        fontSize: 14,
        zIndex: 1000,
      }}
    >
      {/* CHAT BODY */}
      <div
        style={{
          height: 250,
          overflowY: "auto",
          marginBottom: 10,
          
        }}
      >
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              textAlign: c.role === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 10px",
                borderRadius: 10,
                background: c.role === "user" ? "#000" : "#f1f1f1",
                color: c.role === "user" ? "#fff" : "#000",
                maxWidth: "90%",
              }}
            >
              {c.role === "bot" ? (
                // 🔥 FIX: render HTML từ AI
                <div
                  dangerouslySetInnerHTML={{ __html: c.text }}
                />
              ) : (
                c.text
              )}
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <input
        className="form-control"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Hỏi về sản phẩm..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button
        className="btn btn-dark w-100 mt-2"
        onClick={sendMessage}
      >
        Gửi
      </button>
    </div>
  );
}