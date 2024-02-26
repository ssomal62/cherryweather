import React, {useEffect, useState} from 'react';
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Button, Image, Spinner} from "@nextui-org/react";

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

    if (loading) {
        return <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
    }

    if (error) {
        return <div>error : {error.message}</div>
    }

    if (data) {
        return (
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Image
                    src = {data[currentIndex].satImg}
                    alt = {`Satellite Image ${currentIndex}`}
                    width = "100%"
                    height = "auto"
                />
                <div style = {{display: 'flex', marginTop: '20px'}}>
                    <Button auto flat color = "primary" onClick = {prevImage} style = {{backgroundColor: 'yellow'}}>Previous</Button>
                    <Button auto flat color = "primary" onClick = {nextImage} style = {{marginLeft: '20px', backgroundColor: 'yellow'}}>Next</Button>
                </div>
            </div>

        )
    }


}
export default SatelliteImageViewer;
