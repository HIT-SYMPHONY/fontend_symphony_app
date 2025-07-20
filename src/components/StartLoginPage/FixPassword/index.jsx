import React, { useState } from "react";
import "./style.scss";
import loginImg from "../../../assets/img/login.jpg";
import logo from "../../../assets/img/logo.png";
import ic_email from "../../../assets/img/ic_email.jpg";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import CheckEmail from "../FixEmail";

const onFinish = (values) => {
  console.log("Success:", values);
  // Thêm logic gọi API để xác nhận mã sinh viên và email
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Confirm = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  return (
    <div className="confirm">
      <i
        className="fa-solid fa-arrow-left"
        onClick={() => navigate("/")}
        aria-label="Quay lại trang chủ"
      ></i>
      <div className="confirm__tap">
        <img src={logo} alt="Logo" className="confirm__tap__logo" />
        <h1>XÁC NHẬN MẬT KHẨU</h1>
        <Form
          name="confirmForm"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            onFinish(values);
            setDisplay(true);
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="confirm__tap__form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
            className="confirm__tap__form__item"
          >
            <div className="input__button">
              <img
                src={ic_email}
                alt="Icon email"
                className="input__button__icon"
              />
              <Input
                type="email"
                placeholder="Nhập Email"
                aria-label="Nhập email"
                className="input"
              />
            </div>
          </Form.Item>

          <Form.Item className="confirm__tap__form__item">
            <Button
              type="primary"
              htmlType="submit"
              className="button-color"
              onClick={() => setDisplay(!display)}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
      <img src={loginImg} alt="Hình nền đăng nhập" className="confirm__img" />
      {display && <CheckEmail setDisplay={setDisplay} />}
    </div>
  );
};

export default Confirm;
