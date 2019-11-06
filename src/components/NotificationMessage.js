import React from 'react';
const NotificationMessage = ({ iconName, message }) => {
  return (
    <div>
      {iconName} {message}
    </div>
  );
};

export default NotificationMessage;
