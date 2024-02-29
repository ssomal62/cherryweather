import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useCallback, useState} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const userMessage = atom({
    key: 'userMessage',
    default: [],
});
//유저가 입력하는 값

export const assistantMessage = atom({
    key: 'assistantMessage',
    default: [],
});

export const chatListState = atom({
    key: 'chatListState',
    default: [],
});
// 서버에서 받아오는 값

export const imageState = atom({
    key: 'imageState',
    default: false,
})


export const promptState = atom({
    key: 'promptState',
    default: "",
})

export const useGptChat = () => {
    const [userMessages, setUserMessages] = useRecoilState(userMessage);
    const setAssistantMessage = useSetRecoilState(assistantMessage);
    const setChatList = useSetRecoilState(chatListState);
    const setGeneratedImageState = useSetRecoilState(imageState);
    const setPromptState = useSetRecoilState(promptState);
    const currentAssistantMessages = useRecoilValue(assistantMessage);
    const cookie = new Cookies();

    return useCallback(async (userInput) => {
        try {
            const token = cookie.get('accessToken');
            // setUserMessages((prevUserMessages) => [...prevUserMessages, userInput]);

            const config = { headers: { Authorization: `Bearer ${token}` }};

            const requestData = {
                userMessages: [...userMessages, userInput].map(message => ({ role: 'user', content: message })),
                assistantMessages: currentAssistantMessages.map(message => ({ role: 'assistant', content: message })),
            };

            const response = await instance.post('/gpt/chat', requestData, config);

            // 검사하여 이미지 생성 여부 판단 후 imageState 값을 변경
            if (response.data.includes('style')) {
                setGeneratedImageState(true);
                setPromptState(response.data);
            } else if (response.data.includes('(추천)')){
                setAssistantMessage(prevState => [...prevState, response.data]);
                setChatList(prevChatList => [
                    ...prevChatList,
                    { content: response.data, isSpecialMessage: true }
                ]);
                setGeneratedImageState(false);
            } else {
                setAssistantMessage(prevState => [...prevState, response.data]);
                setChatList((prevChatList) => [...prevChatList,{ content: response.data, isSpecialMessage: false }]);
                setGeneratedImageState(false);
            }
        } catch (error) {
            console.error('채팅 메세지를 불러오는데 실패했습니다..', error);
        }
    }, [setUserMessages, setAssistantMessage, userMessages, currentAssistantMessages, setChatList]);
};
