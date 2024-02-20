import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {useCallback} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";
import {HeartFill} from "./UseSaveState";
import axios from "axios";

export const buketURLState = atom({
    key: 'buketURLState',
    default: [],
});



export const useFetchImageList  = () => {
    const setBucketURL = useSetRecoilState(buketURLState); // 값을 불러오기 위한 문법

    const cookie = new Cookies();
    const [heart, setHeart] = useRecoilState(HeartFill); // HeartFill 상태 사용
    return useCallback(async () => {
        try {
            setHeart(false);
            setBucketURL([]); // 이미지 URL 상태 초기화

            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            const response = await instance.get('ai_image/get-image',config);
            // const response = await axios.get('http://localhost:9002/api/ai_image/get-image',config);
            // const response = await axios.get('http://192.168.0.20:9002/api/ai_image/get-image',config);
            const bucketURL =response.data.map(item => ({
                bucketURL: item.bucketURL,
                aiImageId: item.aiImageId,
                checkSave: item.checkSave,
                createdAt: item.createdAt
            }));
            setBucketURL(bucketURL);
        } catch (error) {
            console.error('이미지 url을 불러오는데 실패했습니다.', error);
        }
    }, [setBucketURL]);
};
