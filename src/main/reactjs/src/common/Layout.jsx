import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styled from "styled-components";

// 화면에 항상 위치하는 컴포넌트는 레이아웃으로 만들어 사용한다
// children 은 레이아웃으로 감싸진 컴포넌트를 의미하고 아래와 같은 문법으로 레이아웃을 구성한다
const Layout = ({children}) => {
  return (
    <>
      <Root>
        <Main>
          <Header />
          <Container>
            <Wapper>{children}</Wapper>
          </Container>
          <br />
          <br />
          <Footer />
        </Main>
      </Root>
      {/* <Header />
        <div className="contentContainer">
        {children}
        </div>
      <Footer /> */}
    </>
  );
};

export default Layout;

const Wapper = styled.div`
  aspect-ratio: 1.25 / 1;
`;

const Container = styled.div`
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  display: block;
  margin: 20px;
`;

const Root = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  margin: 0 auto;
`;

const Main = styled.main`
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
`;
