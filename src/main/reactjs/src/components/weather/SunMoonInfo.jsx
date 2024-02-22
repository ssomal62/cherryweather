import React, {useEffect} from 'react';
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Spinner} from "@nextui-org/react";

const SunMoonInfo = () => {

    const {fetchData, data, loading, error} = UseFetchWeather("/weather/daily");

    useEffect(() => {
        const loadData = async () => {
            await fetchData();
        }
        loadData();
    }, [fetchData]);

    if (loading) {
        return <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
    }
    if (error) {
        return <div>error : {error.message}</div>
    }
    if (data) {
        const sunrise = formatTime(data.sunrise)
        const sunset = formatTime(data.sunset)
        const moonrise = formatTime(data.moonrise)
        const moonset = formatTime(data.moonset)
        return (
            <div style = {{width: '200px', height: '200px', border: '1px solid black'}}>
                일출 : {sunrise}<br/>
                일몰 : {sunset}<br/>
                월출 : {moonrise}<br/>
                월몰 : {moonset}<br/>
            </div>
        );
    }
};
export default SunMoonInfo;

const formatTime = (time) => {
    if (!time) return '';
    const timeString = time.toString();
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);
    return `${hours}:${minutes.padStart(2, '0')}`;
}
