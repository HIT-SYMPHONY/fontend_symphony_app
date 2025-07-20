import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { list } from "../../data/app";
import "./style.scss";

// Mảng để ánh xạ thứ sang tiếng Việt
const dayOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const Schedule = () => {
  const currentDate = new Date();
  const today = dayOfWeek[currentDate.getDay()];
  const currentDayIndex = currentDate.getDay();

  const startDate = new Date(currentDate);
  if (currentDayIndex === 1) {
    // Thứ Hai
    startDate.setDate(currentDate.getDate() + 7);
  }

  // Tạo mảng chứa 7 cặp ngày từ thứ Hai đến Chủ Nhật
  const weekDays = [];
  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(
    startDate.getDate() -
      (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)
  );
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push({
      day: dayOfWeek[day.getDay()],
      date: day.getDate(), // Chỉ lấy số ngày
    });
  }

  return (
    <div className="schedule">
      <div className="schedule__icon">
        <div className="schedule__icon__thang">
          <Icon
            icon="tabler:calendar-week-filled"
            width="24"
            height="24"
            className="schedule__icon__thang__Icon"
          />
          <h3>Thời khóa biểu</h3>
        </div>
        <span>Tháng {startDate.getMonth() + 1}</span>
      </div>
      <div className="schedule__date">
        {weekDays.map((item, index) => (
          <div
            key={index}
            className={`date-item ${today === item.day ? "selected" : ""}`}
          >
            <span>{item.day}</span>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
      <div className="schedule__number">
        <span>Số lượng lớp: </span>
        <span>{list.length}</span>
      </div>
      <div className="schedule__list">
        {list.map((item, index) => (
          <div key={index} className="schedule__item ">
            <div className="div"></div>
            <div>
              <span>Thời Gian: {item.date}</span>
              <h5>{item.name}</h5>
              <p>Leader: {item.leader}</p>
              <p>Địa điểm: {item.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
