import {useCallback, useState} from "react";

//여러 엔드포인트로부터 데이터를 가져오는 범용 훅
export const UseFetchWeather = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // useEffect(() => {

  // fetchData();
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_API}${endpoint}`;   // 서버
            // const url = `http://localhost:9002/api${endpoint}`;     // 로컬
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status : ${response.status}`);
            }
            const jsonData = await response.json();
            setData(jsonData);
            // console.log("jsonData : ", jsonData)
        } catch (error) {
            setError(error);
            console.error("Fetching weather failed: ", error);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);   //endpoint가 변경될 때마다 훅이 데이터를 다시 가져옴

  return {fetchData, data, loading, error};
};
