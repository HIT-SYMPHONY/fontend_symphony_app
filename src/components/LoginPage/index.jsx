import React from "react";
import "./style.scss";
import loginImg from "./../../assets/img/login.jpg";
import logo from "./../../assets/img/logo.png";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Confirm from "../FixPassword";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login__tap">
        <img src={logo} alt="Logo" />
        <h1>ĐĂNG NHẬP</h1>
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
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
          >
            <div className="form__input">
              <i className="fa-solid fa-circle-user" aria-hidden="true"></i>
              <Input
                placeholder="Mã Sinh Viên"
                variant="outlined"
                aria-label="Mã Sinh Viên"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <div className="form__input">
              <i className="fa-solid fa-lock" aria-hidden="true"></i>
              <Input.Password
                placeholder="Mật Khẩu"
                variant="outlined"
                aria-label="Mật Khẩu"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="button-color">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <span className="white" onClick={() => navigate("/FixPassword")}>
          Quên Mật Khẩu ?
        </span>
      </div>
      <img src={loginImg} alt="Background" className="login__img" />
    </div>
  );
};

export default Login;
