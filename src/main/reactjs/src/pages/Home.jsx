import React from "react";
import Layout from "../common/Layout";
import TodayWeather from "../components/weather/TodayWeather";
import {alramListState, useAlarmData} from "../recoil/hooks/UseAlramApi";
import TodayWeatherCard from "../components/home/TodayWeatherCard";

const Home = () => {
  useAlarmData({state: alramListState, dynamicPath: ""});

  return (
    <Layout containerMargin="0" containerPadding="0">
        <TodayWeatherCard/>
      <TodayWeather />
    </Layout>
  );
};

export default Home;
