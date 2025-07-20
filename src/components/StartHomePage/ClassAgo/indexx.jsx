import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { adv } from "../../../data/app";
import "./style.scss";

const AdvList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const visibleItems = 3;
  const totalItems = adv?.length || 0;

  const scrollToIndex = () => {
    if (sliderRef.current && sliderRef.current.children[0]) {
      const itemWidth = sliderRef.current.children[0].offsetWidth + 20;
      sliderRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToIndex();
  }, [currentIndex]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= totalItems - visibleItems) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [totalItems, visibleItems]);

  if (!adv || totalItems === 0) {
    return <div>Chưa có thông báo nào.</div>;
  }

  return (
    <div className="dukien-slider">
      <div className="dukien" ref={sliderRef}>
        {adv.map((item, index) => (
          <div className="dukien__box" key={index}>
            <strong>THÔNG BÁO: {item.name}</strong>
            <p>Người tạo: {item.creater}</p>
            <p>
              <Icon icon="mingcute:time-line" /> {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvList;
