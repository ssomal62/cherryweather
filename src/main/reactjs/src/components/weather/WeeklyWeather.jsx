import React, {useEffect} from 'react';
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Spinner} from "@nextui-org/react";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";

const TodayDetail = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const {fetchData, data, loading, error} = UseFetchWeather(`/weather/weekly?ip=${clientIp}`);

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    if (loading) {
        return <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
    }
    if (error) {
        return <div>error : {error.message}</div>
    }
    if (data) {
        return (
            <div style={{padding:'22px'}}>
                {data && data.map((weeklyData, index) => (
                    <Weekly key = {index}>
                        <Date>
                            {formatDate(weeklyData.fcstDate)}<br/>
                        </Date>
                        <Weather>
                            {weeklyData.weather}<br/>
                        </Weather>
                        <RainPro>
                            {weeklyData.pop}<br/>
                        </RainPro>
                        <Temperature>
                            {weeklyData.tmn} / {weeklyData.tmx}
                        </Temperature>
                    </Weekly>
                ))}
            </div>
        )
    }
};
export default TodayDetail;

/* 날짜 형식 포멧 */
const formatDate = (dateString) => {
    if (!dateString) return '';
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${parseInt(month, 10)}/${parseInt(day, 10)}`;
}

const Weekly = styled.div`
    border: 1px solid white;
    position: relative;
    width: 100%;
    height: 50px;
`;
const Date = styled.div`
    position: absolute;
    width: 20%;
    left: 0%;

`;
const Weather = styled.div`
    position: absolute;
    width: 20%;
    left: 20%;
    
`;
const RainPro = styled.div`
    position: absolute;
    width: 30%;
    left: 40%;
`;
const Temperature = styled.div`
    position: absolute;
    width: 30%;
    left: 70%;
`;