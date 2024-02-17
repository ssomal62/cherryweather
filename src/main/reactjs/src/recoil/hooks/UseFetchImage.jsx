// import axios from 'axios';
import {atom, useSetRecoilState} from 'recoil';
import {useCallback} from "react";
// import {instance} from "../module/instance";
import axios from "axios";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const imageURLState = atom({
    key: 'imageURLState',
    default: [],
});

export const useFetchImage = () => {
    const setImageURL = useSetRecoilState(imageURLState); // 값을 불러오기 위한 문법
    const cookie = new Cookies();
    return useCallback(async () => {
        try {
            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            const response = await instance.post('ai_image/create',
                {
                    model: "dall-e-3",
                    prompt: "",
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
