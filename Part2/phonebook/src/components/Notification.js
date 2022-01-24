import React from 'react';

const Notification = ({noteStyle, message}) => {
    
    if (message === "") {
        return null
    }

  return <div style={noteStyle}>{message}</div>
};

export default Notification;
