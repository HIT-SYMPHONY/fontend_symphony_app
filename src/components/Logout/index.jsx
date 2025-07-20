import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Logout = ({ onSetFrame }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="xmark">
        <div className="xmark__pos">
          <h1 className="xmark__pos__h1">BẠN CHẮC CHẮN MUỐN ĐĂNG XUẤT?</h1>
          <div className="xmark__pos__button">
            <button onClick={() => navigate("/login")}>ĐĂNG XUẤT</button>
            <button onClick={() => onSetFrame(false)}>QUAY LẠI</button>
          </div>
          <i
            className="fa-solid fa-xmark xmark__pos__i"
            onClick={() => onSetFrame(false)}
          ></i>
        </div>
      </div>
    </>
  );
};

export default Logout;
