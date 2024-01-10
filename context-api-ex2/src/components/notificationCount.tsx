import React, { useState } from "react";
import Modal from "./modal";
import { createPortal } from "react-dom";
import { useNotificationsContext } from "../contexts/notificationContext";

const NotificationCount: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { state, NotificationsCount } = useNotificationsContext();
  const lastNotification = state[state.length - 1];
  return (
    <div>
      <div>{NotificationsCount}</div>
      <button onClick={() => setShowModal(true)}>Show Notification</button>
      {showModal &&
        state.length !== 0 &&
        createPortal(
          <Modal
            message={lastNotification.message}
            time={lastNotification.time}
            type={lastNotification.type}
            onClose={() => setShowModal(false)}
            isOpen={showModal}
          ></Modal>,
          document.body
        )}
    </div>
  );
};

export default NotificationCount;
