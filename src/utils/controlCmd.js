const CMD_MAPS = {
  LIGHT_PWR: 1, //灯光
  WIPER_PWR: 2, //雨刷
  FAN_PWR: 3, //fan
  HEATER_PWR: 4, //加热器
  AUX_PWR_1: 5, //辅助设备_1
  AUX_PWR_2: 6, //辅助设备_2
  ZOOM_IN: 7, //放大焦距
  ZOOM_OUT: 8, //缩小焦距
  FOCUS_NEAR: 9, //焦距前调
  FOCUS_FAR: 10, //焦距后调
  IRIS_OPEN: 11, //光圈扩大
  IRIS_CLOSE: 12, //光圈缩小
  TILT_UP: 13, //镜头上扬
  TILT_DOWN: 14, //镜头下俯
  PAN_LEFT: 15, //左转
  PAN_RIGHT: 16, //右转
  UP_LEFT: 17, //上仰同时左转
  UP_RIGHT: 18, //上仰同时右转
  DOWN_LEFT: 19, //下俯同时左转
  DOWN_RIGHT: 20, //下俯同时右转
  PAN_AUTO: 21, //左右自动扫描
  SET_PRESET: 22, //设置预置点
  CLE_PRESET: 23, //清除预置点
  GOTO_PRESET: 24 /* 快球转到预置点 */,
  FILL_PRE_SEQ: 25 /* 将预置点加入巡航序列 */,
  SET_SEQ_DWELL: 26 /* 设置巡航点停顿时间 */,
  CLE_PRE_SEQ: 27 /* 将预置点从巡航序列中删除 */,
  SET_SEQ_SPEED: 28 /* 设置巡航速度 */,
  RUN_SEQ: 29 /* 开始巡航 */,
  STOP_SEQ: 30 /* 停止巡航 */,
  STA_MEM_CRUISE: 31 /* 开始记录轨迹 */,
  STO_MEM_CRUISE: 32 /* 停止记录轨迹 */,
  RUN_CRUISE: 33 /* 开始轨迹 */,
};

const CMD = 'ptzctrl';

const getCtrlParams = (cmd, cancel) => {
  const basicParam = {
    cmd: CMD,
    ctrltype: CMD_MAPS[cmd],
  };
  return {
    start: Object.assign({}, basicParam, { param1: 1 }),
    stop: cancel ? Object.assign({}, basicParam, { param1: 0 }) : null,
  };
};

/* 灯光电源开关 */
export const LightPowerSwitch = (open) => {
  return {
    cmd: CMD,
    ctrltype: CMD_MAPS['LIGHT_PWR'],
    param1: open ? 1 : 0,
  };
};

// 雨刷器开关
export const WiperPowerSwitch = (open) => {
  return {
    cmd: CMD,
    ctrltype: CMD_MAPS['WIPER_PWR'],
    param1: open ? 1 : 0,
  };
};

//风扇开关
export const FanPowerSwitch = (open) => {
  return {
    cmd: CMD,
    ctrltype: CMD_MAPS['FAN_PWR'],
    param1: open ? 1 : 0,
  };
};

//加热器
export const HeatPowerSwitch = (open) => {
  return {
    cmd: CMD,
    ctrltype: CMD_MAPS['HEATER_PWR'],
    param1: open ? 1 : 0,
  };
};

//辅助设备1
export const Aux_1_PowerSwitch = (open) => {
  return {
    cmd: CMD,
    ctrltype: CMD_MAPS['AUX_PWR_1'],
    param1: open ? 1 : 0,
  };
};

//辅助设备2
export const Aux_2_PowerSwitch = (open) => {
  return {
    cmd: CMD,
    ctrltype: CMD_MAPS['AUX_PWR_2'],
    param1: open ? 1 : 0,
  };
};

//焦距缩放
export const ZoomCtrl = (zoomIn) => {
  return getCtrlParams(zoomIn ? 'ZOOM_IN' : 'ZOOM_OUT', true);
};

//焦距移动
export const FocusCtrl = (near) => {
  return getCtrlParams(
    near ? 'FOCUS_NEAR' : 'FOCUS_FAR' ? 'ZOOM_IN' : 'ZOOM_OUT',
    true,
  );
};

//光圈
export const IrisCtrl = (open) => {
  return getCtrlParams(open ? 'IRIS_OPEN' : 'IRIS_CLOSE', true);
};

//镜头上下
export const TiltCtrl = (up) => {
  return getCtrlParams(up ? 'TILT_UP' : 'TILT_DOWN', true);
};

//镜头左右
export const PanCtrl = (left) => {
  return getCtrlParams(left ? 'PAN_LEFT' : 'PAN_RIGHT', true);
};

//多方向运动
export const RoundPanCtrl = (top, left) => {
  return getCtrlParams(
    `${top ? 'UP' : 'DOWN'}_${left ? 'LEFT' : 'RIGHT'}`,
    true,
  );
};
