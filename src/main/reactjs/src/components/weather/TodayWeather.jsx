import React, {useEffect, useState} from 'react';

const TodayWeather = () => {

    const [dailyWeather, setDailyWeather] = useState(null);

    useEffect(() => {
        //데이터 불러오기
        const fetchDailyWeather = async () => {
            try {
                // 엔드포인트로 데이터 요청
                const response = await fetch('http://192.168.0.46:9002/api/weather/daily');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setDailyWeather(await response.json());
            } catch (error) {
                console.error("Fetching daily weather failed: ", error);
            }
        };

        //데이터를 불러오는 함수를 호출
        fetchDailyWeather();
    }, []);  // 처음 한번만 실행

    //데이터가 없는 경우 or 로딩 중일 경우
    if (!dailyWeather) {
        return <div>Loading...</div>; // 로딩 중 표시 문구 출력
    }
    //데이터가 있는 경우
    return (
        <div>
            <h1>TodayWeather</h1>
            시 : {dailyWeather.city}<br/>
            구 : {dailyWeather.area}<br/>
            날씨 : {dailyWeather.weather}<br/>
            현재 기온 : {dailyWeather.currentTemp}<br/>
            최저 기온 : {dailyWeather.minTemp}<br/>
            최고 기온 : {dailyWeather.maxTemp}<br/>
            풍향 : {dailyWeather.windDirection}<br/>
            풍속 : {dailyWeather.windSpeed}<br/>
            강수확률 : {dailyWeather.rainProbability}<br/>
            강우량 : {dailyWeather.rainfall}<br/>
            습도 : {dailyWeather.humidity}<br/>
            일출 : {dailyWeather.sunrise}<br/>
            일몰 : {dailyWeather.sunset}<br/>
            월출 : {dailyWeather.moonrise}<br/>
            월몰 : {dailyWeather.moonset}<br/>
        </div>
    );
};

export default TodayWeather;
