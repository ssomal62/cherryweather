import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {useCallback} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";
import {HeartFill} from "./UseSaveState";

export const chatList = atom({
    key: 'chatList',
    default: [],
});



export const useGptChat  = () => {
    const setChatList = useSetRecoilState(chatList); // 값을 불러오기 위한 문법
    const cookie = new Cookies();

    return useCallback(async () => {
        try {
            setChatList([]); // 이미지 URL 상태 초기화

            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다

            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            const response = await instance.post('/gpt/chat',
                {
                   message:""
                }, config
            );
            setChatList(bucketURL);
        } catch (error) {
            console.error('이미지 url을 불러오는데 실패했습니다.', error);
        }
    }, [setChatList]);
};
