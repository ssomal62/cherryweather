import React, { useEffect, useState } from "react";
import * as ncloudchat from "ncloudchat";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Avatar, Button } from "@nextui-org/react";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";

const ChatRoomList = () => {
  const [ncloud, setNcloud] = useState("");
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState([]);
  const [accountData, setAccountData] = useState("");
  const [clubId, setClubId] = useState({});
  const cookies = new Cookies();
  const navi = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [lastMessages, setLastMessages] = useState({});
  const [selectedChannel, setSelectedChannel] = useState("");

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
      console.log("accountData : ", accountData);

      const chat = new ncloudchat.Chat();
      chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNcloud(chat);

      await chat.connect({
        id: res.data.email,
        name: res.data.name,
        profile: res.data.email,
        customField: "json",
      });

      const filter = { state: true };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      const response = await chat.getChannels(filter, sort, option);
      const channelsData = response.edges ? response.edges : {};
      const fetchedChannels = channelsData.map((edge) => edge.node);
      setChannelName(fetchedChannels);
      console.log("channelName : ", channelName);

      const channelRes = await instance.get(
        "/chat/getchatlist?accountid=" + res.data.accountId
      );
      console.log("channelRes : ", channelRes);
      const channelIds = channelRes.data;
      console.log("channelIds : ", channelIds);
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
      const filter = { channel_id: channel.chatRoom };
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

  return (
    <div>
      <div>
        <Button
          onClick={handleCreateChannel}
          style={{
            position: "absolute",
            right: "10px",
            top: "70px",
            backgroundColor: "#F31260",
            color: "white",
          }}
        >
          관리자와의 채팅
        </Button>
      </div>
      {/* <h2 style={{ fontSize: 20, fontWeight: 400 }}>참여한 채팅</h2> */}
      {channels.map((channel) => (
        <Link key={channel.chatId} to={`/chat/room/${channel.chatRoom}`}>
          <div className="channel-list" style={{ marginTop: "60px" }}>
            <Badge className="list-photo">
              <Avatar
                radius="md"
                size="lg"
                src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
              />

              <div style={{ marginLeft: "10px", marginTop: "15px" }}>
                <span>{channelName[0].name}</span>
              </div>
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatRoomList;
