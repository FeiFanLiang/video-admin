import React from 'react';

const Controls = ({ speeds }) => {
  return (
    <div className="video-control">
      <div className="control-panel">
        <button className="icon icon-close ctrl-btn"></button>
        <button className="icon icon-audio ctrl-btn"></button>
        <button className="icon icon-video ctrl-btn"></button>
        <button className="icon icon-stream ctrl-btn"></button>
        <button className="icon icon-rule ctrl-btn"></button>
        <button className="icon icon-track ctrl-btn"></button>
        <button className="icon icon-data ctrl-btn"></button>
      </div>
      <div className="video-title">A1楼南走廊: {speeds}kbps</div>
    </div>
  );
};

export default Controls;
