import React, {useEffect} from 'react';
import {Chip, Spinner} from "@nextui-org/react";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";

//시간 포맷 함수
const formatTime = (time) => {
    if (!time) return '';
    const timeString = time.toString();
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);
    return `${hours}:${minutes.padStart(2, '0')}`;
}

//날짜 포맷 함수
const formatDate = (date) => {
    if (!date) return '';
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${month}/${day}`;
}

const HourlyWeather = () => {
    const {fetchData, data, loading, error} = UseFetchWeather('/weather/hourly');

    useEffect(() => {
        const loadData = async () => {
            await fetchData();
        }
        loadData();

    }, [fetchData])

    //현재 낮인지 밤인지 판별
    const isDaytime = () => {
        if (!data) return true;
        const now = new Date();
        const sunrise = new Date(now.toDateString() + ' ' + data.sunrise);
        const sunset = new Date(now.toDateString() + ' ' + data.sunset);
        return now >= sunrise && now <= sunset;
    }

    //날씨와 시간에 따라 배경 이미지 변경
    const getBackgroundImage = () => {
        if (!data) return require('../../assets/images/weather/background/clear_day.jpg'); // data가 없는 경우 기본 이미지 반환

        const weather = data.weather;
        const timeOfDay = isDaytime() ? 'day' : 'night';
        switch (weather) {
            case "맑음":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/clear_day.jpg') : require('../../assets/images/weather/background/clear_night.jpg');
            case "흐림":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/cloudy_day.jpg') : require('../../assets/images/weather/background/cloudy_night.jpg');
            case "비":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/rainy_day.jpg') : require('../../assets/images/weather/background/rainy_night.jpg');
            case "눈":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/snow_day.jpg') : require('../../assets/images/weather/background/snow_night.jpg');
            case "비/눈":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/snow_day.jpg') : require('../../assets/images/weather/background/snow_night.jpg');
            case "소나기":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/rainy_day.jpg') : require('../../assets/images/weather/background/rainy_night.jpg');
            default:
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/clear_day.jpg') : require('../../assets/images/weather/background/clear_night.jpg');
        }
    };

    // backgroundImage 스타일 동적으로 설정
    const cardStyle = {
        backgroundImage: `
    url(${getBackgroundImage()})`
    };

    return (
        <div>
            {loading && (
                <div>
                    <Spinner label = "Loading..."/>
                </div>
            )}
            {error && <div>Error: {error.message}</div>}
            {data && data.map((hourlyData, index) => (
                <Chip key = {index} className = "py-4" style={{height:'150px', margin:'1px'}} variant="shadow" color="danger" >
                    <div>{formatDate(hourlyData.fcstDate)}</div>
                    <div>{formatTime(hourlyData.fcstTime)}</div>
                    <div>{hourlyData.weather}</div>
                    <div>{hourlyData.tmp}℃</div>
                </Chip>
            ))}
        </div>
    );

    // // 로딩 중일 경우
    // if (loading) {
    //     return <div>
    //         <Card className = "py-4">
    //             <CardBody className = "overflow-visible py-2" style = {{height: '210px'}}>
    //                 <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
    //             </CardBody>
    //         </Card>
    //     </div>; // 로딩 중 표시 문구 출력
    // }
    // // 데이터가 없는 경우
    // if (error) {
    //     return <div>error : {error.message}</div>;
    // }
    //
    // //데이터가 있는 경우
    // if (data) {
    //     const sunrise = formatTime(data.sunrise);
    //     const sunset = formatTime(data.sunset);
    //     return (
    //         <div>
    //
    //             <Card className = "py-4 weatherInfo" style = {cardStyle}>
    //                 <CardBody className = "overflow-visible py-2 relative" style = {{height: '210px'}}>
    //                     <div className = "font-sans text-6xl font-bold text-white/90 text-shadow-small absolute" style = {{textShadow: '0 0 4px black'}}>
    //                         body
    //                     </div>
    //                     <Chip>가나다라마바사<br/>아자차카타파하</Chip>
    //
    //                 </CardBody>
    //             </Card>
    //         </div>
    //     );
    // }
};

export default HourlyWeather;