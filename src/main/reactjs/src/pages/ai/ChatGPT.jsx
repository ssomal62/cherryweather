import React from 'react';
import Layout from "../../common/Layout";
import ChatHeader from "../../components/ai/GPT/ChatHeader";
import GPT from "../../components/ai/GPT/GPTChatRoom"
const ChatGpt = () => {
    return (
        <Layout>
            <GPT />
        </Layout>
    );
};

export default ChatGpt;