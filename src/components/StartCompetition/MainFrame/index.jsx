import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";

import "./style.scss";

const MainFrame = ({ onSetSub, setOpen }) => {
  const [frame, setFrame] = useState(false);
  const handleOpen = () => {
    setFrame(false);
    setOpen(true);
  };
  return (
    <>
      <div className="mainxmark">
        {!frame && (
          <div className="mainxmark__pos">
            <h1 className="mainxmark__pos__h1">BẠN CHẮC CHẮN MUỐN NỘP BÀI?</h1>
            <div className="mainxmark__pos__button">
              <button onClick={() => setFrame(!frame)}>NỘP BÀI</button>
              <button onClick={() => onSetSub(false)}>QUAY LẠI</button>
            </div>
            <i
              className="fa-solid fa-xmark mainxmark__pos__i"
              onClick={() => onSetSub(false)}
            ></i>
          </div>
        )}

        {frame && (
          <div className="mainxmark__relate">
            <h1 className="mainxmark__relate__h1">NỘP BÀI THÀNH CÔNG!</h1>
            <div className="mainxmark__relate__button">
              <button onClick={handleOpen}>QUAY LẠI</button>
            </div>
            <i
              className="fa-solid fa-xmark mainxmark__relate__i"
              onClick={() => onSetSub(false)}
            ></i>
          </div>
        )}
      </div>
    </>
  );
};

export default MainFrame;
