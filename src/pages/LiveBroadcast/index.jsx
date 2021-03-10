import React, { useState } from 'react';
import './style.less';
import { Collapse, Tree, Slider, Input } from 'antd';
import Video from '@/component/Video';
import { directionCtrlApi, powerSwitchApi } from '@/server/cmd';
const { Panel } = Collapse;

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
    children: [
      {
        title: '1.99',
        key: '0-0-0',
      },
      {
        title: '朝阳',
        key: '0-0-1',
        children: [
          {
            title: '1.88',
            key: '0-0-0-0',
          },
        ],
      },
      {
        title: '海淀',
        children: [
          {
            title: '1.22',
            key: '0-0-0-1',
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
  return <div className="tree-item">{props.title}</div>;
};

const LivePage = function () {
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

  const handleDiretion = (type) => {
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
          <div className="search-box"></div>
          <div className="tree-list-box">
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header={<PanelHeader title="设备列表" />} key="1">
                <div className="tree-box">
                  <Tree
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys={['0-0-0']}
                    treeData={treeData}
                    titleRender={TreeRender}
                  />
                </div>
              </Panel>
              <Panel header={<PanelHeader title="系统分组" />} key="2"></Panel>
              <Panel header={<PanelHeader title="轮询分组" />} key="3"></Panel>
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
                  onClick={() => handleDiretion(17)}
                ></button>
                <button
                  className="icon icon-ctrl-up"
                  onClick={() => handleDiretion(13)}
                ></button>
                <button
                  className="icon icon-ctrl-right-up"
                  onClick={() => handleDiretion(18)}
                ></button>
                <button className="icon icon-ctrl-less"></button>
                <button className="last icon"></button>
                <button className="last icon icon-ctrl-add"></button>
              </div>
              <div className="button-col">
                <button
                  className="icon icon-ctrl-left"
                  onClick={() => handleDiretion(15)}
                ></button>
                <span className="placeholder"></span>
                <button
                  className="icon icon-ctrl-right"
                  onClick={() => handleDiretion(16)}
                ></button>
                <button className="icon icon-ctrl-less"></button>
                <button className="icon icon-ctrl-focus last"></button>
                <button className="last icon icon-ctrl-add"></button>
              </div>
              <div className="button-col">
                <button
                  className="icon icon-ctrl-down-left"
                  onClick={() => handleDiretion(19)}
                ></button>
                <button
                  className="icon icon-ctrl-down"
                  onClick={() => handleDiretion(14)}
                ></button>
                <button
                  className="icon icon-ctrl-down-right"
                  onClick={() => handleDiretion(20)}
                ></button>
                <button className="icon icon-ctrl-less"></button>
                <button className="icon icon-ctrl-focus last"></button>
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
            <div className="video-window">
              <Video />
            </div>
            <div className="video-window">
              <Video
                active={active === 1 ? true : false}
                onClick={() => handlePickWindow(1)}
                url="ws://47.94.90.247:559/test123/192.168.0.205:8000:admin:admin12345:0:33?live=1"
              />
            </div>
          </div>
          <div className="normal-row">
            <div className="video-window">
              <Video />
            </div>
            <div className="video-window">
              <Video />
            </div>
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
