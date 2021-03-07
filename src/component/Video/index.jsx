import React,{useRef,useState,useEffect} from 'react';
import './style.less';
import flvjs from 'flv.js';


const Video = ({url}) => {
    const videoRef = useRef(null)
    const flvPlayerRef = useRef(null);

    useEffect(() => {
        if (flvjs.isSupported() && !flvPlayerRef.current && url) {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: url,
                //isLive:true
            },{
                enableStashBuffer:false,
                stashInitialSize:'400KB'
            });
            flvPlayerRef.current = flvPlayer;
            flvPlayer.attachMediaElement(videoRef.current);
            flvPlayer.on(flvjs.Events.ERROR,(error) => {
                console.log('ERROR',error)
            })
            flvPlayer.on(flvjs.Events.LOADING_COMPLETE,(info) => {
                console.log('LOADING_COMPLETE',info)
            })
            flvPlayer.on(flvjs.Events.RECOVERED_EARLY_EOF,(info) => {
                console.log('RECOVERED_EARLY_EOF',info)
            })
            flvPlayer.on(flvjs.Events.MEDIA_INFO,(info) => {
                console.log('MEDIA_INFO',info)
            })
            flvPlayer.on(flvjs.Events.STATISTICS_INFO,(info) => {
                console.log('STATISTICS_INFO',info)
            })
            
            videoRef.current.addEventListener('canplay',(info) => {
                console.log('videoRef',info)
            })
          
            flvPlayer.load();
            flvPlayer.play();
        }
        return () => {
            
        }
    }, [url])

    return (
        <div className="video-box">
            {
                url ? <video className="video" autoPlay={true}  ref={videoRef} ></video> : <div className="no-video">暂无视频资源</div>
            }
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
                    A1楼南走廊: 66kbps
                </div>
            </div>
        </div>
    )
}

export default Video;