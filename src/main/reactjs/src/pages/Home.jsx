import React from "react";
import Layout from "../common/Layout";
import TodayWeather from "../components/weather/TodayWeather";

const Home = () => {
  return (
    <Layout>
       <TodayWeather/>
      <img
        alt=""
        src={require("../assets/images/brand/cw_test_img3.png")}
        style={{borderRadius: 30}}
      />
    </Layout>
  );
};

export default Home;
