import React from 'react';
import HeaderNav from './components/HeadeNav/index';

const Layout = (props: any) => {
  return (
    <section>
      <HeaderNav {...props} />
      {props.children}
    </section>
  );
};

export default Layout;
