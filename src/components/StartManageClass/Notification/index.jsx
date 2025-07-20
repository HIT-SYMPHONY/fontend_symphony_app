import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";

const Notification = () => {
  // State to track which notification is expanded
  const [expandedId, setExpandedId] = useState(null);
  // State to track which notification is being edited and its content
  const [editState, setEditState] = useState({ id: null, content: "" });
  // State to manage notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 2,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 3,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 4,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 5,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 6,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 7,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
    {
      id: 8,
      class: "Private - Đợt hoa - 2025",
      title: "Thay đổi lịch học bồi dưỡng thứ 3",
      date: "20/02/2000",
      creator: "Nguyễn Văn A",
      content: "Nội dung thông báo chi tiết ở đây.",
    },
  ]);

  // Toggle expansion for a specific notification
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    // Reset edit state when collapsing
    if (expandedId === id) {
      setEditState({ id: null, content: "" });
    }
  };

  // Start editing a notification
  const startEdit = (id, content) => {
    setEditState({ id, content });
  };

  // Handle content change during editing
  const handleContentChange = (e) => {
    setEditState({ ...editState, content: e.target.value });
  };

  // Save edited content
  const saveEdit = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, content: editState.content }
          : notification
      )
    );
    setEditState({ id: null, content: "" });
  };

  return (
    <div className="notification">
      <h3>Tất cả thông báo</h3>
      <div className="notification__sum">
        <div className="notification__sum__table">
          <h4>STT</h4>
          <h4>Lớp</h4>
          <h4>Tên thông báo</h4>
          <h4>Ngày tạo</h4>
          <h4>Người tạo</h4>
        </div>
        <div className="notification__sum__list">
          {notifications.map((item) => (
            <div className="notification__sum__list__box" key={item.id}>
              <div className="notification__sum__list__box__item">
                <h5>{item.id}</h5>
                <h5>{item.class}</h5>
                <h5>{item.title}</h5>
                <h5>{item.date}</h5>
                <h5>{item.creator}</h5>
                <Icon
                  icon={
                    expandedId === item.id
                      ? "mingcute:up-fill"
                      : "mingcute:down-fill"
                  }
                  width="24"
                  height="24"
                  className="notification__sum__list__box__item__icon"
                  onClick={() => toggleExpand(item.id)}
                />
              </div>
              {expandedId === item.id && (
                <>
                  <hr />
                  <div className="notification__sum__list__box__para">
                    <div className="notification__sum__list__box__para__begin">
                      <h4>Nội dung: </h4>
                      {editState.id === item.id ? (
                        <button onClick={() => saveEdit(item.id)}>
                          <Icon
                            icon="material-symbols:save"
                            width="15"
                            height="15"
                          />{" "}
                          Lưu
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(item.id, item.content)}
                        >
                          <Icon
                            icon="iconamoon:edit-fill"
                            width="15"
                            height="15"
                          />{" "}
                          chỉnh sửa
                        </button>
                      )}
                    </div>

                    {editState.id === item.id ? (
                      <textarea
                        value={editState.content}
                        onChange={handleContentChange}
                        className="notification__sum__list__box__para__textarea"
                      />
                    ) : (
                      <div className="notification__sum__list__box__para__end">
                        <p>{item.content}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
