import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const CreateTest = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("vi-VN");
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <div className="createtest">
        <div className="createtest__start">
          <Icon
            icon="material-symbols:book-2-rounded"
            width="30"
            height="30"
            className="createtest__start__icon"
          />
          <h3>Kiểm tra</h3>
        </div>

        <div className="createtest__context">
          <h4>Đề bài </h4>
          <input
            type="text"
            placeholder="Nhập tên tài liệu... "
            className="createtest__context__input"
          />
          <div className="createtest__context__time">
            <div className="createtest__context__time__box">
              <h4>Ngày giao</h4>
              <span>{currentDate}</span>
            </div>
            <div className="createtest__context__time__box">
              <h4>Thời gian bắt đầu </h4>
              <input type="text" />
            </div>
            <div className="createtest__context__time__box">
              <h4>Thời gian kết thúc</h4>
              <input type="text" />
            </div>
          </div>
          <h4>Đề bài</h4>
          <textarea
            name=""
            id=""
            placeholder="Nhập nội dung..."
            className="createtest__context__textarea"
          ></textarea>
        </div>

        <div className="createtest__end">
          <button className="createtest__end__submit">Lưu</button>
        </div>
      </div>
    </>
  );
};

export default CreateTest;
