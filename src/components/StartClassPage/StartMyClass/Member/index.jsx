import React, { useState, useEffect, useRef, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./style.scss";
const list = [
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
  {
    id: 1,
    name: "nguyen van A",
    class: "2023DAPT01",
    time: "30/06/2025",
  },
];
const Member = () => {
  return (
    <div className="listmember">
      <div className="listmember__title">
        <div className="listmember__title__muc">
          <h2>PRIVATE: Đồ họa - 2025</h2>
          <h3>Danh sách thành viên</h3>
          <p>Số lượng thanh viên: {list.length}</p>
        </div>
        <div className="listmember__title__icon">
          <h3>Nhóm chat</h3>
          <div className="icon"></div>
        </div>
      </div>
      <div className="listmember__table">
        <div className="listmember__table__begin">
          <span>Tên thành viên</span>
          <span>Lớp hành chính </span>
          <span>Ngày vào lớp </span>
        </div>
        <div className="listmember__table__end">
          {list.map((item, index) => (
            <div className="end" key={index}>
              <div className="end__id">
                <span>{item.id}</span>
                <p>{item.name}</p>
              </div>
              <span>{item.class}</span>
              <div className="end__time">
                <span>{item.time}</span>
                <div className="end__time__eclip"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Member;
