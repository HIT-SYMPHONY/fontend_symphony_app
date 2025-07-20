import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const ManageLesson = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const member = [
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },

    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },

    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },

    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },

    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
    {
      id: 1,
      name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
      time: "30/06/2025",
      class: "Đề cương bài học",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <h3>Tất cả bài học</h3>
      <div className="managelesson">
        <div className="managelesson__title">
          <h4>Tên bài học</h4>
          <h4>Ngày tạo</h4>
        </div>
        <div className="managelesson__table">
          {member.map((item, index) => (
            <div key={index}>
              <div className="managelesson__table__box">
                <div className="managelesson__table__box__start">
                  <h5 className="managelesson__table__box__start__h5">
                    {item.id}
                  </h5>
                  <h5>{item.name}</h5>
                </div>
                <h5>{item.time}</h5>
                <i
                  className={
                    expandedItems[index]
                      ? "fa-solid fa-chevron-up"
                      : "fa-solid fa-chevron-down"
                  }
                  onClick={() => toggleExpand(index)}
                ></i>
              </div>
              {expandedItems[index] && (
                <div className="managelesson__table__item">
                  <span>{item.class}</span>
                  <span>{item.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageLesson;
