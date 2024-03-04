import React, {useState, useEffect, useRef} from "react";

import {useLocation, useNavigate} from "react-router-dom";
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
import {useImageCreation} from "../../../recoil/hooks/useImageCreation";
import "./css/GptChatRoomStyle.css";
// import {IsLoginAtom} from "../../../recoil/LoginAtom";
import MessageInput from "./MessageInput";
import ChatRoomTop from "./ChatRoomTop";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import {IsLoginAtom} from "../../../recoil/LoginAtom";


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
    // const fetchImage = useFetchImage(prompt);
    const chatRestart = useStartChat();
    const { handleImageCreateClick } = useImageCreation(isLoading, setIsLoading);

    const fetchUserInfo = useFetchUserInfo();
    const userInfo = useRecoilValue(userInfoState);
    const messagesEndRef = useRef(null); // 메시지 스크롤을 자동으로 내릴 Ref

    const isLogin = useRecoilValue(IsLoginAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUserInfo();
        initializeState();
    }, []);


    useEffect(() => {
        setIsModalOpen(!isLogin);
    }, [isLogin]);

    // useState로 버튼 클릭 상태 관리
    const [isStarted, setIsStarted] = useState(false);

    // 시작하기 버튼 클릭 핸들러
    const handleStartClick = async () => {

        if (!isLogin) {
            setIsModalOpen(true);
        } else {
            try {
                setIsStarted(true); // 버튼 클릭 상태를 true로 변경
                setIsLoading(true); // 데이터 가져오는 동안 로딩 상태 활성화
                const start = Date.now(); // 현재 시간 기록
                await chatRestart(); // 비동기 작업 수행

                const duration = Date.now() - start; // 비동기 작업 수행 시간 계산
                const minLoadingTime = 7000; // 최소 로딩 시간 (예: 4초)

                if (duration < minLoadingTime) {
                    // 최소 로딩 시간을 충족하지 못한 경우, 남은 시간만큼 지연
                    setTimeout(() => setIsLoading(false), minLoadingTime - duration);
                } else {
                    // 최소 로딩 시간을 이미 충족한 경우, 바로 로딩 상태 비활성화
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("대화 시작 시 에러 발생", error);
                setIsLoading(false); // 에러 발생 시에도 로딩 상태 비활성화
            }
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === "") return;
        try {
            setUserInput(""); // 입력 필드 초기화
            setUserMessages(prevState => [...prevState, userInput]);

            setChatList(prevChatList => [
                ...prevChatList,
                { content: userInput, isSpecialMessage: false } // 사용자 입력도 객체 형태로 추가
            ]);
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
            setIsLoading(true); // 데이터 가져오는 동안 로딩 상태 활성화

            const response = await fetchChatMessages(userInput);
            setIsLoading(false); // 데이터 가져온 후 로딩 상태 비활성화

            console.log("채팅 리스트 요청 --- 요청 후  :  " + chatList)
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        } catch (error) {
            console.error("메시지 전송에 실패했습니다.", error);
        }
    };

    useEffect(() => {
        if (isStarted) { // 시작하기 버튼 클릭 시만 fetchData 함수 실행
            setIsLoading(true);
            const fetchData = async () => {
                try {
                    await fetchChatMessages(userInput);
                    setIsLoading(false);
                } catch (error) {
                    console.error("채팅 메시지를 불러오는데 실패했습니다.", error);
                }
            };
            fetchData();
        }
    }, [isStarted]); // isStarted 상태 변경 시 useEffect 실행

    // 채팅 추가시 화면 아래로 내리기
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [chatList]); // chatList가 변경될 때마다 메시지 스크롤을 마지막 채팅으로 이동

    // // 스피너 위치 확인용
    // useEffect(() => {
    //     setIsLoading(true); // 스피너 표시
    //     return () => {
    //         setIsLoading(false); // 컴포넌트가 언마운트되면 스피너 숨기기
    //     };
    // }, []); // 컴포넌트가 마운트될 때만 실행

    //이미지 생성되면 이미지 페이지로 전환
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

    //초기화 함수
    const initializeState = () => {
        setUserMessages([]); // 사용자 메시지 상태 초기화
        setChatList([]); // 채팅 리스트 상태 초기화
    };

    return (
            <div className="container-fluid">
                            <div className="chat_section_g">
                                <ChatRoomTop />
                                {/*시작하기 버튼 렌더링 조건과 위치 조정*/}
                                {
                                    !isStarted && (
                                        <Button className='startButton' color="danger" variant="bordered"
                                                onClick={handleStartClick}
                                        >
                                            대화 시작
                                        </Button>
                                    )
                                }

                                {chatList.map((message, index) => (
                                    <div key={index} style={{width: "100%",}}>
                                        <div
                                            className={"chat-message_g " + (index % 2 === 0 ? "received-message_g" : "user-message")}>
                                            {index % 2 === 0 ? (
                                                <>
                                                    <strong>체리<br/></strong>
                                                </>
                                            ) : (
                                                <>
                                                    <strong>나<br/></strong>
                                                </>
                                            )}
                                            <p>{message.content}</p>
                                            {/* 특별한 메시지 아래에 버튼 추가 */}
                                            {message.isSpecialMessage && (
                                                <button onClick={() => handleImageCreateClick(message.content)}>
                                                    이미지 생성</button>
                                            )}
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
                                <Spinner className="spinnerChat" size="sm" color="danger" label="생각중" labelColor="danger"/>
                            )}
                            <div className="inputContainer">
                                <MessageInput
                                    // style = {{display:""}}
                                    userInput={userInput}
                                    setUserInput={setUserInput}
                                    handleSendMessage={handleSendMessage}
                                    isStarted={isStarted}
                                />
                            </div>
                            <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            </div>
    );
};

export default GPTChatRoom;

