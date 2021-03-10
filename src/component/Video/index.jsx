import React, { useRef, useState, useEffect } from 'react';
import './style.less';
import flvjs from 'flv.js';
import Controls from './component/Controls';

const Video = ({ active, url, onClick }) => {
  const videoRef = useRef(null);
  const flvPlayerRef = useRef(null);
  const [speeds, setSpeeds] = useState(0);

  useEffect(() => {
    if (flvjs.isSupported() && !flvPlayerRef.current && url) {
      const flvPlayer = flvjs.createPlayer(
        {
          type: 'flv',
          url: url,
          isLive: true,
        },
        {
          enableStashBuffer: false,
          stashInitialSize: '10KB',
        },
      );
      flvPlayerRef.current = flvPlayer;
      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.on(flvjs.Events.ERROR, (error) => {
        console.log('ERROR', error);
      });
      flvPlayer.on(flvjs.Events.LOADING_COMPLETE, (info) => {
        console.log('LOADING_COMPLETE', info);
      });
      flvPlayer.on(flvjs.Events.RECOVERED_EARLY_EOF, (info) => {
        console.log('RECOVERED_EARLY_EOF', info);
      });
      flvPlayer.on(flvjs.Events.MEDIA_INFO, (info) => {
        console.log('MEDIA_INFO', info);
      });
      flvPlayer.on(flvjs.Events.STATISTICS_INFO, (info) => {
        //console.log('STATISTICS_INFO',info)
        setSpeeds(Math.ceil(info.speed));
      });

      videoRef.current.addEventListener('canplay', (info) => {
        console.log('videoRef', info);
        //videoRef.current.muted = false;
      });

      flvPlayer.load();
      flvPlayer.play();
    }
    return () => {
      flvPlayerRef.current.destroy();
    };
  }, [url]);

  return (
    <div className={`video-box ${active ? 'active' : ''}`} onClick={onClick}>
      {url ? (
        <video
          className="video"
          autoPlay={true}
          muted={true}
          ref={videoRef}
        ></video>
      ) : (
        <div className="no-video">暂无视频资源</div>
      )}
      <Controls speeds={speeds} />
    </div>
  );
};

export default Video;
