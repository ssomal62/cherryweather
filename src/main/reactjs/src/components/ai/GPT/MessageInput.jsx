// MessageInput.jsx
import React from 'react';
import {BsSend} from "react-icons/bs";

function MessageInput({ userInput, setUserInput, handleSendMessage, isStarted }) {
    return (
        <div className="type_msg_g">
            <div className="input_msg_write_g">
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="write_msg_g"
                        placeholder="메세지를 입력하세요."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={!isStarted}
                    />
                    {/* 시작하기 버튼 클릭 전에는 Send 버튼 숨김 */}
                    {isStarted && (
                        <button type="submit" className="msg_send_btn_g"><BsSend /></button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default MessageInput;