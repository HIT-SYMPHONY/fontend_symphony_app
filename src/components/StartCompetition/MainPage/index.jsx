import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const MainCompetition = () => {
  const navigate = useNavigate();
  const contests = [
    {
      id: 1,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
    {
      id: 3,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
    {
      id: 4,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
    {
      id: 5,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
    {
      id: 6,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
    {
      id: 7,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
    {
      id: 8,
      name: "HIT Contest Series 2025",
      startDate: "14/07/2025",
      status: "Đang diễn ra",
    },
  ];

  return (
    <div className="competition">
      <div className="competition__left">
        <div className="competition__left__title">
          <Icon
            icon="streamline-ultimate:ranking-stars-ribbon-bold"
            width="30"
            height="30"
            className="competition__left__title__icon"
          />
          <h2>Cuộc thi</h2>
        </div>
        <div className="competition__left__board">
          <i className="fa-solid fa-circle-info board"></i>
        </div>
        <div className="competition__left__bang">
          {contests.map((contest) => (
            <div className="competition__left__bang__box" key={contest.id}>
              <div className="competition__left__bang__box__board"></div>
              <div className="competition__left__bang__box__information">
                <h4>{contest.name}</h4>
                <div className="competition__left__bang__box__information__list">
                  <span className="competition__left__bang__box__information__list__span1">
                    {contest.status}
                  </span>
                  <span
                    className={
                      contest.id % 2 == 0
                        ? "competition__left__bang__box__information__list__span2"
                        : "competition__left__bang__box__information__list__span3"
                    }
                  >
                    {contest.id % 2 == 0 ? "Đăng ký" : "Đã đăng ký"}
                  </span>
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <p>Ngày bắt đầu: {contest.startDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="competition__among"></div>
      <div className="competition__right">
        <h2>Bạn đang tham gia</h2>
        <div className="competition__right__body">
          <div
            className="competition__right__body__board"
            onClick={() => navigate("/competition/information")}
          >
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <hr />
        </div>
        <h3>Giới thiệu</h3>
        <div className="competition__right__text">
          <span>text...</span>
        </div>
      </div>
    </div>
  );
};

export default MainCompetition;
