import React, { useEffect, useState } from "react";
import * as ncloudchat from "ncloudchat";
import { Tabs, Tab } from "@nextui-org/react";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";
import Layout from "../../common/Layout";
import ChatRoomListClub from "./ChatRoomListClub";
import ChatRoomListPersonal from "./ChatRoomListPersonal";

const ChatRoomList = () => {
  const [ncloud, setNcloud] = useState("");
  const [channels, setChannels] = useState([]);
  const [accountData, setAccountData] = useState("");
  const cookies = new Cookies();
  const [messages, setMessages] = useState([]);

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

      const filter = { state: true };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      const response = await chat.getChannels(filter, sort, option);
      const channelsData = response.edges ? response.edges : {};
      const fetchedChannels = channelsData.map((edge) => edge.node);

      const channelRes = await instance.get(
        "/chat/getchatlist?accountId=" + res.data.accountId
      );
      const channelIds = channelRes.data;
      const channelsWithLastMessage = await Promise.all(
        channelIds.map(async (channel) => {
          const lastMessage = await getLastMessage(chat, channel);
          return { ...channel, lastMessage }; // 채널 정보에 최근 메시지 정보 추가
        })
      );

      // 최근 메시지 기준으로 채널 목록 정렬
      const sortedChannels = channelsWithLastMessage.sort((a, b) => {
        const dateA = new Date(a.lastMessage?.created_at || 0).getTime();
        const dateB = new Date(b.lastMessage?.created_at || 0).getTime();
        return dateB - dateA; // 내림차순 정렬
      });
      setChannels(sortedChannels);
      console.log("channels : ", channels);
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };
  useEffect(() => {
    accountCheck();
  }, []);

  console.log("channels 채널 : ", channels);
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

      setMessages(channelMessages);
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
        return <ChatRoomListClub channels={channels} />;
      case "personal":
        return (
          <ChatRoomListPersonal
            channels={channels}
            ncloud={ncloud}
            accountData={accountData}
            messages={messages}
          />
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
