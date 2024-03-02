import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import GPT from "../../components/ai/GPT/GPTChatRoom"
import GPTChatHeader from "../../components/ai/GPT/GPTChatHeader";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";


const ChatGpt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/ai';
    const isLogin = useRecoilValue(IsLoginAtom);
    const handleBack = () => {
        navigate(from);
    }



    // 사용자가 로그인했다면 채팅 관련 컴포넌트를 보여줍니다.
    return (
        <Layout useFooter={false} useHeader={false}>
            <GPTChatHeader isLogin={isLogin} handleBack={handleBack}/>
            <GPT />
        </Layout>
    );
};

export default ChatGpt;