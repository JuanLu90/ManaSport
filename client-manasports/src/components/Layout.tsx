// DEPENDENCES
import React from 'react';
import { createBrowserHistory } from "history";
import styled from 'styled-components';

// COMPONENTS
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface IProps { }

const Layout: React.FC<IProps> = props => {

  let backgroundMain = '';

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let getRoute = path.split(["/"]).slice(-1)[0];

  const Wrapper = styled.div`
  background-image: linear-gradient(grey, black), url("/images/wallpaperTournamentInfo.jpg"); 
  background-blend-mode: saturation;
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
