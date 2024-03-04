import React, {useEffect} from 'react';
import UseClientIp from "../../recoil/hooks/UseClientIp";
import {airQualityState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import {Accordion, AccordionItem, Card, CardHeader, Divider, Spinner} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import styled from "styled-components";

const AirQuality = () => {
    const clientIp = UseClientIp();
    const fetchData = UseWeatherData({endpoint: `/air/airquality?ip=${clientIp}`, state: airQualityState});
    const {data, loading, error} = useRecoilValue((airQualityState))

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    return (
        <Container>
            <Card isBlurred className = "bg-black/30 rounded-xl shadow-small h-[100%]">
                {loading && (
                    <Spinner label = "Loading..."/>
                )}
                {error && (
                    <div>Error: {error.message}</div>

                )}
                {data && (
                    <div>
                        <CardHeader>
                            <div className = "flex flex-col">
                                <p className = "text-sm text-white">미세먼지 정보</p>
                            </div>
                        </CardHeader>
                        <Divider className = "bg-white/50 mb-5"/>
                        <Accordion>
                            <AccordionItem key = "1" startContent = {
                                <div>
                                    <div>
                                        미세먼지
                                        <div style = {{border: '1px solid pink', width: '50px', height: '50px'}}>
                                            {data.pm10Value + '㎍/㎥'}
                                        </div>
                                        {data.pm10Grade}
                                    </div>
                                    <div>
                                        초미세먼지
                                        <div style = {{border: '1px solid pink', width: '50px', height: '50px'}}>
                                            {data.pm25Value + '㎍/㎥'}
                                        </div>
                                        {data.pm25Grade}
                                    </div>
                                </div>
                            }>
                                <div>
                                    <div>
                                        미세먼지 농도 : {data.pm10Value}㎍/㎥<br/>
                                        미세먼지 등급 : {data.pm10Grade}
                                    </div>
                                    <div>
                                        초미세먼지 농도 : {data.pm25Value}㎍/㎥<br/>
                                        초미세먼지 등급 : {data.pm25Grade}
                                    </div>
                                    <div>
                                        오존농도 : {data.o3Value}ppm<br/>
                                        오존등급 : {data.o3Grade}
                                    </div>
                                    <div>
                                        이산화질소농도 : {data.no2Value}ppm<br/>
                                        이산화질소등급 : {data.no2Grade}
                                    </div>
                                    <div>
                                        일산화탄소농도 : {data.coValue}ppm<br/>
                                        일산화탄소등급 : {data.coGrade}
                                    </div>
                                    <div>
                                        아황산가스농도 : {data.so2Value}ppm<br/>
                                        아황산가스등급 : {data.so2Grade}
                                    </div>
                                    <div>
                                        통합대기환경 수치 : {data.khaiValue}<br/>
                                        통합대기환경 등급 : {data.khaiGrade}
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </Card>
        </Container>
    )
}

export default AirQuality;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 22px;
`;