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
        } catch (error) {
            console.error('Failed to start new chat session.', error);
        }
    }, [setChatList, setUserMessages, setAssistantMessages]);
};