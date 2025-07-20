import React from "react";
import { Icon } from "@iconify/react";
import { Pagination } from "antd";
import { adv, lop } from "../../../data/app";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import AdvList from "../ClassAgo/indexx";

const Main = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-one">
        <div className="flex-one__thongbao">
          <div className="thongbao">
            <Icon
              icon="mingcute:notification-newdot-line"
              width="25"
              height="25"
              className="thongbao__Icon"
            />
            <h3>Thông báo</h3>
          </div>
          <AdvList />
        </div>
        <div className="flex-one__plus">
          <div className="plus">
            <Icon
              icon="fluent:book-star-24-regular"
              width="25"
              height="25"
              className="plus__Icon"
            />
            <h3>Lớp học gần đây</h3>
          </div>
          <div className={title ? "class-ago thay1" : "class-ago thay2"}>
            {lop.map((item, index) => (
              <div className="class-ago__box" key={index}>
                <div className="class-ago__thumbnail"></div>
                <div className="class-ago__content">
                  <button
                    className="class-ago__button"
                    onClick={() => navigate("/information")}
                  >
                    VÀO HỌC
                  </button>
                  <h2 className="class-ago__content__title">Private</h2>
                  <h2 className="class-ago__content__title">{item.name}</h2>
                  <p className="class-ago__content__info">
                    <span className="icon">
                      <Icon icon="mdi:badge-account" />
                    </span>{" "}
                    Leader: {item.leader}
                  </p>
                  <p className="class-ago__content__info">
                    <span className="icon">
                      <Icon icon="mingcute:time-line" />
                    </span>{" "}
                    Ngày bắt đầu: {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
