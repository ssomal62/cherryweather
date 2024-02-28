import React from 'react';
import Layout from "../../common/Layout";
import GPT from "../../components/ai/GPT/GPTChatRoom"
import GPTChatHeader from "../../components/ai/GPT/GPTChatHeader";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";


const ChatGpt = () => {
    const isLogin = useRecoilValue(IsLoginAtom);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const handleBack = () => {
        navigate(from);
    }
    return (
        <Layout useFooter={false} useHeader={false}>
            <GPTChatHeader isLogin={isLogin} handleBack={handleBack}/>
            <GPT />
        </Layout>
    );
};

export default ChatGpt;