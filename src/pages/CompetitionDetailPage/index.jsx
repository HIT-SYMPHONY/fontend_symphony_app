import { Icon } from '@iconify/react'
import React from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCompetitionById } from 'apis/competition.api'
import toast from 'react-hot-toast'
import { Skeleton } from 'antd'
import SeparateDiv from 'components/SeparateDiv'
import { competitionKeys } from 'constants/queryKeys'

function CompetitionDetailPage() {
  const navigate = useNavigate()
  const { competitionId } = useParams()
  const {
    data: competition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: competitionKeys.detail(competitionId),
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Không thể tải thông tin cuộc thi.')
      navigate('/home')
    },
  })

  const dividerClass = 'w-[2px] bg-[#828282] h-[24px]'

  const getTabClass = (isActive, extraClasses = 'flex-1') => {
    const baseClasses = 'rounded-2xl border-[3px] px-4 py-1 transition-all'
    const stateClasses = isActive ? 'border-primary text-primary' : 'border-neutral-grey'

    return `${baseClasses} ${stateClasses} ${extraClasses}`
  }

  return (
    <div className='flex h-full'>
      <div className='w-[70%] pr-[10px] flex flex-col '>
        <div className='flex gap-[10px]'>
          <Icon
            icon='streamline-ultimate:ranking-stars-ribbon-bold'
            width='30'
            height='30'
            className='text-[#ff6911]'
          />
          <h2>Cuộc thi</h2>
        </div>
        <div className='bg-[#ccc] h-[250px] rounded-[20px] mt-[10px] mb-[10px] overflow-hidden relative'>
          {!isLoading && competition ? (
            <img
              src={competition.image}
              alt={competition.name}
              className='w-full h-[250px] object-cover'
            />
          ) : (
            <Skeleton.Image active className='!w-full !h-full object-cover' />
          )}
          <i className='fa-solid fa-circle-info absolute bottom-[10px] right-[10px] text-[#ff6911] text-2xl'></i>
        </div>

        {/* --- TABS SECTION --- */}
        <div className='flex gap-2 text-[#828282] font-semibold text-2xl text-center items-center mb-4'>
          <NavLink
            to={`/competitions/${competitionId}/description`}
            className={({ isActive }) => getTabClass(isActive)}
            replace>
            Giới thiệu
          </NavLink>

          <div className={dividerClass}></div>

          <NavLink
            to={`/competitions/${competitionId}/rules`}
            className={({ isActive }) => getTabClass(isActive)}
            replace>
            Thể lệ
          </NavLink>

          <div className={dividerClass}></div>

          <NavLink
            to={`/competitions/${competitionId}/ranking`}
            className={({ isActive }) => getTabClass(isActive)}
            replace>
            Xếp hạng
          </NavLink>

          <div className={dividerClass}></div>

          <NavLink
            to={`/competitions/${competitionId}/my-test`}
            className={({ isActive }) =>
              getTabClass(isActive, 'flex-[2] flex gap-4 items-center justify-center')
            }
            replace>
            <svg
              width='30'
              height='30'
              viewBox='0 0 40 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M27.5001 0.00633224C25.5179 -0.0157195 23.5579 0.42472 21.7757 1.29267C19.9935 2.16062 18.4383 3.43217 17.2335 5.00633C17.0825 5.17952 16.969 5.38203 16.9001 5.60117C16.8311 5.8203 16.8082 6.05133 16.8328 6.27973C16.8574 6.50814 16.9289 6.729 17.0429 6.92844C17.1569 7.12789 17.3109 7.30161 17.4953 7.43871C17.6796 7.5758 17.8903 7.67331 18.1141 7.72512C18.3379 7.77692 18.57 7.78189 18.7958 7.73972C19.0216 7.69756 19.2363 7.60916 19.4264 7.48009C19.6164 7.35101 19.7777 7.18404 19.9001 6.98967C20.7979 5.83448 21.9517 4.90352 23.2705 4.27013C24.5893 3.63675 26.0372 3.31823 27.5001 3.33967C29.8192 3.23542 32.0852 4.05347 33.8029 5.615C35.5205 7.17653 36.5502 9.35455 36.6668 11.673C36.6281 13.3719 36.0709 15.0184 35.07 16.3916C34.0691 17.7649 32.6723 18.7994 31.0668 19.3563C30.8708 19.4276 30.6899 19.535 30.5335 19.673C30.2001 19.9897 27.0835 22.6397 26.6668 23.0063V21.5897C26.6708 21.1852 26.5276 20.7932 26.2639 20.4865C26.0001 20.1799 25.6339 19.9796 25.2335 19.923C24.7876 19.8642 24.3473 19.7695 23.9168 19.6397C23.7056 19.5795 23.4846 19.5615 23.2664 19.5867C23.0483 19.6119 22.8372 19.6799 22.6453 19.7866C22.4534 19.8934 22.2844 20.037 22.148 20.2091C22.0115 20.3812 21.9103 20.5785 21.8501 20.7897C21.7899 21.0009 21.7719 21.2219 21.7972 21.44C21.8224 21.6582 21.8903 21.8693 21.9971 22.0612C22.1039 22.2531 22.2474 22.4221 22.4195 22.5585C22.5916 22.6949 22.7889 22.7961 23.0001 22.8563L23.3335 22.9397V26.673C23.3351 27.002 23.4341 27.3232 23.618 27.5961C23.8019 27.869 24.0624 28.0813 24.3668 28.2063C24.6703 28.334 25.0048 28.3688 25.3281 28.3065C25.6515 28.2443 25.9491 28.0876 26.1835 27.8563C26.6168 27.4063 32.0835 22.7563 32.5501 22.3397C34.7108 21.5026 36.5733 20.041 37.9001 18.1413C39.2269 16.2416 39.958 13.9898 40.0001 11.673C39.8828 8.47066 38.5017 5.4452 36.159 3.25872C33.8164 1.07224 30.7029 -0.0971967 27.5001 0.00633224Z'
                fill='currentColor'
              />
              <path
                d='M20.2 10.8395C20.2 11.2815 20.3756 11.7055 20.6882 12.018C21.0007 12.3306 21.4246 12.5062 21.8667 12.5062C22.3087 12.5062 22.7326 12.3306 23.0452 12.018C23.3577 11.7055 23.5333 11.2815 23.5333 10.8395C23.5333 10.3975 23.3577 9.97357 23.0452 9.66101C22.7326 9.34845 22.3087 9.17285 21.8667 9.17285C21.4246 9.17285 21.0007 9.34845 20.6882 9.66101C20.3756 9.97357 20.2 10.3975 20.2 10.8395ZM25.6167 10.8395C25.6167 11.0584 25.6598 11.2751 25.7435 11.4773C25.8273 11.6795 25.9501 11.8633 26.1048 12.018C26.2596 12.1728 26.4433 12.2956 26.6455 12.3793C26.8477 12.4631 27.0645 12.5062 27.2833 12.5062C27.5022 12.5062 27.7189 12.4631 27.9211 12.3793C28.1234 12.2956 28.3071 12.1728 28.4618 12.018C28.6166 11.8633 28.7394 11.6795 28.8231 11.4773C28.9069 11.2751 28.95 11.0584 28.95 10.8395C28.95 10.3975 28.7744 9.97357 28.4618 9.66101C28.1493 9.34845 27.7254 9.17285 27.2833 9.17285C26.8413 9.17285 26.4174 9.34845 26.1048 9.66101C25.7923 9.97357 25.6167 10.3975 25.6167 10.8395ZM31.0333 10.8395C31.0333 11.2815 31.2089 11.7055 31.5215 12.018C31.8341 12.3306 32.258 12.5062 32.7 12.5062C33.142 12.5062 33.566 12.3306 33.8785 12.018C34.1911 11.7055 34.3667 11.2815 34.3667 10.8395C34.3667 10.3975 34.1911 9.97357 33.8785 9.66101C33.566 9.34845 33.142 9.17285 32.7 9.17285C32.258 9.17285 31.8341 9.34845 31.5215 9.66101C31.2089 9.97357 31.0333 10.3975 31.0333 10.8395ZM12.5 26.6729C9.18479 26.6729 6.00537 27.9898 3.66117 30.334C1.31696 32.6782 0 35.8576 0 39.1729C0 39.3939 0.0877974 39.6058 0.244078 39.7621C0.400358 39.9184 0.61232 40.0062 0.833333 40.0062H24.1667C24.3877 40.0062 24.5996 39.9184 24.7559 39.7621C24.9122 39.6058 25 39.3939 25 39.1729C25 35.8576 23.683 32.6782 21.3388 30.334C18.9946 27.9898 15.8152 26.6729 12.5 26.6729ZM4.58333 17.9229C4.58333 20.0225 5.41741 22.0361 6.90207 23.5208C8.38673 25.0054 10.4004 25.8395 12.5 25.8395C14.5996 25.8395 16.6133 25.0054 18.0979 23.5208C19.5826 22.0361 20.4167 20.0225 20.4167 17.9229C20.4167 15.8232 19.5826 13.8096 18.0979 12.3249C16.6133 10.8403 14.5996 10.0062 12.5 10.0062C10.4004 10.0062 8.38673 10.8403 6.90207 12.3249C5.41741 13.8096 4.58333 15.8232 4.58333 17.9229Z'
                fill='currentColor'
              />
            </svg>
            <p className='whitespace-nowrap'>Phần thi của bạn</p>
          </NavLink>
        </div>
        <div className='flex-1'>
          <Outlet></Outlet>
        </div>
      </div>
      <SeparateDiv></SeparateDiv>
    </div>
  )
}

export default CompetitionDetailPage
