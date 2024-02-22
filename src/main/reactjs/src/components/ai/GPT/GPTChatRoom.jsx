import React, {useState, useEffect, useRef} from "react";

import "../../../style/GptChatRoomStyle.css";
import Layout from "../../../common/Layout";
import {assistantMessages, chatList, useGptChat, userMessage} from "../../../recoil/hooks/UseGptChat";
import {atom, useRecoilState, useRecoilValue} from "recoil";


const GPTChatRoom = () => {

    const fetchChatMessages = useGptChat(); //-> 초기값을 불러오는 함수를 호출한다.
    const [userMessagess, setUserMessages] = useRecoilState(userMessage);
    const [chatMessages, setChatMessages] = useRecoilState(chatList); // 디폴트 메세지가 넘어온다.
    const [userInput, setUserInput] = useState("안녕? 너는 누구야?"); // 사용자 입력 상태
    const messagesEndRef = useRef(null); // 메시지 스크롤을 자동으로 내릴 Ref
    // const assistantMessages = useRecoilValue(assistantMessages); // assistantMessages 추가

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === "") return;
        try {
            await fetchChatMessages(userInput);
            // 사용자가 입력한 정보를 배열에 추가
            setUserMessages(prevState => [...prevState, userInput]);
            setUserInput("");
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.error("메시지 전송에 실패했습니다.", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchChatMessages(userInput); // 채팅 메시지 불러오기
            } catch (error) {
                console.error("채팅 메시지를 불러오는데 실패했습니다.", error);
            }
        };

        fetchData(); // useEffect 안에서 직접 호출

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함


    console.log('챗룸 - chatMessages:', chatMessages); // 채팅 메시지 확인
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="user_chat_data">
                            <div className="chat_section msg_history" id="chat-messages">
                                {chatMessages.map((message, index) => (
                                    <div className="chat-message">
                                        {/* 사용자 입력 메시지 표시 */}
                                        {message.userMessage && <p>{message.userMessage}</p>}
                                        {/* 백엔드에서 반환한 assistant 메시지 표시 */}
                                        {message.assistantMessage && <p className="assistant">{message.assistantMessage}</p>}
                                    </div>
                                ))}
                            </div>
                            {/* 메시지 입력 및 전송 UI */}
                            <div
                                className="type_msg"
                                style={{position: 'fixed', bottom: '50px', width: '600px'}}
                            >
                                <div className="input_msg_write">
                                    <form onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            className="write_msg"
                                            placeholder="Type a message"
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                        />
                                        <button type="submit" className="msg_send_btn">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default GPTChatRoom;

