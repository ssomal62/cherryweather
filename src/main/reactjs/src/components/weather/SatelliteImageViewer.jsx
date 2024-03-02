import React, {useEffect, useState} from 'react';
import {satImgState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import {Card, CardHeader, Divider, Image, Spinner} from "@nextui-org/react";
import styled from "styled-components";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import {useRecoilValue} from "recoil";

const SatelliteImageViewer = () => {
    const fetchData = UseWeatherData({endpoint:`/weather/satImg`, state: satImgState});
    const {data, loading, error} = useRecoilValue((satImgState))
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            await fetchData();
        }
        loadData();
    }, [fetchData])

    useEffect(() => {
        // console.log("satImgData : ", data);
        if (data && data.length > 0) {
            setCurrentIndex(data.length - 1);
        }
    }, [data])

    //이전 이미지로 이동
    const prevImage = () => {
        if (data && data.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
        }
    }
    //다음 이미지로 이동
    const nextImage = () => {
        if (data && data.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex >= data.length - 1 ? prevIndex : prevIndex + 1));
        }
    }

    // data 배열과 currentIndex가 유요한지 확인
    const isValidDat = data && Array.isArray(data) && data.length > 0 && data[currentIndex] && data[currentIndex].satImg;

    return (
        <Container>
            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {isValidDat ? (
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
                                style = {{zIndex: '1'}}
                            />
                        </SatImage>
                    </div>
                ) : null}
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
    left: 7%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
`;
const Next = styled.div`
    position: absolute;
    right: 7%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
`;