import React from 'react';


const Controls = ({speeds}) => {
    return (
        <div className="video-control">
                <div className="control-panel">
                    <i className="icon icon-close"></i>
                    <i className="icon icon-audio"></i>
                    <i className="icon icon-video"></i>
                    <i className="icon icon-stream"></i>
                    <i className="icon icon-rule"></i>
                    <i className="icon icon-track"></i>
                    <i className="icon icon-data"></i>
                </div>
                <div className="video-title">
                    A1楼南走廊: {speeds}kbps
                </div>
            </div>
    )
}

export default Controls;