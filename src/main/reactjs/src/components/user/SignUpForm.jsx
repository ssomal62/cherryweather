// import React from "react";
// import "./Chat.css";
// import { useState, useEffect, useRef } from "react";
// import cherryLogo from "../../assets/images/brand/cw3.png";

// const fakeMessages = [
//   "사용할 ID를 입력해주세요",
//   "이름이 뭐예요?",
//   "사용할 암호를 입력해주세요",
//   "암호를 재확인합니다",
//   "성별을 입력해주세요",
//   "무엇을 하시나요?",
//   "멋지네요",
// ];

// const SignUpForm = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const [nextFakeMessageIndex, setNextFakeMessageIndex] = useState(0);

//   // 첫 번째 페이크 메시지를 표시하기 위한 초기 호출
//   useEffect(() => {
//     if (messages.length === 0 && nextFakeMessageIndex === 0) {
//       setTimeout(() => fakeMessage(), 500); // 첫 메시지는 자동으로
//     }
//   }, []);


//   const fakeMessage = () => {
//     // 다음 페이크 메시지를 추가합니다.
//     if (nextFakeMessageIndex < fakeMessages.length) {
//       const newMessage = {
//         text: fakeMessages[nextFakeMessageIndex],
//         id: Date.now(),
//         type: 'received',
//       };
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//       setNextFakeMessageIndex(nextFakeMessageIndex + 1); // 인덱스 업데이트
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 메시지 배열이 업데이트될 때마다 스크롤을 아래로 이동시킵니다.
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const insertMessage = () => {
//     if (!inputMessage.trim()) return;
//     const newMessage = {
//       text: inputMessage,
//       id: Date.now(),
//       type: 'personal',
//     };
//     setMessages(prevMessages => [...prevMessages, newMessage]);
//     setInputMessage('');

//     // 사용자 메시지 입력 후 다음 페이크 메시지를 추가합니다.
//     if (nextFakeMessageIndex < fakeMessages.length) {
//       setTimeout(() => fakeMessage(), 1000 + Math.random() * 20 * 100);
//     }
//   };

//   return (
//     <div className="chat">
//       <div className="chat-title">
//         {/* 채팅 타이틀 관련 요소 */}
//         <img src={cherryLogo} alt="Cherry" className="chat-logo" style={{width:"180px", marginLeft:"25px"}}/>
//       </div>
//       <div className="messages">
//         <div className="messages-content">
//           {/* 메시지를 렌더링하는 부분 */}
//           {messages.map(msg => (
//             <div key={msg.id} className={`message ${msg.type === 'personal' ? 'message-personal' : ''}`}>
//               {msg.text}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
//       <div className="message-box">
//         <textarea
//           type="text"
//           className="message-input"
//           placeholder="Type message..."
//           value={inputMessage}
//           onChange={e => setInputMessage(e.target.value)}
//           onKeyDown={e => e.key === 'Enter' && insertMessage()}
//         />
//         <button type="submit" className="message-submit" onClick={insertMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;