import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'
import { forgotPassword } from '../../../apis/auth.api'
import CheckEmail from '../CheckEmail'
import loginImg from '../../../assets/img/login.jpg'
import logo from '../../../assets/img/logo.png'
import ic_email from '../../../assets/img/ic_email.jpg'
import './style.scss'

const Confirm = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showVerifyPopup, setShowVerifyPopup] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await forgotPassword({ email: values.email })
      toast.success('Mã khôi phục đã được gửi tới email của bạn!')
      setSubmittedEmail(values.email)
      setShowVerifyPopup(true)
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='confirm'>
      <i className='fa-solid fa-arrow-left' onClick={() => navigate('/login')}></i>
      <div className='confirm__tap'>
        <img src={logo} alt='Logo' className='confirm__tap__logo' />
        <h1>XÁC NHẬN MẬT KHẨU</h1>
        <Form
          form={form}
          name='confirmForm'
          onFinish={onFinish}
          autoComplete='off'
          className='confirm__tap__form'>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
            className='confirm__tap__form__item'>
            <div className='input__button'>
              <img src={ic_email} alt='Icon email' className='input__button__icon' />
              <Input type='email' placeholder='Nhập Email' className='input' />
            </div>
          </Form.Item>
          <Form.Item className='confirm__tap__form__item'>
            <Button type='primary' htmlType='submit' className='button-color' loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
      <img src={loginImg} alt='Hình nền đăng nhập' className='confirm__img' />
      {showVerifyPopup && <CheckEmail setDisplay={setShowVerifyPopup} email={submittedEmail} />}
    </div>
  )
}

export default Confirm
