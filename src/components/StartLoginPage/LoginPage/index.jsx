import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'

import { login as loginApi } from '../../../apis/auth.api'
import useAuth from '../../../hooks/useAuth'
// --- Assets and Styles ---
import loginImg from '../../../assets/img/login.jpg'
import logo from '../../../assets/img/logo.png'
import './style.scss'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { saveUser } = useAuth()
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await loginApi({
        studentCode: values.username,
        password: values.password,
      })
      const authPayload = response.data
      saveUser(authPayload)
      toast.success('Đăng nhập thành công!')
      navigate('/home')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Form validation failed:', errorInfo)
    toast.error('Vui lòng điền đầy đủ thông tin!')
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
            <Button type='primary' htmlType='submit' className='button-color' loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <span className='white' onClick={() => navigate('/forgot-password')}>
          Quên mật khẩu?
        </span>
      </div>
      <img src={loginImg} alt='Background' className='login__img' />
    </div>
  )
}

export default LoginPage
