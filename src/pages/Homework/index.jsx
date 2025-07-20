import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { work } from "../../data/app";
import menuBookRounded from "@iconify-icons/material-symbols/menu-book-rounded";
import "./style.scss";

const Homework = () => {
  const today = new Date();
  const day = String(today.getDate());
  const month = String(today.getMonth() + 1);

  const formattedDate = `${day}/${month}`;
  console.log(formattedDate);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="homework">
        <div className="homework__icon">
          <div className="homework__icon__baitap">
            <Icon
              icon={menuBookRounded}
              width="25"
              height="25"
              className="mau"
            />
            <h4>Bài Tập</h4>
          </div>
          <div className="homework__icon__bieutuong">
            <div className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                {isOpen ? " ˄ lớp " : " ˅ lớp "}
              </button>
              {isOpen && (
                <div className="dropdown-content">
                  <a href="#">Web</a>
                  <a href="#">Java</a>
                  <a href="#">NodeJs</a>
                </div>
              )}
            </div>
            <Icon
              icon="stash:filter-solid"
              width="25"
              height="25"
              className="mau"
            />
          </div>
        </div>
        <div className="homework__baitap">
          {work.map((item, index) => (
            <div key={index} className="baitap">
              <div className="div">
                <span
                  className={
                    item.style === 1
                      ? "vien back-one"
                      : item.style === 2
                      ? "vien back-two"
                      : "vien back-three"
                  }
                >
                  {formattedDate}
                </span>
                <div
                  className={
                    item.style === 1
                      ? "color-one"
                      : item.style === 2
                      ? "color-two"
                      : "color-three"
                  }
                >
                  <h5>{item.work}</h5>
                  <div
                    className={
                      item.style === 1
                        ? "daucuoi color-one"
                        : item.style === 2
                        ? "daucuoi color-two"
                        : "daucuoi color-three"
                    }
                  >
                    <p>Tình trạng:</p>
                    <p>{item.hientrang}</p>
                  </div>
                </div>
              </div>
              <h5>{item.classname}</h5>
              <div className="baitap__content">
                <div
                  className={
                    item.style === 1
                      ? "vien back-one"
                      : item.style === 2
                      ? "vien back-two"
                      : "vien back-three"
                  }
                ></div>
                <div>
                  <div className="daucuoi">
                    <p>Tên bài tập:</p>
                    <p>{item.name}</p>
                  </div>
                  <div className="daucuoi">
                    <p>Người giao bài:</p>
                    <p>{item.teacher}</p>
                  </div>
                  <div className="daucuoi">
                    <p>Thời gian giao:</p>
                    <p>{item.start}</p>
                  </div>
                  <div className="daucuoi">
                    <p>Hạn nộp:</p>
                    <p>{item.begin}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homework;
