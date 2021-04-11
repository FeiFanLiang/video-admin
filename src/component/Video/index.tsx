import React, {
  useRef,
  useState,
  useEffect,
  FC,
  MutableRefObject,
  DragEventHandler,
  Ref,
} from 'react';
import './style.less';
import flvjs from 'flv.js';
import Controls from './component/Controls';

interface VideoProps {
  active: boolean;
  url: string;
  onClick: () => void;
  onDrop: (video: any) => void;
  onClose: () => void;
}

const Video: FC<VideoProps> = ({ active, url, onClick, onDrop, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const flvPlayerRef = useRef<flvjs.Player | null>(null);
  const [speeds, setSpeeds] = useState(0);

  const handleDrop: DragEventHandler = (e) => {
    const videoString = e.dataTransfer.getData('application/json');
    if (videoString) {
      onDrop(JSON.parse(videoString));
    }
  };

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
          stashInitialSize: 10,
        },
      );
      flvPlayerRef.current = flvPlayer;
      flvPlayer.attachMediaElement(videoRef.current as HTMLVideoElement);
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

      (videoRef.current as HTMLVideoElement).addEventListener(
        'canplay',
        (info) => {
          console.log('videoRef', info);
          //videoRef.current.muted = false;
        },
      );

      flvPlayer.load();
      flvPlayer.play();
    }
    if (flvPlayerRef.current && !url) {
      (flvPlayerRef.current as flvjs.Player).unload();
      flvPlayerRef.current.destroy();
      flvPlayerRef.current = null;
    }
  }, [url]);

  return (
    <div
      className={`video-box ${active ? 'active' : ''}`}
      onClick={onClick}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      {url ? (
        <>
          <Controls speeds={speeds} onClose={onClose} />
          <video
            className="video"
            autoPlay={true}
            muted={true}
            ref={videoRef}
          ></video>
        </>
      ) : (
        <div className="no-video">暂无视频资源</div>
      )}
    </div>
  );
};

export default Video;
