import {atom, useSetRecoilState} from "recoil";
import {useCallback, useEffect} from "react";

//엔드포인트별 상태 정의
export const dailyWeatherState = atom({
    key    : "dailyWeatherState",
    default: {data: null, loading: false, error: null},
    // 세션 저장 기능
});

export const hourlyWeatherState = atom({
    key    : "hourlyWeatherState",
    default: {data: null, loading: false, error: null},
});

export const satImgState = atom({
    key    : "satImgState",
    default: {data: null, loading: false, error: null},
});

export const weeklyWeatherState = atom({
    key    : "weeklyWeatherState",
    default: {data: null, loading: false, error: null},
});

export const airQualityState = atom({
    key    : "airQualityState",
    default: {data: null, loading: false, error: null},
});

//범용 훅
export const UseWeatherData = ({endpoint, state}) => {
    const setState = useSetRecoilState(state);

    const fetchData = useCallback(async () => {
        setState({data: null, loading: true, error: null});
        try {
            const url = `${process.env.REACT_APP_API}${endpoint}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status : ${response.status}`);
            }
            const jsonData = await response.json();
            setState({data: jsonData, loading: false, error: null});
        } catch (error) {
            setState({data: null, loading: false, error})
        }
    }, [endpoint, setState]);


    return fetchData;
};
