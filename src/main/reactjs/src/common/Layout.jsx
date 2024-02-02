import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

// 화면에 항상 위치하는 컴포넌트는 레이아웃으로 만들어 사용한다
// children 은 레이아웃으로 감싸진 컴포넌트를 의미하고 아래와 같은 문법으로 레이아웃을 구성한다
 
const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <div className="contentContainer">
        {children}
        </div>
      <Footer />
    </>
  );
};

export default Layout;