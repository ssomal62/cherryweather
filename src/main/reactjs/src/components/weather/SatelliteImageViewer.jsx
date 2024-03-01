import React, {useEffect, useState} from 'react';
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Card, CardHeader, Divider, Image, Spinner} from "@nextui-org/react";
import styled from "styled-components";

const SatelliteImageViewer = () => {
    const {fetchData, data, loading, error} = UseFetchWeather("/weather/satImg");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            await fetchData();
        }
        loadData();
    }, [fetchData])

    useEffect(() => {
        if (data && data.length > 0) {
            setCurrentIndex(data.length - 1);
        }
    }, [data])

    //이전 이미지로 이동
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
    }
    //다음 이미지로 이동
    const nextImage = () => {
        setCurrentIndex((prevIndex) => {
            //마지막 이미지 일 경우 이동하지 않는다
            if (prevIndex >= data.length - 1) {
                return prevIndex;
            }
            return prevIndex + 1;
        });
    }

    return (
        <Container>
            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {data && (
                    <div>
                        <CardHeader>
                            <div className = "flex flex-col">
                                <p className = "text-sm text-white">기상 레이더</p>
                            </div>
                        </CardHeader>
                        <Divider className = "bg-white/50 mb-5"/>
                        <SatImage>
                            <Prev>
                                <Image className = "rounded-none" src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/prev.png" onClick = {prevImage}
                                       alt = "Previous"/>
                            </Prev>
                            <Next>
                                <Image className = "rounded-none" src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/next.png" onClick = {nextImage}
                                       alt = "Next"/>
                            </Next>
                            <Image
                                src = {data[currentIndex].satImg}
                                alt = {`Satellite Image ${currentIndex}`}
                                width = "100%" height = "auto"
                                style={{zIndex:'1'}}
                            />
                        </SatImage>
                    </div>
                )}
            </Card>
        </Container>
    )


}
export default SatelliteImageViewer;

const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid blue;
    padding: 22px;
`;
const SatImage = styled.div`
    position: relative;
    padding: 0 20px 20px 20px;
`;
const Prev = styled.div`
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
`;
const Next = styled.div`
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
`;