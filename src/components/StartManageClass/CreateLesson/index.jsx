import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const CreateLesson = () => {
  return (
    <>
      <div className="createlesson">
        <div className="createlesson__start">
          <Icon
            icon="material-symbols:book-2-rounded"
            width="30"
            height="30"
            className="createlesson__start__icon"
          />
          <h3>Bài học</h3>
          <i className="fa-solid fa-angles-right createlesson__start__icon"></i>
          <h3>Tài liệu</h3>
        </div>
        <div className="createlesson__context">
          <h4>Tên tài liệu </h4>
          <input
            type="text"
            placeholder="Nhập tên tài liệu... "
            className="createlesson__context__input"
          />
          <h4>Nội dung</h4>
          <textarea
            name=""
            id=""
            placeholder="Nhập nội dung..."
            className="createlesson__context__textarea"
          ></textarea>
        </div>
        <div className="createlesson__end">
          <button className="createlesson__end__submit">Lưu</button>
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
