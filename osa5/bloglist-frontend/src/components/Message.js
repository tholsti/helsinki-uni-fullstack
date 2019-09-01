import React from 'react';

const Message = ({ msg, type }) => (
    <div style={{
        padding: '12px', 
        border: type === 'error' ? '2px solid red' : '2px solid green'
    }}>
        {msg}
    </div>
)

export default Message;
