import React, { useEffect, useState } from "react";
import * as ncloudchat from "ncloudchat";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Avatar } from "@nextui-org/react";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";

const ChatRoomList = () => {
  const [ncloud, setNcloud] = useState("");
  const [channels, setChannels] = useState([]);
  const [accountData, setAccountData] = useState("");
  const [clubId, setClubId] = useState({});
  const cookies = new Cookies();
  const navi = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [lastMessages, setLastMessages] = useState({});
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleAdminChat = () => {
    navi("/chat/admin");
  };

  const accountCheck = async () => {
    try {
      const accessToken = cookies.get("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await instance.get("/account/user-info", config);
      setAccountData(res.data);
      console.log("accountData : ", res.data);

      const chat = new ncloudchat.Chat();
      chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNcloud(chat);

      await chat.connect({
        id: res.data.email,
        name: res.data.name,
        profile: res.data.profileImage,
        customField: "json",
      });

      const channelRes = await instance.get(
        "/chat/getchatlist?accountid=" + res.data.accountId
      );
      console.log("channelRes : ", channelRes);
      const channelIds = channelRes.data;

      const messages = {};

      for (const channel of channelIds) {
        const lastMessage = await getLastMessage(chat, channel);
        messages[channel.chatid] = lastMessage;
      }

      setLastMessages(messages);
      setChannels(channelIds);
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  useEffect(() => {
    accountCheck();
  }, []);

  // useEffect(() => {
  //   const initializeChat = async () => {
  //     try {
  //       const accessToken = cookies.get("accessToken");
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       };

  //       const res = await instance.get("/account/user-info", config);
  //       setAccountData(res.data);
  //       console.log("res.data : ", res.data);

  //       // const config2 = {
  //       //     headers: {
  //       //         //제이슨타입
  //       //         'Content-Type': 'application/json',
  //       //         //바디 폼데이터
  //       //     },
  //       // }

  //       // const formData = {
  //       //     "clubId": 19,
  //       // }

  //       // const res2 = await instance.post('/membership/query', {});
  //       // setClubId(res2.data);
  //       // console.log('res2 : ', res2);

  //       const chat = new ncloudchat.Chat();
  //       chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
  //       await chat.connect({
  //         id: accountData.email,
  //         name: accountData.name,
  //         profile: accountData.profileImage,
  //         customField: "json",
  //       });

  //       const filter = { state: true };
  //       const sort = { created_at: -1 };
  //       const option = { offset: 0, per_page: 100 };
  //       const response = await chat.getChannels(filter, sort, option);
  //       const channelsData = response.edges ? response.edges : [];
  //       const fetchedChannels = channelsData.map((edge) => edge.node);
  //       setChannels(fetchedChannels);
  //       setNcloud(chat);
  //     } catch (error) {
  //       console.error("Error initializing chat:", error);
  //     }
  //   };

  //   initializeChat();
  // }, []);

  useEffect(() => {
    const disconnectChat = async () => {
      if (ncloud) {
        await ncloud.disconnect();
      }
    };

    window.addEventListener("beforeunload", disconnectChat);

    return () => {
      window.removeEventListener("beforeunload", disconnectChat);
      disconnectChat();
    };
  }, [ncloud]);

  const getLastMessage = async (chat, channel) => {
    try {
      const filter = { channel_id: channel.chatid };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 1 };
      const channelMessages = await chat.getMessages(filter, sort, option);
      console.log("channelMessages : ", channelMessages);
      const lastMessage = channelMessages.edges[0]?.node;
      return lastMessage;
    } catch (error) {
      console.error("Error fetching last message:", error);
      return null;
    }
  };

  const handleCreateChannel = async () => {
    navi("/chat/admin");
    // if (ncloud) {
    //   try {
    //     const response = await instance.get(
    //       `/chat/getchatinfo?accountId=${accountData.accountId}`
    //     );
    //     const chatid = response.data.chatid;
    //     if (chatid) {
    //       await ncloud.disconnect();
    //       navi(`/chating/room/${chatid}`);
    //     } else {
    //       const newchannel = await ncloud.createChannel({
    //         type: "PUBLIC",
    //         name: "관리자 채팅방",
    //       });
    //       setChannels([...channels, { node: newchannel }]);
    //       await instance.post(
    //         "/chat/insertchatroom?accountid=" +
    //           accountData.accountId +
    //           "&chatRoom=" +
    //           newchannel
    //       );
    //       await ncloud.subscribe(newchannel.id);
    //       navi(`/chating/room/"${newchannel.id}"`);
    //     }
    //   } catch (error) {
    //     console.error("Error creating and subscribing channel:", error);
    //   }
    // }
  };
  // const handleChannelSelect = async (channelId, receiverNum, pramunum) => {
  //   setSelectedChannel(channelId);

  //   if (ncloud) {
  //     await ncloud.subscribe(channelId);
  //     await ncloud.disconnect();
  //     if (accountData.accountId == pramunum) {
  //       navi(`/chating/room/${channelId}/${receiverNum}`);
  //     } else {
  //       navi(`/chating/room/${channelId}/${pramunum}`);
  //     }
  //   }
  // };
  return (
    <div>
      <div>
        <button type="button" onClick={handleCreateChannel}>
          관리자와의 채팅
        </button>
      </div>
      <h2>채팅방 목록</h2>
      {channels.map((channel) => (
        <Link key={channel.id} to={`/chat/room/${channel.id}`}>
          <div className="channel-list">
            <Badge className="list-photo">
              <Avatar
                radius="md"
                size="lg"
                src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
              />
              <div style={{ marginLeft: "10px", marginTop: "15px" }}>
                <span>{channel.name}</span>
              </div>
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatRoomList;
