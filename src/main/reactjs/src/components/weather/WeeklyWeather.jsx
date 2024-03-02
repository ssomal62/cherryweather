import React, {useEffect} from 'react';
import {UseWeatherData, weeklyWeatherState} from "../../recoil/hooks/UseWeatherData";
import {Card, CardHeader, Divider, Spinner} from "@nextui-org/react";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import {useRecoilValue} from "recoil";

const TodayDetail = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const fetchData = UseWeatherData({endpoint:`/weather/weekly?ip=${clientIp}`, state: weeklyWeatherState});
    const {data, loading, error} = useRecoilValue((weeklyWeatherState))

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
        console.log("week : ",data); // 출력 확인용
    }, [fetchData, clientIp]);

    return(
        <Container>
            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {data && (
                    <div style = {{padding: '22px'}}>
                        <CardHeader>
                            <div className = "flex flex-col">
                                <p className = "text-sm text-white">기상 레이더</p>
                            </div>
                        </CardHeader>
                        <Divider className = "bg-white/50 mb-5"/>
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
                )}
            </Card>
        </Container>
    )
};
export default TodayDetail;

/* 날짜 형식 포멧 */
const formatDate = (dateString) => {
    if (!dateString) return '';
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${parseInt(month, 10)}/${parseInt(day, 10)}`;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid orangered;
    padding: 22px;
`;

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