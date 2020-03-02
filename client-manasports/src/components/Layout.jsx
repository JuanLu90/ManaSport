// DEPENDENCES
import React from 'react';

// COMPONENTS
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
  return (
      <div >
          <Header/>
          <div className="wrapper">{props.children}</div>
          <Footer/>
      </div>
  );
};

export default Layout;
