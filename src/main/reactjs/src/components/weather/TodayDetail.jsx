import React, {useEffect} from 'react';
import {dailyWeatherState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import {Card, CardHeader, Divider, Spinner} from "@nextui-org/react";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import {useRecoilValue} from "recoil";


const TodayDetail = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const fetchData = UseWeatherData({endpoint:`/weather/daily?ip=${clientIp}`, state: dailyWeatherState});
    const {data, loading, error} = useRecoilValue((dailyWeatherState))

    let sunrise = "";
    let sunset = "";

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    if (data) {
        sunrise = formatTime(data.sunrise)
        sunset = formatTime(data.sunset)
    }

    return (
        <Container>
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {data && (
                    <DetailBundle>
                        <Rain>
                            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                                <CardHeader>
                                    <div className = "flex flex-col">
                                        <p className = "text-sm text-white">강수확률</p>
                                    </div>
                                </CardHeader>
                                <Divider className = "bg-white/50 mb-5"/>
                                <div className = "text-white">
                                    강수 확률 : {data.rainProbability}%<br/>
                                    강수량 : {data.rainfall}
                                </div>
                            </Card>
                        </Rain>
                        <Sunrise>
                            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                                <CardHeader>
                                    <div className = "flex flex-col">
                                        <p className = "text-sm text-white">일출</p>
                                    </div>
                                </CardHeader>
                                <Divider className = "bg-white/50 mb-5"/>
                                <div className = "text-white">
                                    일출 : {sunrise}<br/>
                                    일몰 : {sunset}<br/>
                                </div>
                            </Card>
                        </Sunrise>
                        <Humidity>
                            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                                <CardHeader>
                                    <div className = "flex flex-col">
                                        <p className = "text-sm text-white">습도</p>
                                    </div>
                                </CardHeader>
                                <Divider className = "bg-white/50 mb-5"/>
                                <div className = "text-white">
                                    습도 : {data.humidity}%
                                </div>
                            </Card>
                        </Humidity>
                        <Wind>
                            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                                <CardHeader>
                                    <div className = "flex flex-col">
                                        <p className = "text-sm text-white">바람</p>
                                    </div>
                                </CardHeader>
                                <Divider className = "bg-white/50 mb-5"/>
                                <div className = "text-white">
                                    풍향 : {data.windDirection}<br/>
                                    풍속 : {data.windSpeed}m/s
                                </div>
                            </Card>
                        </Wind>
                    </DetailBundle>
                )}
        </Container>
    )
};
export default TodayDetail;

const formatTime = (time) => {
    if (!time) return '';
    const timeString = time.toString();
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);
    return `${hours}:${minutes.padStart(2, '0')}`;
}

const Container = styled.div`
    width: 100%;
    height: 400px;
    padding: 22px;
`;


const DetailBundle = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Rain = styled.div`
    position: absolute;
    width: 47%;
    height: 47%;
    left: 0;
    top: 0;
`;

const Sunrise = styled.div`
    position: absolute;
    width: 47%;
    height: 47%;
    right: 0;
    top: 0;
`;
const Humidity = styled.div`
    position: absolute;
    width: 47%;
    height: 47%;
    left: 0;
    bottom: 0;
`;
const Wind = styled.div`
    position: absolute;
    width: 47%;
    height: 47%;
    right: 0;
    bottom: 0;
`;
