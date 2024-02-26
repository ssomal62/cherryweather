import React, { useEffect, useState } from "react";
import * as ncloudchat from "ncloudchat";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Avatar, Button, Divider, Tabs, Tab } from "@nextui-org/react";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";
import Layout from "../../common/Layout";
import { MdOutlinePadding } from "react-icons/md";
import ChatRoomListClub from "./ChatRoomListClub";
import ChatRoomListPersonal from "./ChatRoomListPersonal";

const ChatRoomList = () => {
  const [ncloud, setNcloud] = useState("");
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState([]);
  const [accountData, setAccountData] = useState("");
  const cookies = new Cookies();
  const navi = useNavigate();
  const [lastMessages, setLastMessages] = useState({});

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
        profile: res.data.email,
        customField: "json",
      });

      // 다른 상대가 초대한 채팅방 정보 가져오기

      const filter = { state: true };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      const response = await chat.getChannels(filter, sort, option);
      const channelsData = response.edges ? response.edges : {};
      const fetchedChannels = channelsData.map((edge) => edge.node);
      console.log("채널 정보: ", response.edges);

      console.log("fetchedChannels : ", fetchedChannels);

      const channelRes = await instance.get(
        "/chat/getchatlist?accountId=" + res.data.accountId
      );
      console.log("channelRes : ", channelRes);
      const channelIds = channelRes.data;
      console.log("channelIds : ", channelIds);
      const messages = {};

      for (const channel of channelIds) {
        const lastMessage = await getLastMessage(chat, channel);
        messages[channel.chatid] = lastMessage;
      }

      for (const cname of fetchedChannels) {
        for (const channelId of channelIds) {
          if (cname.id === channelId.chatRoom) {
            setChannelName((prevChannelName) => [
              ...prevChannelName,
              { name: cname.name },
            ]);
          }
        }
      }
      console.log(channelName);
      setLastMessages(messages);
      setChannels(channelIds);
      console.log("channels : ", channels);
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

  const tabs = [
    { id: "club", label: "클럽" },
    { id: "personal", label: "개인" },
  ];
  const [selectedTab, setSelectedTab] = useState("club");
  const handleTabChange = (value) => {
    setSelectedTab(value);
    console.log("선택", value);
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case "club":
        return (
          <ChatRoomListClub channelName={channelName} channels={channels} />
        );
      case "personal":
        return (
          <ChatRoomListPersonal channelName={channelName} channels={channels} />
        );
      default:
        // 다른 라우팅 처리 또는 반환 로직 추가
        return null;
    }
  };

  return (
    <Layout containerMargin="0" MdOutlinePadding="0">
      <Tabs
        variant="underlined"
        aria-label="Options"
        fullWidth
        size="lg"
        className="mb-5"
        onSelectionChange={handleTabChange}
        item={tabs}
        selectedKey={selectedTab}
      >
        {tabs.map((item) => (
          <Tab
            key={item.id}
            title={item.label}
            value={item.id}
            style={styles.title}
            selectedKey={selectedTab}
          />
        ))}
      </Tabs>
      {renderComponent()}
      {/* <h2 style={{ fontSize: 20, fontWeight: 400 }}>참여한 채팅</h2> */}
      <Divider />
    </Layout>
  );
};
export default ChatRoomList;

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 900,
  },
};
