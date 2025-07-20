import React, { useState, useContext } from 'react'
import './style.scss'
import loginImg from './../../../assets/img/login.jpg'
import { GlobalContext } from '../../../dataContext'
import logo from './../../../assets/img/logo.png'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const { handleAspectChange, setToken, setResponseData, updateGlobalState } =
    useContext(GlobalContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/login',
        {
          studentCode: values.username,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log('API response:', response.data)

      if (response.data.status === 'SUCCESS') {
        setResponseData(response.data)
        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
        setToken(response.data.data.accessToken)
        handleAspectChange(response.data.data.authorities[0]?.authority || 'USER')
        message.success('Đăng nhập thành công!')
        alert('Đăng nhập thành công!')
        navigate('/home')
      } else {
        const errorMessage =
          typeof response.data.message === 'object'
            ? JSON.stringify(response.data.message)
            : response.data.message
        message.error(
          errorMessage || 'Đăng nhập thất bại. Vui lòng kiểm tra mã sinh viên hoặc mật khẩu!',
        )
        alert('Đăng nhập thất bại. Vui lòng kiểm tra mã sinh viên hoặc mật khẩu!')
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error.response?.data)
      const errorMessage = error.response?.data?.message
      message.error(
        typeof errorMessage === 'object'
          ? JSON.stringify(errorMessage)
          : errorMessage ||
              'Đăng nhập thất bại: Yêu cầu không hợp lệ. Vui lòng kiểm tra mã sinh viên hoặc mật khẩu!',
      )
      alert(
        'Đăng nhập thất bại: Yêu cầu không hợp lệ. Vui lòng kiểm tra mã sinh viên hoặc mật khẩu!',
      )
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Form validation failed:', errorInfo)
    message.error('Vui lòng kiểm tra lại thông tin nhập!')
  }

  return (
    <div className='login'>
      <div className='login__tap'>
        <img src={logo} alt='Logo' />
        <h1>ĐĂNG NHẬP</h1>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className='login__tap__form'>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
            className='login__tap__form__item'>
            <Input
              prefix={<i className='fa-solid fa-circle-user' aria-hidden='true'></i>}
              placeholder='Mã sinh viên'
              variant='outlined'
              aria-label='Mã Sinh Viên'
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
              variant='outlined'
              aria-label='Mật Khẩu'
              className='form__input'
            />
          </Form.Item>

          <Form.Item className='login__tap__form__item'>
            <Button type='primary' htmlType='submit' className='button-color' loading={loading}>
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
