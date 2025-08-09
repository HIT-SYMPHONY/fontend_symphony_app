import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { verifyTempPassword, forgotPassword } from '../../../apis/auth.api'
import useAuth from '../../../hooks/useAuth'

// const CheckEmail = ({ setDisplay, email }) => {
//   const navigate = useNavigate()
//   const { saveUser } = useAuth()
//   const [tempPassword, setTempPassword] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [resendLoading, setResendLoading] = useState(false)

//   const handleConfirm = async () => {
//     if (!tempPassword) {
//       toast.error('Vui lòng nhập mã xác nhận.')
//       return
//     }
//     setLoading(true)
//     try {
//       const response = await verifyTempPassword({ email, tempPassword })
//       const authPayload = response.data
//       saveUser(authPayload)

//       toast.success('Xác thực thành công! Đang đăng nhập...')
//       navigate('/home')
//     } catch (error) {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message)
//       } else {
//         toast.error('Có lỗi xảy ra, vui lòng thử lại.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleResend = async () => {
//     setResendLoading(true)
//     try {
//       await forgotPassword({ email })
//       toast.success('Đã gửi lại mã xác nhận!')
//     } catch (error) {
//       toast.error('Không thể gửi lại mã. Vui lòng thử lại sau.')
//     } finally {
//       setResendLoading(false)
//     }
//   }

//   const handleClose = () => {
//     setDisplay(false)
//   }

//   return (
//     <div className='fix-email'>
//       <div className='fix-email__screen'>
//         <h1>KIỂM TRA EMAIL CỦA BẠN!</h1>
//         <p>
//           Một mã xác nhận đã được gửi tới <strong>{email}</strong>
//         </p>
//         <input
//           type='text'
//           placeholder='Nhập Mã Xác Nhận'
//           className='fix-email__screen__input'
//           value={tempPassword}
//           onChange={(e) => setTempPassword(e.target.value)}
//         />
//         <p>Nhập mật khẩu mới</p>
//         <input
//           type='text'
//           placeholder='Nhập mật khẩu mới '
//           className='fix-email__screen__input'
//           value={tempPassword}
//           onChange={(e) => setTempPassword(e.target.value)}
//         />
//         <div className='fix-email__screen__button'>
//           <button onClick={handleConfirm} disabled={loading}>
//             {loading ? 'Đang xác nhận...' : 'Xác Nhận'}
//           </button>
//           <button onClick={handleResend} disabled={resendLoading}>
//             {resendLoading ? 'Đang gửi...' : 'Gửi Lại'}
//           </button>
//         </div>
//         <i className='fa-solid fa-xmark' onClick={handleClose}></i>
//       </div>
//     </div>
//   )
// }

// export default CheckEmail

const CheckEmail = ({ setDisplay, email }) => {
  const navigate = useNavigate()
  const { saveUser } = useAuth()

  const [tempPassword, setTempPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const handleConfirm = async () => {
    if (!tempPassword) {
      toast.error('Vui lòng nhập mã xác nhận.')
      return
    }
    if (!newPassword) {
      toast.error('Vui lòng nhập mật khẩu mới.')
      return
    }

    setLoading(true)
    try {
      const response = await verifyTempPassword({
        email,
        tempPassword,
        newPassword,
      })

      const authPayload = response.data
      saveUser(authPayload)

      toast.success('Mật khẩu đã được đặt lại! Đang đăng nhập...')
      navigate('/home')
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

  const handleResend = async () => {
    setResendLoading(true)
    try {
      await forgotPassword({ email })
      toast.success('Đã gửi lại mã xác nhận!')
    } catch (error) {
      toast.error('Không thể gửi lại mã. Vui lòng thử lại sau.')
    } finally {
      setResendLoading(false)
    }
  }

  const handleClose = () => {
    setDisplay(false)
  }

  return (
    <div className='fix-email'>
      <div className='fix-email__screen'>
        <h1>KIỂM TRA EMAIL CỦA BẠN!</h1>
        <p>
          Một mã xác nhận đã được gửi tới <strong>{email}</strong>
        </p>

        <input
          type='text'
          placeholder='Nhập Mã Xác Nhận'
          className='fix-email__screen__input'
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
        />
        <p>Nhập mật khẩu mới</p>
        <input
          type='password'
          placeholder='Nhập Mật khẩu mới'
          className='fix-email__screen__input'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <div className='fix-email__screen__button'>
          <button onClick={handleConfirm} disabled={loading}>
            {loading ? 'Đang xác nhận...' : 'Xác Nhận'}
          </button>
          <button onClick={handleResend} disabled={resendLoading}>
            {resendLoading ? 'Đang gửi...' : 'Gửi Lại'}
          </button>
        </div>
        <i className='fa-solid fa-xmark' onClick={handleClose}></i>
      </div>
    </div>
  )
}

export default CheckEmail
