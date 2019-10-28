import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    position: 'absolute',
    bottom: '5px',
    width: 'calc(100vw - 40px)'
  };

  if (notification === '') {
    return <div/>
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = ({ notification }) => ({ notification});

export default connect(mapStateToProps)(Notification);
