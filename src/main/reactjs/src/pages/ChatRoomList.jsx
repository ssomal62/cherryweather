import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import * as ncloudchat from 'ncloudchat';
import { Link } from 'react-router-dom';
import { Badge, Avatar } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import '../style/ChatRoomListStyle.css';

const ChatRoomList = () => {
    const [ncloud, setNcloud] = useState('');
    const [channels, setChannels] = useState([]);
    const [currentChannelId, setCurrentChannelId] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const initializeChat = async () => {
            const chat = new ncloudchat.Chat();
            await chat.initialize("2eec90a6-59fb-4abd-99b4-f002d5d9a0cf");
            setNcloud(chat);

            await chat.connect({
                id: 'dbsgusgh2004@naver.com',
                name: 'Admin',
                profile: 'dbsgusgh2004@naver.com',
                customField: 'json',
                // id: 'yoon1994@naver.com',
                // name: 'yoon',
                // profile: 'yoon1994@naver.com',
                // customField: 'json',
            });

            // 채널 목록 가져오기
            const filter = { state: true };
            const sort = { created_at: -1 };
            const option = { offset: 0, per_page: 100 };
            const response = await chat.getChannels(filter, sort, option);
            const channelsData = response.edges ? response.edges : {};
            const fetchedChannels = channelsData.map(edge => edge.node);
            setChannels(fetchedChannels);


        };

        initializeChat();
    }, []);

    // const selectChannel = async (channelId) => {
    //     setCurrentChannelId(channelId);
    //     await ncloud.subscribe(channelId);
    //     // 여기에서 선택된 채널의 메시지를 가져오는 로직을 추가할 수 있습니다.
    //     // 예시로는 fetchChannelMessages 같은 함수를 정의하고 사용할 수 있습니다.
    // };

    useEffect(() => {
        const disconnectChat = async () => {
            if (ncloud) {
                await ncloud.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        // When component unmounts, disconnect
        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [ncloud]);
    return (
        <Layout>
            <h2>채팅방 목록</h2>
            {channels.map((channel) => (
                <Link key={channel.id} to={`/chatroom/${channel.id}`}>
                    <div className='channel-list'>
                        <Badge
                            // isOneChar
                            // content={<NotificationIcon size={12} />}
                            // color="danger"
                            // shape="circle"
                            // placement="top"
                            className="list-photo">
                            <Avatar
                                radius="md"
                                size="lg"
                                src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                            />
                            <div style={{ marginLeft: '10px', marginTop: '15px' }}>
                                <span>{channel.name}</span>
                            </div>
                        </Badge>
                    </div>
                </Link>
            ))
            }

        </Layout >
    );
};

export default ChatRoomList;

