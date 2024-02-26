import React, {useState, useEffect, useRef} from "react";

import "../../../style/GptChatRoomStyle.css";
import Layout from "../../../common/Layout";
import {useNavigate} from "react-router-dom";
import {
    assistantMessage,
    chatListState,
    imageState,
    promptState,
    useGptChat,
    userMessage
} from "../../../recoil/hooks/UseGptChat";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {Spinner} from "@nextui-org/react";
import {useFetchImage} from "../../../recoil/hooks/UseFetchImage";
// import {content} from "../../../../tailwind.config";


const GPTChatRoom = () => {
    const navigate = useNavigate();
    const fetchChatMessages = useGptChat(); //-> 초기값을 불러오는 함수를 호출한다.
    const [userMessages, setUserMessages] = useRecoilState(userMessage);
    const assistantMessages = useRecoilValue(assistantMessage);
    const setChatList = useSetRecoilState(chatListState);
    const chatList = useRecoilValue(chatListState);
    const [userInput, setUserInput] = useState(""); // 사용자 입력 상태
    const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가
    const [isImageState, setImageState] = useRecoilState(imageState); // imageState 상태 추가
    const fetchImage = useFetchImage(prompt);
    // const prompt = useRecoilValue(promptState);

    console.log(isImageState);
    const messagesEndRef = useRef(null); // 메시지 스크롤을 자동으로 내릴 Ref
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === "") return;
        try {
            // 사용자가 입력한 정보를 화면에 표시하고 리코일에 저장
            setUserMessages(prevState => [...prevState, userInput]);
            console.log("setUserMessages : " + setUserMessages);
            setUserInput(""); // 입력 필드 초기화

            // // 채팅 리스트에 사용자 입력 추가 후 화면 재출력
            setChatList(prevChatList => [...prevChatList, userInput]);
            console.log("채팅 리스트 요청 --- 요청시 :  " + chatList)
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
            setIsLoading(true); // 데이터 가져오는 동안 로딩 상태 활성화

            // 채팅 메시지를 백엔드로 전송하고 응답을 받아옴
            const response = await fetchChatMessages(userInput);
            setIsLoading(false); // 데이터 가져온 후 로딩 상태 비활성화

            // // 서버 응답을 채팅 리스트에 추가 후 화면 재출력
            console.log("채팅 리스트 요청 --- 요청 후  :  " + chatList)
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        } catch (error) {
            console.error("메시지 전송에 실패했습니다.", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // 스피너 표시
                await fetchChatMessages(userInput); // 채팅 메시지 불러오기
                setIsLoading(false); // 컴포넌트가 언마운트되면 스피너 숨기기
            } catch (error) {
                console.error("채팅 메시지를 불러오는데 실패했습니다.", error);
            }
        };

        // userMessages가 null인 경우에만 fetchData 함수 실행
        if (userMessages.length === 0 && assistantMessages.length === 0) {
            fetchData();
        }
    }, [userMessages]); // userMessages 값이 변경될 때마다 useEffect 실행


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [chatList]); // chatList가 변경될 때마다 메시지 스크롤을 마지막 채팅으로 이동

    //위치 확인용
    // useEffect(() => {
    //     setIsLoading(true); // 스피너 표시
    //     return () => {
    //         setIsLoading(false); // 컴포넌트가 언마운트되면 스피너 숨기기
    //     };
    // }, []); // 컴포넌트가 마운트될 때만 실행

    useEffect(() => {
        if (isImageState) {
            // imageState 값이 true일 때 수행할 작업
            //response.data 의 값
            console.log('챗룸에서 이미지 생성용 프롬프트 : ' + prompt);
            navigate('/image');
        } else {
            // imageState 값이 false일 때 수행할 작업
            console.log('이미지 생성되지 않음');
        }
    }, [isImageState]);


    console.log("userMessages : " + userMessages)
    console.log("assistantMessages : " + assistantMessages)
    return (
        <Layout>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="user_chat_data">
                            <div className="chat_section msg_history" id="chat-messages">

                                {chatList.map((message, index) => (
                                    <div key={index} style={{width: "100%",}}>
                                        <div
                                            className={"chat-message " + (index % 2 === 0 ? "received-message" : "sent-message")}>
                                            {index % 2 === 0 ? (
                                                <>
                                                    <strong>체리<br/></strong>
                                                </>
                                            ) : (
                                                <>
                                                    <strong>유저<br/></strong>
                                                </>
                                            )}
                                            <p>{message}</p>
                                            {index === chatList.length - 1 && (
                                                <div>
                                                    <div ref={messagesEndRef}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {isLoading && (
                                <Spinner size="sm" color="danger" labelColor="danger" style={{marginTop: "-140px"}}/>
                            )}
                            {/* 메시지 입력 및 전송 UI */}
                            <div
                                className="type_msg"
                                // style={{position: 'fixed', bottom: '50px', width: '100%'}}
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
                                        {/*{isImageState && (*/}
                                        {/*    <button type="button" className="img_send_btn">이미지 생성</button>*/}
                                        {/*)}*/}
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

