import React, { useState } from "react";

const CheckEmail = ({ setDisplay }) => {
  const handleConfirm = () => {
    setDisplay(false);
  };

  const handleResend = () => {};

  const handleClose = () => {
    setDisplay(false);
  };

  return (
    <div className="fix-email">
      <div className="fix-email__screen">
        <h1>KIỂM TRA EMAIL CỦA BẠN!</h1>
        <div className="fix-email__screen__button">
          <button onClick={handleConfirm}>Xác Nhận</button>
          <button onClick={handleResend}>Gửi Lại</button>
        </div>
        <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      </div>
    </div>
  );
};

export default CheckEmail;
