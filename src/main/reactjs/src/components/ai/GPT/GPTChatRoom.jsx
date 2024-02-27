import React, {useState, useEffect, useRef} from "react";

import "./GptChatRoomStyle.css";
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
import {Button, Spinner} from "@nextui-org/react";
import {useFetchImage} from "../../../recoil/hooks/UseFetchImage";
import {useFetchUserInfo, userInfoState} from "../../../recoil/hooks/UseFetchUserInfo";
import {useStartChat} from "../../../recoil/hooks/UseStartChat";
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
    const chatRestart = useStartChat();

    const fetchUserInfo = useFetchUserInfo();
    const userInfo = useRecoilValue(userInfoState);
    const messagesEndRef = useRef(null); // 메시지 스크롤을 자동으로 내릴 Ref

    useEffect(() => {
        fetchUserInfo();
    }, []);

    console.log(userInfo.email)
    console.log(userInfo.gender)
    console.log(userInfo)

    // useState로 버튼 클릭 상태 관리
    const [isStarted, setIsStarted] = useState(false);

    // 시작하기 버튼 클릭 핸들러
    const handleStartClick = async () => {
        setIsStarted(true); // 버튼 클릭 상태를 true로 변경
        const response = await chatRestart();
    };

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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true); // 스피너 표시
    //             await fetchChatMessages(userInput); // 채팅 메시지 불러오기
    //             setIsLoading(false); // 컴포넌트가 언마운트되면 스피너 숨기기
    //         } catch (error) {
    //             console.error("채팅 메시지를 불러오는데 실패했습니다.", error);
    //         }
    //     };
    //
    //     // userMessages가 null인 경우에만 fetchData 함수 실행
    //     if (userMessages.length === 0 && assistantMessages.length === 0) {
    //         fetchData();
    //     }
    // }, [userMessages]); // userMessages 값이 변경될 때마다 useEffect 실행

    // useEffect 수정
    useEffect(() => {
        if (isStarted) { // 시작하기 버튼 클릭 시만 fetchData 함수 실행
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    await fetchChatMessages(userInput);
                    setIsLoading(false);
                } catch (error) {
                    console.error("채팅 메시지를 불러오는데 실패했습니다.", error);
                }
            };

            fetchData();
        }
    }, [isStarted]); // isStarted 상태 변경 시 useEffect 실행


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
            console.log('챗룸에서 이미지 생성용 프롬프트 : ' + prompt);
            setImageState(false);
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
                                <div style={{width: "100%"}}>
                                    <img src='https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/cherry.svg'
                                         alt="" style={{width:'200px',height:'200px',marginBottom:'20px', }}/>
                                    <div className="chat-message received-message">
                                        <strong>체리<br/></strong>
                                        <p>안녕하세요, 저는 🍒체리입니다! 요즘엔 좀 심심해서 패션 컨설턴트 일을 잠깐 맡고 있어요.
                                            여러분의 오늘을 더욱 빛내줄 옷차림을 추천해드릴 수 있어요.
                                            어떤 스타일을 선호하시나요? 함께 이야기 해볼까요?😊 </p>
                                    </div>
                                </div>
                                 {/*시작하기 버튼 렌더링 조건과 위치 조정*/}
                                {
                                    !isStarted && (
                                        <Button className='startButton' color="danger" variant="bordered" onClick={handleStartClick}>
                                            대화 시작
                                        </Button>
                                    )
                                }

                                {chatList.map((message, index) => (
                                    <div key={index} style={{width: "100%",}}>
                                        <div
                                            className={"chat-message " + (index % 2 === 0 ? "received-message" : "user-message")}>
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
                                            placeholder="메세지를 입력하세요."
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            disabled={!isStarted}
                                        />
                                        {/* 시작하기 버튼 클릭 전에는 Send 버튼 숨김 */}
                                        {isStarted && (
                                            <button type="submit" className="msg_send_btn">Send</button>
                                        )}
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

