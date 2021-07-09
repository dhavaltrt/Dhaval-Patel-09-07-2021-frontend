import React from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

const TheFooter = () => {
  return (
    <>
      {/* Notificaton container */}
      <NotificationContainer />
    </>
  );
};

export default React.memo(TheFooter);
