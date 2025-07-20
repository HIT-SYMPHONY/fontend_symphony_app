import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";

const AccountFrame = ({ onSetSub }) => {
  const [frame, setFrame] = useState({
    change: true,
    new: false,
    result: false,
  });

  const handleFrame = (index) => {
    switch (index) {
      case 1:
        return {
          change: true,
          new: false,
          result: false,
        };
      case 2:
        return {
          change: false,
          new: true,
          result: false,
        };
      case 3:
        return {
          change: false,
          new: false,
          result: true,
        };
      default:
        return {
          change: true,
          new: false,
          result: false,
        };
    }
  };

  const AccountResult = () => {
    return (
      <div className="accountframe__relate">
        <h1 className="accountframe__relate__h1">NỘP BÀI THÀNH CÔNG!</h1>
        <div className="accountframe__relate__button">
          <button onClick={() => setFrame(handleFrame(2))}>QUAY LẠI</button>
        </div>
        <i
          className="fa-solid fa-xmark accountframe__relate__i"
          onClick={() => onSetSub(false)}
        ></i>
      </div>
    );
  };

  const AccountNew = () => {
    const [passNew, setPassNew] = useState("");
    const [repeat, setRepeat] = useState("");

    const handleNew = (event) => {
      setPassNew(event.target.value);
      console.log("Mật khẩu mới:", event.target.value);
    };

    const handleRepeat = (event) => {
      setRepeat(event.target.value);
      console.log("Mật khẩu nhập lại:", event.target.value);
    };

    const handleSubmit = () => {
      if (passNew === repeat && passNew !== "") {
        setFrame(handleFrame(3));
      } else {
        console.log("Mật khẩu không khớp hoặc để trống!");
      }
    };

    return (
      <div className="accountframe__pos">
        <h4 className="accountframe__pos__h1">NHẬP MẬT KHẨU MỚI</h4>
        <input
          type="password"
          value={passNew}
          onChange={handleNew}
          placeholder="Nhập mật khẩu mới..."
          className="accountframe__pos__input"
        />
        <h4 className="accountframe__pos__h1">NHẬP LẠI MẬT KHẨU MỚI</h4>
        <input
          type="password"
          value={repeat}
          onChange={handleRepeat}
          placeholder="Nhập lại mật khẩu mới..."
          className="accountframe__pos__input"
        />
        <div className="accountframe__pos__button">
          <button onClick={handleSubmit}>XÁC NHẬN</button>
          <button onClick={() => setFrame(handleFrame(1))}>QUAY LẠI</button>
        </div>
        <i
          className="fa-solid fa-xmark accountframe__pos__i"
          onClick={() => onSetSub(false)}
        ></i>
      </div>
    );
  };

  const AccountChange = () => {
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
      setPassword(event.target.value);
      console.log("Mật khẩu hiện tại:", event.target.value);
    };

    const handleCheck = () => {
      if (password !== "") {
        setFrame(handleFrame(2));
      } else {
        console.log("Vui lòng nhập mật khẩu hiện tại!");
      }
    };

    return (
      <div className="accountframe__pos">
        <h1 className="accountframe__pos__h1">NHẬP MẬT KHẨU CŨ CỦA BẠN!</h1>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu hiện tại..."
          className="accountframe__pos__input"
        />
        <div className="accountframe__pos__button">
          <button onClick={handleCheck}>KIỂM TRA</button>
          <button onClick={() => onSetSub(false)}>QUAY LẠI</button>
        </div>
        <i
          className="fa-solid fa-xmark accountframe__pos__i"
          onClick={() => onSetSub(false)}
        ></i>
      </div>
    );
  };

  return (
    <div className="accountframe">
      {frame.change && <AccountChange />}
      {frame.new && <AccountNew />}
      {frame.result && <AccountResult />}
    </div>
  );
};

export default AccountFrame;
