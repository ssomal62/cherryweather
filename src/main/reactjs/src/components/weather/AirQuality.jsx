import React, {useEffect} from 'react';
import UseClientIp from "../../recoil/hooks/UseClientIp";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Accordion, AccordionItem, Spinner} from "@nextui-org/react";

const AirQuality = () => {
    const clientIp = UseClientIp();
    const {fetchData, data, loading, error} = UseFetchWeather(`/air/airquality?ip=${clientIp}`);

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    if (loading) {
        return (
            <div>
                <Spinner label = "Loading..."/>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error: {error.message}
            </div>
        )
    }

    if (data) {
        return (
            <div style = {{border: '1px solid pink'}}>
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
        )
    }
};

export default AirQuality;
