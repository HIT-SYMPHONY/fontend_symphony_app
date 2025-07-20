import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";

const MessageMain = ({ selectedRoom }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
    { text: "xin chao ban", isMyMessage: true },
    { text: "no", isMyMessage: false },
    {
      text: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      isMyMessage: true,
    },
  ]);

  const chatBodyRef = useRef(null);
  const isUserAtBottom = useRef(true);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue, isMyMessage: false }]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Theo dõi vị trí cuộn của người dùng
  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (!chatBody) return;

    const handleScroll = () => {
      // Kiểm tra xem người dùng có đang ở gần cuối danh sách không
      const isAtBottom =
        chatBody.scrollHeight - chatBody.scrollTop - chatBody.clientHeight < 50;
      isUserAtBottom.current = isAtBottom;
    };

    chatBody.addEventListener("scroll", handleScroll);
    return () => chatBody.removeEventListener("scroll", handleScroll);
  }, []);

  // Cuộn xuống cuối khi có tin nhắn mới, nếu người dùng ở gần cuối
  useEffect(() => {
    if (chatBodyRef.current && isUserAtBottom.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {selectedRoom.style === 0 ? (
        <h2>Hãy Chọn lớp !</h2>
      ) : (
        <>
          <div className="chatroom__right__start">
            <div className="chatroom__right__start__img">
              {selectedRoom.style === 1 ? (
                ""
              ) : (
                <i className="fa-solid fa-circle"></i>
              )}
            </div>
            <div className="chatroom__right__start__span">
              <h4>{selectedRoom.name || "Chọn một phòng chat"}</h4>
              <span>{selectedRoom.state || "Không có trạng thái"}</span>
            </div>
          </div>
          <hr />
          <div className="chatroom__right__body" ref={chatBodyRef}>
            {messages.map((item, index) => (
              <div
                className={item.isMyMessage ? "bodyleft" : "bodyright"}
                key={index}
              >
                {item.isMyMessage ? (
                  <>
                    <div className="bodyleft__img"></div>
                    <p className="bodyleft__p">{item.text}</p>
                  </>
                ) : (
                  <>
                    <p className="bodyright__p">{item.text}</p>
                    <div className="bodyright__img"></div>
                  </>
                )}
              </div>
            ))}
          </div>
          <hr />
          <div className="chatroom__right__end">
            <Icon
              icon="mingcute:emoji-fill"
              width="25"
              height="25"
              className="chatroom__right__end__icon"
            />
            <input
              type="text"
              placeholder="Enter ....."
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <Icon
              icon="streamline-flex:mail-send-email-message-circle-solid"
              width="25"
              height="25"
              className="chatroom__right__end__icon"
              onClick={handleSendMessage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MessageMain;
