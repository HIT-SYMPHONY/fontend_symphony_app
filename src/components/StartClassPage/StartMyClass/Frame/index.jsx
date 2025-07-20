import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { GlobalContext } from "../../../../dataContext";

import "./style.scss";

const Frame = ({ onSetSub, setPage }) => {
  const [frame, setFrame] = useState(false);
  const handlePage = () => {
    onSetSub(false);
    setPage(true);
  };
  return (
    <>
      <div className="xmark">
        {!frame && (
          <div className="xmark__pos">
            <h1 className="xmark__pos__h1">BẠN CHẮC CHẮN MUỐN NỘP BÀI?</h1>
            <div className="xmark__pos__button">
              <button onClick={() => setFrame(!frame)}>NỘP BÀI</button>
              <button onClick={() => onSetSub(false)}>QUAY LẠI</button>
            </div>
            <i
              className="fa-solid fa-xmark xmark__pos__i"
              onClick={() => onSetSub(false)}
            ></i>
          </div>
        )}

        {frame && (
          <div className="xmark__relate">
            <h1 className="xmark__relate__h1">NỘP BÀI THÀNH CÔNG!</h1>
            <div className="xmark__relate__button">
              <button onClick={handlePage}>QUAY LẠI</button>
            </div>
            <i
              className="fa-solid fa-xmark xmark__relate__i"
              onClick={() => onSetSub(false)}
            ></i>
          </div>
        )}
      </div>
    </>
  );
};

export default Frame;
