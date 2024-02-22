import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useCallback, useState} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";
import {HeartFill} from "./UseSaveState";

export const chatList = atom({
    key: 'chatList',
    default: [],
});

export const userMessage = atom({
    key: 'userMessage',
    default: ["안녕 너는 누구야?"],
});

export const assistantMessages = atom({
    key: 'assistantMessages',
    default: [],
});



export const useGptChat  = () => {
    const setUserMessage = useSetRecoilState(userMessage);
    const setAssistantMessages = useSetRecoilState(assistantMessages);
    const setChatList = useSetRecoilState(chatList); // 값을 불러오기 위한 문법
    const cookie = new Cookies();

    // 현재 userMessage와 assistantMesaages Recoil 상태의 값을 가져옴
    const currentUserMessage = useRecoilValue(userMessage); // 상태 값 가져오는 함수 변경
    const currentAssistantMessages = useRecoilValue(assistantMessages); // 상태 값 가져오는 함수 변경

    return useCallback(async (userInput) => {
        try {
            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
            console.log("hookUserInput :"+userInput)
            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            console.log("currentAssistantMessages : "+currentAssistantMessages)
            console.log("currentUserMessage : "+currentUserMessage)

            // 사용자 입력과 대화 목록을 함께 백엔드 서버로 전송
            const requestData = {
                userMessages: currentUserMessage,
                assistantMesaages: currentAssistantMessages,
            };

            const response = await instance.post('/gpt/chat', requestData, config);

            // 백엔드에서 반환한 assistant 응답을 배열에 추가
            setAssistantMessages(prevState => [...prevState, response.data]);

            // 채팅 메시지를 배열에 추가
            setChatList(prevState => [...prevState, { userMessage: userInput, assistantMessage: response.data }]);


            console.log("받아온 메세지 ::   "+response.data)
        } catch (error) {
            console.error('채팅 메세지를 불러오는데 실패했습니다..', error);
        }
    }, [setChatList,setAssistantMessages]);
};
