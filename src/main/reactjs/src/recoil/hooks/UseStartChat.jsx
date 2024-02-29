import { useCallback } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import {chatListState, userMessage, assistantMessage, useGptChat} from './UseGptChat';
import {instance} from "../module/instance";

export const useStartChat = () => {
    const setChatList = useSetRecoilState(chatListState);
    const setUserMessages = useSetRecoilState(userMessage);
    const setAssistantMessages = useSetRecoilState(assistantMessage);

    return useCallback(async () => {
        try {
            setChatList([]);
            setUserMessages([]);
            setAssistantMessages([]);

            const response = await instance.get('/gpt/chat');
            // 이 부분에서 응답을 적절하게 처리

            // 새 대화 시작 로직 추가
            // const resetAndFetchChatMessages = useGptChat(); // 기존 훅을 재사용
            //
            // await resetAndFetchChatMessages; // 새 대화 시작을 위해 기존 대화 내역을 초기화하고 새 메시지를 불러옴
// ...
        } catch (error) {
            console.error('Failed to start new chat session.', error);
        }
    }, [setChatList, setUserMessages, setAssistantMessages]);
};