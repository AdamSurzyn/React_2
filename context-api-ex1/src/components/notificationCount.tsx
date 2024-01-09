import React, { useState } from "react";
type NotificationsCountProp = {
  NotificationsCount: number;
};

const NotificationCount: React.FC<NotificationsCountProp> = ({
  NotificationsCount,
}) => {
  return (
    <div>
      <div>{NotificationsCount}</div>
    </div>
  );
};

export default NotificationCount;
