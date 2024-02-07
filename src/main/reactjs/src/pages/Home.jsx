import React from "react";
import mainImg from "../assets/images/17.jpg";
import Layout from "../common/Layout";
import WebNotificationTest from "../components/webnotification/WebNotificationTest";

const Home = () => {
  return (
    <Layout>
      <img src={mainImg} style={{width: "650px"}} alt="" />
      <h1>
        <b>스프링부트 + 리액트 CI/CD 성공기원 !! 카리나의 응원 얍 </b>
      </h1>
      <h1>짝짝 성공입니다!</h1>
      <h3>추가해볼께요.</h3>
      <h4>왜 변화가 안될까요 ? </h4>
      <WebNotificationTest />
    </Layout>
  );
};

export default Home;
