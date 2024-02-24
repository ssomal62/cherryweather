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

/*chatList - 모든 대화 리스트를 생성한다 .
* 1.여기 있는 리스트로 항상 화면의 message를 출력함
* 2. 기존의 대화 리스트에서 유저가 입력한 값을 추가받고 화면에서 보여준다. - 유저의 대화가 배열의 가장 마지막 index에 위치
* 3. 서버에서 받은 응답을 이 배열의 마지막에 추가한다. - 서버에서 반환받은 값이 배열의 가장 마지막 index에 위치
* 4. 다시 화면에 대화 리스트를 재출력한다
* */

export const useGptChat = () => {
    const [userMessages, setUserMessages] = useRecoilState(userMessage);
    const setAssistantMessage = useSetRecoilState(assistantMessage);
    const setChatList = useSetRecoilState(chatListState);
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

            setAssistantMessage(prevState => [...prevState, response.data]);

            setChatList((prevChatList) => [...prevChatList, response.data]);
            // setChatList((prevChatList) => [...prevChatList, userInput, response.data]);
        } catch (error) {
            console.error('채팅 메세지를 불러오는데 실패했습니다..', error);
        }
    }, [setUserMessages, setAssistantMessage, userMessages, currentAssistantMessages, setChatList]);
};
