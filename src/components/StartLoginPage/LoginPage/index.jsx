import React from 'react'
import './style.scss'
import loginImg from './../../../assets/img/login.jpg'
import logo from './../../../assets/img/logo.png'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import HttpService from '../../../services/http-service'
import storageService from '../../../services/storage.service'
import { LocalStorage } from '../../../contexts/localStorage.constant'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()

  // ✅ Xử lý đăng nhập
  const handleSubmit = async (values) => {
    const { username: studentCode, password } = values
    try {
      const res = await HttpService.login(studentCode, password)
      if (res.success) {
        toast.success('Đăng nhập thành công!')
        navigate('/dashboard')
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Lỗi kết nối đến máy chủ!')
    }
  }

  return (
    <div className='login'>
      <div className='login__tap'>
        <img src={logo} alt='Logo' />
        <h1>ĐĂNG NHẬP</h1>

        <Form name='basic' autoComplete='off' className='login__tap__form' onFinish={handleSubmit}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
            className='login__tap__form__item'>
            <Input
              prefix={<i className='fa-solid fa-circle-user' aria-hidden='true'></i>}
              placeholder='Mã sinh viên'
              className='form__input'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            className='login__tap__form__item'>
            <Input.Password
              prefix={<i className='fa-solid fa-lock' aria-hidden='true'></i>}
              placeholder='Mật khẩu'
              className='form__input'
            />
          </Form.Item>

          <Form.Item className='login__tap__form__item'>
            <Button type='primary' htmlType='submit' className='button-color'>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>

        <span className='white' onClick={() => navigate('/FixPassword')}>
          Quên mật khẩu?
        </span>
      </div>
      <img src={loginImg} alt='Background' className='login__img' />
    </div>
  )
}

export default Login
