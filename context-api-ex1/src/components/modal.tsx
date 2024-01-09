import React from "react";
import { Notification } from "../contexts/notificationContext";

const Modal: React.FC<Notification> = ({ message, type, time }) => {
  return (
    <div>
      <div>{type}</div>
      <div>{message}</div>
      <div>{time}</div>
    </div>
  );
};

export default Modal;
