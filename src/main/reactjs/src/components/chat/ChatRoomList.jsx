import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Avatar } from "@nextui-org/react";
import { instance } from '../../recoil/module/instance';
import { Cookies } from 'react-cookie';

const ChatRoomList = () => {
    const [ncloud, setNcloud] = useState('');
    const [channels, setChannels] = useState([]);
    const [accountData, setAccountData] = useState('');
    const [clubId, setClubId] = useState({});
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const initializeChat = async () => {
            try {
                const accessToken = cookies.get('accessToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                const res = await instance.get('/account/user-info', config);
                setAccountData(res.data);
                console.log('res : ', res);


                const config2 = {
                    headers: {
                        //제이슨타입
                        'Content-Type': 'application/json',
                        //바디 폼데이터
                    },
                }

                const formData = {
                    "clubId": 19,
                }

                const res2 = await instance.post('/membership/query', {});
                setClubId(res2.data);
                console.log('res2 : ', res2);


                const chat = new ncloudchat.Chat();
                await chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
                await chat.connect({
                    id: accountData.email,
                    name: accountData.name,
                    profile: accountData.email,
                    customField: 'json',
                });

                const filter = { state: true };
                const sort = { created_at: -1 };
                const option = { offset: 0, per_page: 100 };
                const response = await chat.getChannels(filter, sort, option);
                const channelsData = response.edges ? response.edges : [];
                const fetchedChannels = channelsData.map(edge => edge.node);
                setChannels(fetchedChannels);
                setNcloud(chat);
            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        initializeChat();


    }, []);

    useEffect(() => {
        const disconnectChat = async () => {
            if (ncloud) {
                await ncloud.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [ncloud]);

    return (
        <div>
            <div>
                <button>
                    관리자와의 채팅
                </button>
            </div>
            <h2>채팅방 목록</h2>
            {
                channels.map((channel) => (
                    <Link key={channel.id} to={`/chat/room/${channel.id}`}>
                        <div className='channel-list'>
                            <Badge className="list-photo">
                                <Avatar radius="md" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
                                <div style={{ marginLeft: '10px', marginTop: '15px' }}>
                                    <span>{channel.name}</span>
                                </div>
                            </Badge>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
};

export default ChatRoomList;