import React, {useState, useEffect, useRef} from "react";

import "../../../style/GptChatRoomStyle.css";
import Layout from "../../../common/Layout";
import {assistantMessage, chatListState, useGptChat, userMessage} from "../../../recoil/hooks/UseGptChat";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
// import {content} from "../../../../tailwind.config";


const GPTChatRoom = () => {

    const fetchChatMessages = useGptChat(); //-> 초기값을 불러오는 함수를 호출한다.
    const [userMessages, setUserMessages] = useRecoilState(userMessage);
    const assistantMessages = useRecoilValue(assistantMessage);
    const setChatList = useSetRecoilState(chatListState);
    const chatList = useRecoilValue(chatListState);
    const [userInput, setUserInput] = useState(""); // 사용자 입력 상태
    const messagesEndRef = useRef(null); // 메시지 스크롤을 자동으로 내릴 Ref

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === "") return;
        try {
            // 사용자가 입력한 정보를 화면에 표시하고 리코일에 저장
            setUserMessages(prevState => [...prevState, userInput]);
            console.log("setUserMessages : "+setUserMessages);
            setUserInput(""); // 입력 필드 초기화

            // // 채팅 리스트에 사용자 입력 추가 후 화면 재출력
            setChatList(prevChatList => [...prevChatList, userInput]);
            console.log("채팅 리스트 요청 --- 요청시 :  "+chatList)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            // 채팅 메시지를 백엔드로 전송하고 응답을 받아옴
            const response = await fetchChatMessages(userInput);

            // // 서버 응답을 채팅 리스트에 추가 후 화면 재출력
            // setChatList(prevChatList => [...prevChatList, response]);
            console.log("채팅 리스트 요청 --- 요청 후  :  "+chatList)
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

    console.log("userMessages : "+userMessages)
    console.log("assistantMessages : "+assistantMessages)
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="user_chat_data">
                            <div className="chat_section msg_history" id="chat-messages">
                                {chatList.map((message, index) => (
                                    <div key={index} className="chat-message">
                                        <p>{message}</p>
                                    </div>
                                ))}
                                {/* 채팅 메시지가 추가될 때마다 스크롤을 아래로 이동 */}
                                <div ref={messagesEndRef} />
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

