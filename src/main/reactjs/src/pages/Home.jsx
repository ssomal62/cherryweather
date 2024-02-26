import React from "react";
import Layout from "../common/Layout";
import TodayWeather from "../components/weather/TodayWeather";
import SampleFrame from "./weather/SampleFrame";
import {alramListState, useAlarmData} from "../recoil/hooks/UseAlramApi";

const Home = () => {
  useAlarmData({state: alramListState, dynamicPath: ""});

  return (
    <Layout containerMargin="20px 0 0 0" containerPadding="20px 0 0 0">
      <SampleFrame />
      <TodayWeather />
    </Layout>
  );
};

export default Home;
