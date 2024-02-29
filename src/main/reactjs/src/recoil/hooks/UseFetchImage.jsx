import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useCallback} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";
import {HeartFill} from "./UseSaveState";
import {promptState} from "./UseGptChat";

export const imageURLState = atom({
    key: 'imageURLState',
    default: [],
});

export const useFetchImage = () => {
    const prompt = useRecoilValue(promptState);
    console.log("이미지 패치 훅 prompt : "+ prompt);
    const setImageURL = useSetRecoilState(imageURLState); // 값을 불러오기 위한 문법
    const cookie = new Cookies();
    const [heart, setHeart] = useRecoilState(HeartFill); // HeartFill 상태 사용
    return useCallback(async () => {
        try {
            setHeart(false);
            setImageURL([]); // 이미지 URL 상태 초기화

            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            // const response = await instance.post('ai_image/create',
            const response = await instance.post('/ai_image/create',
                {
                    model: "dall-e-3",
                    prompt: prompt,
                    size: "1024x1024"
                }, config
            );
            setImageURL(response.data.data[0].url);
            console.log("IMAGE_URL:"+response.data.data[0].url);
        } catch (error) {
            console.error('이미지 url을 불러오는데 실패했습니다.', error);
        }
    }, [setImageURL]);
};
