import React from 'react';

const Controls = ({ speeds, onClose }) => {
  return (
    <div className="video-control-wrap">
      <div className="video-control">
        <div className="control-panel">
          <button
            className="icon icon-video-close ctrl-btn"
            onClick={onClose}
          ></button>
          <button className="icon icon-video-audio ctrl-btn"></button>
          <button className="icon icon-video-video ctrl-btn"></button>
          <button className="icon icon-video-stream ctrl-btn"></button>
          <button className="icon icon-video-rule ctrl-btn"></button>
          <button className="icon icon-video-track ctrl-btn"></button>
          <button className="icon icon-video-data ctrl-btn"></button>
        </div>
        <div className="video-title">A1楼南走廊: {speeds}kbps</div>
      </div>
    </div>
  );
};

export default Controls;
