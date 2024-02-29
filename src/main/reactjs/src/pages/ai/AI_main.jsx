import React from 'react';
import Layout from "../../common/Layout";
import Widget from "../../components/ai/Widget";
import MainItem from "../../components/ai/GPT/MainItem";
import GPTChatHeader from "../../components/ai/GPT/GPTChatHeader";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {useLocation, useNavigate} from "react-router-dom";

const AI_main = () => {
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
            <MainItem/>
        </Layout>
    );
};

export default AI_main;