// DEPENDENCES
import React from 'react';
import { createBrowserHistory } from "history";
import styled from 'styled-components';

// COMPONENTS
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = props => {

  let backgroundMain = '';

  const history = createBrowserHistory({});
  const path = history.location.pathname;
  let getRoute = path.split(["/"]).slice(-1)[0];

  if (getRoute === 'management') backgroundMain = '';
  else backgroundMain = 'background-image: url("/images/main-tennis.jpg")';

  const Wrapper = styled.div`
    ${backgroundMain};
    min-height: 92vh;
  `;

  return (
    <div >
      <Header />
      <Wrapper>{props.children}</Wrapper>
      <Footer />
    </div>
  );
};

export default Layout;
