// src/components/ApiErrorDisplay.jsx
import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

/**
 * A reusable component to display API errors with retry and back options.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The main title for the error (e.g., "Không thể tải dữ liệu").
 * @param {string} props.subTitle - A more detailed message explaining the error (e.g., "Đã có lỗi xảy ra...").
 * @param {function} [props.onRetry] - A function to call when the "Thử lại" button is clicked. If not provided, retry will attempt to refetch any queries passed to `refetchQueries`.
 * @param {Array<function>} [props.refetchQueries] - An array of `refetch` functions from useQuery to call on retry.
 * @param {string} [props.backUrl] - The URL to navigate to when the "Quay lại" button is clicked. Defaults to navigating back one step.
 */
const ApiErrorDisplay = ({ title, subTitle, onRetry, refetchQueries, backUrl = -1 }) => {
  const navigate = useNavigate()

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else if (refetchQueries && refetchQueries.length > 0) {
      refetchQueries.forEach((refetchFn) => {
        if (typeof refetchFn === 'function') {
          refetchFn()
        }
      })
    }
  }

  const handleBack = () => {
    if (typeof backUrl === 'number') {
      navigate(backUrl)
    } else if (typeof backUrl === 'string') {
      navigate(backUrl)
    }
  }

  return (
    <div className='flex items-center justify-center h-full w-full'>
      <Result
        status='warning'
        title={title || 'Đã xảy ra lỗi'}
        subTitle={subTitle || 'Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.'}
        extra={[
          <Button key='back' onClick={handleBack}>
            Quay lại
          </Button>,
          (onRetry || (refetchQueries && refetchQueries.length > 0)) && (
            <Button key='retry' type='primary' onClick={handleRetry}>
              Thử lại
            </Button>
          ),
        ]}
      />
    </div>
  )
}

export default ApiErrorDisplay
