// import React, { useState, useEffect, useRef } from "react";
//
// import "../../../style/ChatRoomStyle.css";
// import {useGptChat} from "../../../recoil/hooks/UseGptChat";
//
//
// const GPTChatRoom = () => {
//
//   const [userInput, setUserInput] = useState(""); // 사용자 입력 상태
//   const messagesEndRef = useRef(null); // 메시지 스크롤을 자동으로 내릴 Ref
//
//   // useGptChat 훅을 사용하여 채팅 메시지를 불러옴
//   const fetchChatMessages = useGptChat();
//
//   useEffect(() => {
//     fetchChatMessages(); // 컴포넌트가 마운트되면 채팅 메시지를 불러옴
//   }, []);
//
//
//   return (
//       <div>
//         {fetchChatMessages.map((response) => (
//             <div>
//               <GPTChatRoom response={response}/>
//             </div>
//         ))}
//       </div>
//   );
// };
//
// export default GPTChatRoom;
