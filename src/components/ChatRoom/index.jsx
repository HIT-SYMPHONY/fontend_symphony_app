import React, { useState } from "react";
import logo from "./../../assets/img/Logo.png";
import { Icon } from "@iconify/react";
import MessageMain from "../Message";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState({
    id: null,
    img: "",
    name: 0,
    number: 0,
    style: 0,
    state: 0,
  });

  const room = [
    {
      id: 1,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "1",
      style: 1,
      state: "Đang hoạt động",
    },
    {
      id: 2,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "",
      style: 2,
      state: "Đang hoạt động",
    },
    {
      id: 3,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "1",
      style: 1,
      state: "Không hoạt động",
    },

    {
      id: 4,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "",
      style: 2,
      state: "Không hoạt động",
    },
    {
      id: 5,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "",
      style: 2,
      state: "Không hoạt động",
    },
    {
      id: 6,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "",
      style: 2,
      state: "Không hoạt động",
    },
    {
      id: 7,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "",
      style: 2,
      state: "Không hoạt động",
    },
    {
      id: 8,
      img: "",
      name: "HIT - Public - Photoshop - 2025",
      number: "",
      style: 2,
      state: "Không hoạt động",
    },
  ];

  const handleRoomClick = (roomItem) => {
    setSelectedRoom(roomItem);
  };

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="chatroom">
        <div className="chatroom__left">
          <div className="chatroom__left__begin">
            <img src={logo} alt="" width="45" height="45" />
            <Icon
              icon="material-symbols:home-rounded"
              width="40"
              height="40"
              className="chatroom__left__begin__icon"
              onClick={() => navigate("/")}
            />
            <Icon
              icon="streamline-flex:mail-send-email-message-circle-solid"
              width="30"
              height="30"
              onClick={() => setShow(!show)}
              className={
                show
                  ? "chatroom__left__begin__icon"
                  : "chatroom__left__begin__icon Icon"
              }
            />
          </div>
          <div className="chatroom__left__end">
            <hr />
            <div className="chatroom__left__end__icon"></div>
            <p>( Tên )</p>
          </div>
        </div>
        <div className="chatroom__among">
          <h3>Phòng chat lớp</h3>
          <div className="chatroom__among__search">
            <input type="text" placeholder="Tìm kiếm...." />
            <i className="fa fa-search icon"></i>
          </div>
          <div className="chatroom__among__list">
            {room.map((item) => (
              <div
                className={`amonglist ${
                  selectedRoom.id === item.id ? "color" : ""
                }`}
                key={item.id}
                onClick={() => handleRoomClick(item)}
              >
                <div className="amonglist__img">
                  {item.style === 1 ? (
                    ""
                  ) : (
                    <i className="fa-solid fa-circle"></i>
                  )}
                </div>
                <h4>{item.name}</h4>
                {item.number ? (
                  <span className="amonglist__span">{item.number}</span>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="chatroom__right">
          <MessageMain selectedRoom={selectedRoom} />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
