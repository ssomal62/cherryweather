import React from "react";
import Layout from "../common/Layout";
import TodayWeather from "../components/weather/TodayWeather";

const Home = () => {
    return (
        <Layout containerMargin="0" containerPadding="0">
            <TodayWeather/>
            <img
                alt=""
                src={require("../assets/images/defalut/sample_main.png")}
                style={{borderRadius: 30}}
            />
        </Layout>
    );
};

export default Home;
