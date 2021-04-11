import React from 'react';
import { Redirect, connect, globalStateType } from 'umi';
const auth = (props: any) => {
  const { isLogin } = props;
  // if (isLogin) {
  //   return <div>{props.children}</div>;
  // } else {
  //   return <Redirect to="/login" />;
  // }
  return <div>{props.children}</div>;
};

const mapStateToProps = (state: any) => {
  const { global }: { global: globalStateType } = state;
  return {
    isLogin: global.token,
  };
};

export default connect(mapStateToProps)(auth);
