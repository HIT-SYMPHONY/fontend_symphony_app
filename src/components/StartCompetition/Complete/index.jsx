import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./style.scss";

const Complete = () => {
  const [comment, setComment] = useState(false);
  return (
    <div className="complete">
      <div className="complete__left">
        <h2>HIT Contest Series 2025</h2>
        <div className="complete__left__work">
          <div className="complete__left__work__begin">
            <h3 className="complete__left__work__begin__h3">3</h3>
            <i className="fa-solid fa-angles-right"></i>
            <h3>Phần thi: Photoshop</h3>
          </div>
        </div>
        <div className="complete__left__context">
          <h4>Đề bài:</h4>
        </div>

        {!comment && (
          <div className="complete__left__feedback">
            <h4>Trả lời: </h4>
            <div className="complete__left__feedback__respon">
              <textarea rows="5" className="respon"></textarea>
              <Icon
                icon="streamline-flex:mail-send-email-message-circle-solid"
                width="35"
                height="35"
                className="respon-color"
              />
            </div>
          </div>
        )}
        {comment && (
          <div className="complete__left__feedback">
            <h4>Nhận xét: </h4>
          </div>
        )}
      </div>
      <div className="complete__right">
        <Icon
          icon="duo-icons:message-3"
          width="50"
          height="50"
          className={comment ? "complete__right__icon" : ""}
          onClick={() => setComment(!comment)}
        />
        <h3 className="complete__right__dem1">Điểm 80</h3>
        <h3 className="complete__right__dem2">Đã nộp</h3>
      </div>
    </div>
  );
};

export default Complete;
