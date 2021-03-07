import React from 'react';
import HeaderNav from './components/HeadeNav';


const Layout = (props) => {
    return (
        <section>
            <HeaderNav />
            {
                props.children
            }
        </section>
    )
}


export default Layout;