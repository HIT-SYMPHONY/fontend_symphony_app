import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { GlobalContext } from "../../../dataContext";
import icon from "./../../../assets/img/Ellipse.png";
import { Outlet } from "react-router-dom";
import logo from "./../../../assets/img/logo.png";
import Logout from "../../Logout";
import "./style.scss";

const ManageMember = () => {
  return (
    <>
      <div className="memberclass">
        <div className="memberclass__title">
          <div className="memberclass__title__tap">
            <Icon
              icon="mingcute:notification-newdot-fill"
              width="30"
              height="30"
              className="memberclass__title__tap__icon"
            />
            <h2>Thông báo</h2>
          </div>
          <button className="memberclass__title__button">Lưu </button>
        </div>
        <div className="memberclass__context">
          <span>Tên lớp học</span>
          <input type="text" />
          <span>Nội dung</span>
          <textarea
            className="memberclass__context__textarea"
            rows="5"
            placeholder="Nhập nội dung thông báo..."
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default ManageMember;
