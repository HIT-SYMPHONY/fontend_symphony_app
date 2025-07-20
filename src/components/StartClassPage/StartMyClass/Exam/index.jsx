import React, { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "@iconify/react";
import { work } from "../../../../data/app";
import { GlobalContext } from "../../../../dataContext";
import { useOutletContext } from "react-router-dom";
import Classroom from "../Classroom";
import icon from "./../../../../assets/img/Ellipse.png";
import logo from "./../../../../assets/img/logo.png";
import Frame from "../Frame";
import Comment from "../Comment";
import "./style.scss";

const Exam = () => {
  const { onSetSub, page } = useOutletContext();
  const [timeLeft, setTimeLeft] = useState(1 * 3600 + 30 * 60);
  const intervalRef = useRef(null);
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          alert("Hết giờ!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const context = useContext(GlobalContext);
  if (!context) {
    console.error(
      "GlobalContext is undefined. Ensure HomePage is wrapped in GlobalProvider."
    );
    return <div>Lỗi: Không tìm thấy GlobalContext!</div>;
  }

  return (
    <>
      {page ? (
        <Comment />
      ) : (
        <div className="exam">
          <h2>PRIVATE: Đồ họa - 2025</h2>
          <div className="exam__one">
            <div className="exam__one__tap">
              <strong className="exam__one__tap__than">1</strong>
              <strong className="tapthan">&gt;&gt;</strong>
              <strong>Buổi 8: Kiểm tra</strong>
            </div>
            <strong
              className="exam__one__time"
              style={{
                fontSize: "1.2rem",
                color: timeLeft <= 300 ? "#ff0000" : "#000000",
              }}
            >
              {timeLeft > 0 ? formatTime(timeLeft) : "00:00:00"}
            </strong>
          </div>
          <div className="exam__two">
            <strong>Nội dung: </strong>
          </div>
          <div className="exam__nop">
            <label className="exam__label">Trả lời:</label>
            <div className="exam__input-wrapper">
              <textarea className="exam__textarea" />
              <Icon
                icon="streamline-flex:mail-send-email-message-circle-solid"
                color="white"
                width="30"
                height="30"
                className="exam__submit"
                onClick={() => onSetSub(true)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Exam;
