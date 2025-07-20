import React, { useState } from "react";
import "./style.scss";
import loginImg from "./../../assets/img/login.jpg";
import logo from "./../../assets/img/logo.png";
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
    <div className="login">
      <i className="fa-solid fa-arrow-left" onClick={() => navigate("/")}></i>
      <div className="login__tap">
        <img src={logo} alt="Logo" />
        <h1>XÁC NHẬN MẬT KHẨU</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="studentId"
            rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
          >
            <div className="form__input">
              <i className="fa-solid fa-circle-user" aria-hidden="true"></i>
              <Input
                placeholder="Mã Sinh Viên"
                variant="outlined"
                aria-label="Nhập mã sinh viên"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <div className="form__input">
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              <Input
                type="email"
                placeholder="Nhập Email"
                variant="outlined"
                aria-label="Nhập email"
              />
            </div>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 1, span: 16 }}
            className="button-center"
          >
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
      <img src={loginImg} alt="Hình nền đăng nhập" className="login__img" />
      {display && <CheckEmail setDisplay={setDisplay} />}
    </div>
  );
};

export default Confirm;
