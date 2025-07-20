import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";

const TableResult = ({ onSetSub }) => {
  // Dữ liệu mẫu
  const list = [1, 2, 3, 4, 5, 6, 7];
  const lop = [
    {
      name: "Buổi 8: Kiểm tra",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 1,
    },
    {
      name: "Bài tập buổi 1",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 2,
    },
    {
      name: "Bài tập buổi 2",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 2,
    },
    {
      name: "Bài tập buổi 3",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 2,
    },
    {
      name: "Bài tập buổi 4",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 2,
    },
    {
      name: "Bài tập buổi 4",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 2,
    },

    {
      name: "Bài tập buổi 4",
      nguoinop: "Người nộp: Nguyễn Thị M",
      timenop: "Ngày kiểm tra: 30/06/2025",
      nguoigiao: "Người giao: Nguyễn Thị N",
      timegiao: "Thời gian làm bài: 01 : 30 : 00",
      diem: "80",
      style: 2,
    },
  ];

  // Khởi tạo trạng thái add cho từng mục trong list
  const [addStates, setAddStates] = useState(list.map(() => false));

  // Hàm toggle trạng thái add cho một mục cụ thể
  const toggleAdd = (index) => {
    setAddStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="table-result">
      <div className="table-result__head">
        <div className="table-result__head__icon">
          <Icon
            icon="fluent:clipboard-text-32-filled"
            width="30"
            height="30"
            className="table-result__head__icon__fill"
          />
          <h2>Bảng kết quả</h2>
        </div>
        <div className="table-result__head__toggle">
          <p className="toggle" onClick={() => onSetSub(true)}>
            Học tập
          </p>
          <p onClick={() => onSetSub(false)}>Cuộc thi</p>
        </div>
      </div>

      <div className="table-result__body">
        {list.map((item, index) => (
          <div className="body" key={index}>
            <div className="body__img">
              <div className="body__img__hinhanh"></div>
              <div className="body__img__tieumuc">
                <h5>PRIVATE: Đồ họa - 2025</h5>
                <div className="body__img__tieumuc__space">
                  <span>Đang diễn ra</span>
                  <div className="space">
                    <span>6 bài tập</span>
                    <span>1 bài kiểm tra</span>
                    <Icon
                      icon={
                        addStates[index]
                          ? "mingcute:up-fill"
                          : "mingcute:down-fill"
                      }
                      width="24"
                      height="24"
                      className="space__mau"
                      onClick={() => toggleAdd(index)}
                    />
                  </div>
                </div>
                <p>Leader: Vũ Gia Chiến</p>
              </div>
            </div>
            {addStates[index] && (
              <div className="body__thongtin">
                <hr />
                <div className="body__thongtin__title">
                  <span>Tên Bài</span>
                  <span>Điểm</span>
                  <span>Thông tin chi tiết</span>
                </div>
                <div className="body__thongtin__table">
                  {lop.map((item, index) => (
                    <div className="list-table" key={index}>
                      <div className="list-table__title">
                        <Icon
                          icon={
                            item.style === 1
                              ? "ph:exam-fill"
                              : "material-symbols:menu-book-rounded"
                          }
                          width="24"
                          height="24"
                          className="list-table__title__icon"
                        />
                        <h5>{item.name}</h5>
                      </div>
                      <h3 className="list-table__h3">{item.diem}</h3>
                      <div className="list-table__thongtin">
                        <p>{item.nguoigiao}</p>
                        <p>{item.timegiao}</p>
                      </div>
                      <div className="list-table__thongtin">
                        <p>{item.nguoinop}</p>
                        <p>{item.timenop}</p>
                      </div>
                      <Icon
                        icon="duo-icons:message-3"
                        width="40"
                        height="40"
                        className="list-table__icon"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableResult;
