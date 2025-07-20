import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { work } from "../../../../data/app";
import { GlobalContext } from "../../../../dataContext";
import { Outlet, useLocation } from "react-router-dom";
import icon from "./../../../../assets/img/Ellipse.png";
import logo from "./../../../../assets/img/logo.png";
import Member from "../Member";
import Exam from "../Exam";
import Frame from "../Frame";
import "./style.scss";
import Logout from "../../../Logout";

export const HomeInformation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${day}/${month}`;
  const lop = [1, 2, 3, 4, 5, 6, 7];

  const [hwork, setHWork] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const toggleLessonBox = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      {open ? (
        <Member />
      ) : (
        <div className="informationclass">
          <div className="informationclass__gioithieu">
            <div className="informationclass__gioithieu__context">
              <div className="informationclass__gioithieu__context__name">
                <h1>PRIVATE: Đồ họa - 2025</h1>
                <span>ĐANG HỌC</span>
              </div>
              <div className="informationclass__gioithieu__context__error">
                <Icon
                  icon="streamline-plump:information-circle-solid"
                  width="26"
                  height="26"
                />
                <h4>Thông tin lớp học</h4>
              </div>
              <div className="informationclass__gioithieu__context__noidung">
                <strong>Mô tả: </strong>
                <p>
                  dfjagoigjojawjefkmasdlfnoadsijfdpofjkfgsiogjosjgosigosdgsijgogjsoidgẹhigaeojpoatpigogjrijgoonafoweigaogego
                </p>
                <div className="informationclass__gioithieu__context__noidung__row">
                  <strong>Leader: ljknyfytfyihoijpy</strong>
                  <strong>Lịch học: 18h - 20h Thứ 4 hàng tuần</strong>
                </div>
                <div className="informationclass__gioithieu__context__noidung__row">
                  <strong>Ngày bắt đầu: 12/01/2025</strong>
                  <strong>Độ dài lớp học: 8 buổi</strong>
                </div>
              </div>
            </div>
            <div className="informationclass__gioithieu__image">
              <div className="image">
                <Icon
                  icon="streamline-flex:mail-send-email-message-circle-solid"
                  width="24"
                  height="24"
                  className="image__icon"
                  onClick={() => setOpen(true)}
                />
                <span>Chat room</span>
              </div>
            </div>
          </div>
          <div className="informationclass__lesson">
            <div
              className={`informationclass__lesson__left ${hwork ? "all" : ""}`}
            >
              <div className="informationclass__lesson__left__begin">
                <div className="informationclass__lesson__left__begin__icon">
                  <div className="informationclass__lesson__left__begin__book">
                    <Icon
                      icon="material-symbols:book-2-rounded"
                      width="26"
                      height="26"
                    />
                    <p>Bài Học</p>
                  </div>
                </div>
                <div className="informationclass__lesson__left__begin__pair">
                  <div className="informationclass__lesson__left__begin__pair__tap">
                    <button>Sắp xếp theo</button>
                  </div>
                  <Icon
                    icon="material-symbols:menu-book-rounded"
                    width="26"
                    height="26"
                    className={`informationclass__lesson__left__begin__pair__${
                      hwork ? "no" : "have"
                    }`}
                    onClick={() => setHWork(!hwork)}
                  />
                </div>
              </div>
              <div className="informationclass__lesson__left__end">
                {lop && Array.isArray(lop) ? (
                  lop.map((_, index) => (
                    <div className="end" key={index}>
                      <div className="lesson-item">
                        <span>{index + 1}</span>
                        <div className="lesson-details">
                          <p>
                            Bài {index + 1}:{" "}
                            {index % 2 != 0
                              ? "Làm quen với phần mềm Adobe Photoshopvà Adobe Illustrator"
                              : "Kiểm tra"}
                          </p>
                        </div>
                        <div
                          className="lesson-date"
                          onClick={() => toggleLessonBox(index)}
                        >
                          <p>30/06/2025</p>
                          <i
                            className={`fa-solid ${
                              expandedItems[index]
                                ? "fa-caret-down"
                                : "fa-caret-up"
                            }`}
                          ></i>
                        </div>
                      </div>
                      <div
                        className="lesson-box"
                        style={{
                          display: expandedItems[index] ? "block" : "none",
                        }}
                      >
                        {index % 2 !== 0 ? (
                          <>
                            <p onClick={() => navigate("/information/lesson")}>
                              Đề cương bài học
                            </p>
                            <p>Tài liệu tham khảo</p>
                          </>
                        ) : (
                          <p onClick={() => navigate("/information/exam")}>
                            Bài kiểm tra
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Không có dữ liệu bài học!</div>
                )}
              </div>
            </div>
            {hwork && (
              <div className="informationclass__lesson__right">
                <h3>Bài Tập</h3>
                <div className="scroll">
                  {work && Array.isArray(work) ? (
                    work.map((item, index) => (
                      <div className="right" key={index}>
                        <div className="right__tap">
                          <div className="right__tap__tinhtrang">
                            <span
                              className={
                                item.style === 1
                                  ? "ngay back-one"
                                  : item.style === 2
                                  ? "ngay back-two"
                                  : "ngay back-three"
                              }
                            >
                              {formattedDate}
                            </span>
                            <div
                              className={
                                item.style === 1
                                  ? "color-one"
                                  : item.style === 2
                                  ? "color-two"
                                  : "color-three"
                              }
                            >
                              <h4>{item.work}</h4>
                              <p>Tình trạng: {item.hientrang}</p>
                            </div>
                          </div>
                          <div className="right__tap__noidung">
                            <div
                              className={
                                item.style === 1
                                  ? "right__tap__noidung__colum back-one"
                                  : item.style === 2
                                  ? "right__tap__noidung__colum back-two"
                                  : "right__tap__noidung__colum back-three"
                              }
                            ></div>
                            <div className="right__tap__noidung__contextclass">
                              <h4>{item.classname}</h4>
                              <div className="contextclass">
                                <span>Tên bài tập: </span>
                                <p>{item.name}</p>
                              </div>
                              <div className="contextclass">
                                <span>Người giao bài: </span>
                                <p>{item.teacher}</p>
                              </div>
                              <div className="contextclass">
                                <span>Thời gian giao: </span>
                                <p>{item.start}</p>
                              </div>
                              <div className="contextclass">
                                <span>Hạn nộp: </span>
                                <p>{item.begin}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>Không có dữ liệu bài tập!</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const InformationClass = () => {
  const [frame, setFrame] = useState(false);
  const [page, setPage] = useState(false);
  const [sub, setSub] = useState(false);
  const context = useContext(GlobalContext);
  const [showMain, setShowMain] = useState(true);

  if (!context) {
    console.error(
      "GlobalContext is undefined. Ensure InformationClass is wrapped in GlobalProvider."
    );
    return <div>Lỗi: Không tìm thấy GlobalContext!</div>;
  }

  const { updateGlobalState, path } = context;
  const k = 1;
  return (
    <div className="homepage">
      <div className="homepage__choose">
        <div className="homepage__choose__img">
          <img src={icon} alt="Profile" />
        </div>
        <h3 className="homepage__choose__h3">Chào (tên)! </h3>
        <div
          className={
            path[k].home
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
            path[k].classroom
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => {
            updateGlobalState(2);
          }}
        >
          <i className="fa-solid fa-book"></i>
          <span>Lớp học</span>
        </div>
        {path[k].show && (
          <div>
            <div
              className={
                path[k].myclass
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
                path[k].myresult
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
            path[k].competition
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
            path[k].account
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
            path[k].logout
              ? "homepage__choose__click origin"
              : "homepage__choose__click"
          }
          onClick={() => setFrame(true)}
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
              {showMain ? (
                <Icon
                  icon="line-md:menu-unfold-left"
                  width="26"
                  height="26"
                  className="search__then__Icon"
                  onClick={() => setShowMain(!showMain)}
                />
              ) : (
                <div>
                  <Icon
                    icon="line-md:menu-unfold-right"
                    width="26"
                    height="26"
                    className="search__then__Icon"
                    onClick={() => setShowMain(!showMain)}
                  />
                  <Icon
                    icon="streamline-flex:mail-send-email-message-circle-solid"
                    width="26"
                    height="26"
                    className="search__then__Icon"
                  />
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
          <Outlet context={{ onSetSub: setSub, page: page }} />
        </div>
      </div>
      {sub && <Frame onSetSub={setSub} setPage={setPage} />}
      {frame ? <Logout onSetFrame={setFrame} /> : ""}
    </div>
  );
};

export default InformationClass;
