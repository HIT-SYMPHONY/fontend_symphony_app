import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'

import { login as loginApi } from '../../../apis/auth.api'
import useAuth from '../../../hooks/useAuth'
import loginImg from '../../../assets/img/login.jpg'
import logo from '../../../assets/img/logo.png'
import './style.scss'
import { getCurrentUser , getCurrentUserWithToken} from '../../../apis/user.api'
import axios from 'axios'
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
      const userProfile = await getCurrentUserWithToken(authPayload.accessToken);
      const {fullName, imageUrl} = userProfile.data
      saveUser({...authPayload, fullName, imageUrl})
      toast.success('Đăng nhập thành công!')
      const userRole = authPayload.authorities?.[0]?.authority
      if (userRole === 'ADMIN') {
        navigate('/admin/home')
      } else {
        navigate('/')
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Không thể kết nối đến máy chủ. Vui lòng thử lại.')
      }
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
