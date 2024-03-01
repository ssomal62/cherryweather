import {useCallback, useContext} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import { Cookies } from 'react-cookie';
import {assistantMessage, chatListState, imageState, promptState, userMessage} from "./UseGptChat";
import {instance} from "../module/instance";
export const useImageCreation = (isLoading, setIsLoading) => {
    const [userMessages, setUserMessages] = useRecoilState(userMessage);
    const setAssistantMessage = useSetRecoilState(assistantMessage);
    const setChatList = useSetRecoilState(chatListState);
    const setGeneratedImageState = useSetRecoilState(imageState);
    const setPromptState = useSetRecoilState(promptState);
    const currentAssistantMessages = useRecoilValue(assistantMessage);
    const cookie = new Cookies();

    const handleImageCreateClick = useCallback(async (messageContent) => {
        try {
            // messageContent에 문자열 추가
            const enhancedMessageContent = `${messageContent} 이 추천을 가이드 형식으로 영어로 번역해줄래?`;


            const requestData = {
                userMessages: [...userMessages, enhancedMessageContent].map(message => ({ role: 'user', content: enhancedMessageContent })),
                assistantMessages: currentAssistantMessages.map(message => ({ role: 'assistant', content: message })),
            };

            const token = cookie.get('accessToken');
            const config = { headers: { Authorization: `Bearer ${token}` }};
            setIsLoading(true); // 데이터 가져오는 동안 로딩 상태 활성화

            // 백엔드로부터 이미지 생성 요청
            const response = await instance.post('/gpt/chat', requestData, config);

            setIsLoading(false); // 데이터 가져온 후 로딩 상태 비활성화
            // 응답 데이터를 기반으로 상태 업데이트 로직 변경
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
                setChatList((prevChatList) => [...prevChatList, { content: response.data, isSpecialMessage: false }]);
                setGeneratedImageState(false);
            }
        } catch (error) {
            console.error('채팅 메세지를 불러오는데 실패했습니다.', error);
        }
    }, [setUserMessages, setAssistantMessage, userMessages, currentAssistantMessages, setChatList, setGeneratedImageState, setPromptState, cookie]);

    return { handleImageCreateClick };
};