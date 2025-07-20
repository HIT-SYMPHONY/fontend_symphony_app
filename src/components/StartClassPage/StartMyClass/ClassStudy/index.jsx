import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { Outlet } from "react-router-dom";
import { GlobalContext } from "../../../../dataContext";
import Classroom from "../Classroom";
import icon from "./../../../../assets/img/Ellipse.png";
import logo from "./../../../../assets/img/logo.png";
import Schedule from "../../../SchedulePage";
import Homework from "../../../Homework";
import InformationClass from "../InformationClass";
import Lession from "../Lession";
import Exam from "../Exam";
import "./style.scss";

export const HitRoom = ({ showSchedule, showHomework, bool }) => {
  return (
    <div
      className={
        (showSchedule || showHomework) && !bool
          ? "homepage__main__thongbao fle"
          : "homepage__main__thongbao"
      }
    >
      {(showSchedule || showHomework) && !bool ? (
        <div className="homepage__main__thongbao__div">
          <Classroom title={true} />
        </div>
      ) : (
        <Classroom title={false} />
      )}
      {showSchedule && !bool && <Schedule />}
      {showHomework && !bool && <Homework />}
    </div>
  );
};

const ClassStudy = () => {
  const [show, setShow] = useState(false);
  const [bool, setBool] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showHomework, setShowHomework] = useState(false);
  const context = useContext(GlobalContext);

  if (!context) {
    console.error(
      "GlobalContext is undefined. Ensure HomePage is wrapped in GlobalProvider."
    );
    return <div>Lỗi: Không tìm thấy GlobalContext!</div>;
  }

  const { globalState, updateGlobalState } = context;

  const handleLichHoc = () => {
    if (showHomework) {
      setShowHomework(false);
    }
    setShowSchedule(!showSchedule);
  };

  const handleBaiTap = () => {
    if (showSchedule) {
      setShowSchedule(false);
    }
    setShowHomework(!showHomework);
  };

  return (
    <div className="homepage">
      <div className="homepage__choose">
        <div className="homepage__choose__img">
          <img src={icon} alt="User avatar" />
        </div>
        <h3 className="homepage__choose__h3">Chào (tên)!</h3>
        <div
          className={
            globalState.home
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => updateGlobalState(1)}
        >
          <i className="fa-solid fa-house"></i>
          <span>Trang chủ</span>
        </div>
        <div
          className={
            globalState.classroom
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => {
            setShow(!show);
            updateGlobalState(2);
          }}
        >
          <i className="fa-solid fa-book"></i>
          <span>Lớp học</span>
        </div>
        {show && (
          <div>
            <div
              className={
                globalState.myclass
                  ? "homepage__choose__clickone child"
                  : "homepage__choose__clickone"
              }
              onClick={() => updateGlobalState(2)}
            >
              <Icon
                icon="fluent:book-star-24-regular"
                className="homepage__choose__clickone__Icon"
              />
              <span>Lớp của tôi</span>
            </div>
            <div
              className={
                globalState.myresult
                  ? "homepage__choose__clickone child"
                  : "homepage__choose__clickone"
              }
              onClick={() => updateGlobalState(3)}
            >
              <Icon
                icon="carbon:result"
                className="homepage__choose__clickone__Icon"
              />
              <span>Bảng kết quả</span>
            </div>
          </div>
        )}
        <div
          className={
            globalState.competition
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => updateGlobalState(4)}
        >
          <Icon
            icon="streamline-ultimate:ranking-stars-ribbon-bold"
            className="homepage__choose__click__Icon"
          />
          <span>Cuộc thi</span>
        </div>
        <div
          className={
            globalState.account
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => updateGlobalState(5)}
        >
          <i className="fa-solid fa-circle-user"></i>
          <span>Tài khoản</span>
        </div>
        <div
          className={
            globalState.logout
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => updateGlobalState(6)}
        >
          <Icon
            icon="mage:shut-down-fill"
            className="homepage__choose__click__Icon"
          />
          <span>Đăng xuất</span>
        </div>
      </div>
      <div className="homepage__main">
        <div className="homepage__main__search">
          <div className="search">
            <div className="search__icon">
              <img src={logo} alt="Logo" width="50px" height="50px" />
              <div className="search__icon__box">
                <input type="text" placeholder="Tìm kiếm..." />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className="search__then">
              {bool ? (
                <Icon
                  icon="line-md:menu-unfold-left"
                  width="26"
                  height="26"
                  className="search__then__Icon"
                  onClick={() => setBool(!bool)}
                />
              ) : (
                <div>
                  <Icon
                    icon="line-md:menu-unfold-right"
                    width="26"
                    height="26"
                    className="search__then__Icon"
                    onClick={() => setBool(!bool)}
                  />
                  <button
                    className="search__then__button"
                    onClick={handleLichHoc}
                  >
                    Lịch học
                  </button>
                  <button
                    className="search__then__button"
                    onClick={handleBaiTap}
                  >
                    Bài tập
                  </button>
                </div>
              )}
              <Icon
                icon="hugeicons:message-notification-01"
                width="26"
                height="26"
                className="search__then__Icon"
              />
              <Icon
                icon="mingcute:notification-newdot-line"
                width="26"
                height="26"
                className="search__then__Icon"
              />
            </div>
          </div>
          {/* <HitRoom
            showSchedule={showSchedule}
            showHomework={showHomework}
            bool={bool}
          /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClassStudy;
