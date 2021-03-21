import React, { useState } from 'react';
import './style.less';
import { Collapse, Tree, Slider, Input } from 'antd';
import {
  SearchOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import Video from '@/component/Video';
import { directionCtrlApi, powerSwitchApi } from '@/server/cmd';
const { Panel } = Collapse;
const { DirectoryTree } = Tree;
const PanelHeader = ({ title }) => {
  return (
    <div className="panel-header">
      <i></i>
      {title}
    </div>
  );
};

const treeData = [
  {
    title: '北京',
    key: '0-0',
    icon: <i className="icon icon-tree-map" />,
    children: [
      {
        title: '1.99',
        key: '0-0-0',
        icon: <i className="icon icon-camera-gun" />,
        video: {
          url:
            'ws://47.94.90.247:559/test123/192.168.0.205:8000:admin:admin12345:0:33?live=1',
        },
      },
      {
        title: '朝阳',
        key: '0-0-1',
        icon: <i className="icon icon-tree-map" />,
        children: [
          {
            title: '1.88',
            key: '0-0-0-0',
            icon: <i className="icon icon-camera-gun" />,
            video: {
              url:
                'ws://47.94.90.247:559/test123/192.168.0.205:8000:admin:admin12345:0:33?live=1',
            },
          },
        ],
      },
      {
        title: '海淀',
        icon: <i className="icon icon-tree-map" />,
        children: [
          {
            title: '1.22',
            key: '0-0-0-1',
            icon: <i className="icon icon-camera-gun" />,
            video: {
              url:
                'ws://47.94.90.247:559/test123/192.168.0.205:8000:admin:admin12345:0:33?live=1',
            },
          },
        ],
      },
    ],
  },
];

const marks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
};

const TreeRender = (props) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(props.video));
  };

  return (
    <span
      className="tree-item"
      draggable={!!props.video}
      onDragStart={handleDragStart}
      onDoubleClick={(e) => props.onDoubleClick(props.video)}
    >
      {props.title}
    </span>
  );
};

const LivePage = function () {
  const emptyVideo = {
    url: '',
  };
  const [videoList, setVideoList] = useState(
    Array.from(new Array(4)).map((el) => emptyVideo),
  );
  const handleVideoDrop = (index, newVideo) => {
    setVideoList(
      videoList.map((el, i) => {
        if (i === index) {
          return newVideo;
        }
        return el;
      }),
    );
  };
  const handleCloseVideo = (index) => {
    setVideoList(
      videoList.map((el, i) => {
        if (i === index) {
          return emptyVideo;
        }
        return el;
      }),
    );
  };

  const [lightOpen, setLight] = useState(false);
  const handleLightCtrl = () => {
    setLight(!lightOpen);
    powerSwitchApi(1, !lightOpen);
  };

  const [wiperOpen, setWiper] = useState(false);
  const handleWiperCtrl = () => {
    setWiper(!wiperOpen);
    powerSwitchApi(2, !wiperOpen);
  };

  const [ctrlSpeed, setCtrlSpeed] = useState(1);

  const handleChangeDirection = (type) => {
    directionCtrlApi(type, ctrlSpeed);
  };

  const [active, setActive] = useState(null);
  const handlePickWindow = (number) => {
    setActive(number);
  };

  const [collShow, setCollShow] = useState(false);

  return (
    <div className="live-page-wrap">
      <div className="left">
        <div className="top-box">
          <div className="search-box">
            <Input suffix={<SearchOutlined />} />
          </div>
          <div className="tree-list-box">
            <Collapse
              defaultActiveKey={['1']}
              ghost
              expandIconPosition="right"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <CaretUpOutlined style={{ color: '#00AAFF' }} />
                ) : (
                  <CaretDownOutlined />
                )
              }
            >
              <Panel
                header={
                  <div className="panel-header">
                    <i className="icon icon-equipment-group"></i>
                    <span>设备列表</span>
                  </div>
                }
                key="1"
              >
                <div className="tree-box">
                  <DirectoryTree
                    defaultExpandAll
                    defaultSelectedKeys={['0-0-0']}
                    treeData={treeData}
                    titleRender={(nodeData) => (
                      <TreeRender
                        {...nodeData}
                        onDoubleClick={(video) =>
                          handleVideoDrop(active ? active : 0, video)
                        }
                      />
                    )}
                  />
                </div>
              </Panel>
              <Panel
                header={
                  <div className="panel-header">
                    <i className="icon icon-admin-group"></i>
                    <span>系统分组</span>
                  </div>
                }
                key="2"
              ></Panel>
              <Panel
                header={
                  <div className="panel-header">
                    <i className="icon icon-round-group"></i>
                    <span>轮巡分组</span>
                  </div>
                }
                key="3"
              ></Panel>
            </Collapse>
          </div>
        </div>
        <div className="console-box">
          <div className="title">
            <i className="icon icon-cloud-ctrl"></i>
            云台控制
          </div>
          <div className="console-panel">
            <div className="panel-button">
              <div className="button-col">
                <button
                  className="icon icon-ctrl-left-up"
                  onClick={() => handleChangeDirection(17)}
                ></button>
                <button
                  className="icon icon-ctrl-up"
                  onClick={() => handleChangeDirection(13)}
                ></button>
                <button
                  className="icon icon-ctrl-right-up"
                  onClick={() => handleChangeDirection(18)}
                ></button>
                <button className="icon icon-ctrl-less"></button>
                <button className="last icon icon-gq"></button>
                <button className="last icon icon-ctrl-add"></button>
              </div>
              <div className="button-col">
                <button
                  className="icon icon-ctrl-left"
                  onClick={() => handleChangeDirection(15)}
                ></button>
                <span className="placeholder"></span>
                <button
                  className="icon icon-ctrl-right"
                  onClick={() => handleChangeDirection(16)}
                ></button>
                <button className="icon icon-ctrl-less"></button>
                <button className="icon icon-focus last"></button>
                <button className="last icon icon-ctrl-add"></button>
              </div>
              <div className="button-col">
                <button
                  className="icon icon-ctrl-down-left"
                  onClick={() => handleChangeDirection(19)}
                ></button>
                <button
                  className="icon icon-ctrl-down"
                  onClick={() => handleChangeDirection(14)}
                ></button>
                <button
                  className="icon icon-ctrl-down-right"
                  onClick={() => handleChangeDirection(20)}
                ></button>
                <button className="icon icon-ctrl-less"></button>
                <button className="icon icon-yj last"></button>
                <button className="last icon icon-ctrl-add"></button>
              </div>
            </div>
            <div className="panel-slider">
              <span>速度</span>
              <div className="slider-wrap">
                <Slider
                  value={ctrlSpeed}
                  marks={marks}
                  step={1}
                  min={1}
                  max={7}
                  tooltipVisible={false}
                  onChange={(speed) => setCtrlSpeed(speed)}
                />
              </div>
            </div>
            <div className="panel-control">
              <button
                className="icon icon-ctrl-light"
                onClick={handleLightCtrl}
              ></button>
              <button
                className="icon icon-ctrl-wiper"
                onClick={handleWiperCtrl}
              ></button>
              <button className="icon icon-ctrl-position"></button>
            </div>
            <div className="panel-setting">
              <span>预置位:</span>
              <Input></Input>
              <button className="icon icon-ctrl-setting"></button>
              <button className="icon icon-ctrl-use"></button>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="window-wrap">
          <div className="normal-row">
            {videoList.slice(0, 2).map((video, index) => {
              return (
                <div className="video-window" key={index}>
                  <Video
                    active={active === index}
                    url={video.url}
                    onClick={() => handlePickWindow(index)}
                    onDrop={(e) => handleVideoDrop(index, e)}
                    onClose={() => handleCloseVideo(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="normal-row">
            {videoList.slice(2, 4).map((video, index) => (
              <div className="video-window" key={index + 2}>
                <Video
                  active={active === index + 2}
                  url={video.url}
                  onClick={() => handlePickWindow(index + 2)}
                  onDrop={(e) => handleVideoDrop(index + 2, e)}
                  onClose={() => handleCloseVideo(index + 2)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="video-bottom-panel">
          <div className="left-panel">
            <i className="icon icon-close"></i>
            <i className="icon icon-picture"></i>
            <i className="icon icon-user-group"></i>
            <i className="icon icon-audio"></i>
            <i className="icon icon-data"></i>
            <i className="icon icon-rule"></i>
            <i className="icon icon-track"></i>
          </div>
          <div className="right-panel">
            <i
              className="icon-window icon"
              onClick={() => setCollShow(!collShow)}
            ></i>
            <i className="icon-full-window icon"></i>
            <div
              className="window-panel"
              style={{ display: collShow ? 'block' : 'none' }}
            >
              <div className="icon-row">
                <div className="icon-panel-item">
                  <i className="icon icon-window-1"></i>
                  <span>1分屏</span>
                </div>
                <div className="icon-panel-item">
                  <i className="icon icon-window-4"></i>
                  <span>4分屏</span>
                </div>

                <div className="icon-panel-item">
                  <i className="icon icon-window-6"></i>
                  <span>6分屏</span>
                </div>
              </div>
              <div className="icon-row">
                <div className="icon-panel-item">
                  <i className="icon icon-window-8"></i>
                  <span>8分屏</span>
                </div>
                <div className="icon-panel-item">
                  <i className="icon icon-window-9"></i>
                  <span>9分屏</span>
                </div>
                <div className="icon-panel-item">
                  <i className="icon icon-window-16"></i>
                  <span>16分屏</span>
                </div>
              </div>
              <div className="icon-row">
                <div className="icon-panel-item">
                  <i className="icon icon-window-24"></i>
                  <span>24分屏</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
