import React, { useState, useEffect, useRef } from "react";

import "../../style/ChatRoomStyle.css";
import * as ncloudchat from "ncloudchat";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, NavbarMenuToggle, User } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbCherryFilled } from "react-icons/tb";
import Layout from "../../common/Layout";
import { Cookies } from "react-cookie";
import { instance } from "../../recoil/module/instance";
import ChatUserInfo from "./ChatUserInfo";

const ChatRoom = () => {
  const [ncloud, setNcloud] = useState("");
  const [accountData, setAccountData] = useState("");
  const { chatRoom } = useParams();
  const [channels, setChannels] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const cookies = new Cookies();
  const navi = useNavigate();

  useEffect(() => {
    const initializeChat = async () => {
      const chat = new ncloudchat.Chat();
      await chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNcloud(chat);
      const accessToken = cookies.get("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await instance.get("/account/user-info", config);
      setAccountData(res.data);
      console.log("accountData : ", accountData);
      console.log("ncloud : " + ncloud);
      chat.bind("onMessageReceived", async function (channel, message) {
        setMessages((prevMessages) => {
          const isDuplicate = prevMessages.some(
            (prevMessage) => prevMessage.message_id === message.message_id
          );
          if (isDuplicate) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      });
      await chat.connect({
        id: res.data.email,
        name: res.data.name,
        profile: res.data.profileImage,
        customField: "json",
      });

      // 채널 목록 가져오기
      const filter = { state: true };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      const response = await chat.getChannels(filter, sort, option);
      const channelsData = response.edges ? response.edges : {};
      const fetchedChannels = channelsData.map((edge) => edge.node);
      setChannels(fetchedChannels);

      await chat.subscribe(chatRoom);

      // 채널 메세지 가져오기
      const fetchedMessages = await fetchChannelMessages(chat, chatRoom);
      setMessages(fetchedMessages);
      console.log(messages[0]);
      // await chat.subscribe(channelId);
      // await chat.addUsers(channelId, [res2.data.uemail, res3.data.uemail]);
      // const existingChannelId = channelId;
    };
    initializeChat();
  }, []);

  const fetchChannelMessages = async (chat, channelId) => {
    try {
      // 필터와 정렬 옵션 설정
      const filter = { channel_id: channelId };
      const sort = { created_at: 1 };
      let offset = 0;
      const per_page = 100; // 한 번에 가져올 대화 개수
      let allMessages = [];
      while (true) {
        const option = { offset, per_page };
        const channelMessages = await chat.getMessages(filter, sort, option);
        console.log("channelMessages : " + channelMessages);
        const messagesData = channelMessages.edges ? channelMessages.edges : {};
        const messages = messagesData.map((edge) => edge.node);
        allMessages = allMessages.concat(messages);
        if (messages.length < per_page) {
          // 더 이상 가져올 대화 내용이 없으면 반복문 종료
          break;
        }
        offset += per_page;
      }
      return allMessages;
    } catch (error) {
      console.error("Error fetching channel messages:", error);
      return []; // 메시지 목록 불러오기 실패 시 빈 배열 반환
    }
  };

  // 메시지 전송

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      try {
        if (!ncloud) {
          throw new Error("Chat is not initialized");
        }
        // await nc.subscribe(channelId);
        const response = await ncloud.sendMessage(chatRoom, {
          type: "text",
          message: userInput,
        });
        // 메시지 전송 후 상태 변경하지 않도록 수정
        // setMessages(prevMessages => [...prevMessages, response]);
        setUserInput("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    // 메시지 목록이 업데이트될 때마다 실행되는 useEffect
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // 메시지 목록이 변경될 때마다 스크롤 이동

  useEffect(() => {
    const disconnectChat = async () => {
      if (ncloud) {
        await ncloud.disconnect();
      }
    };

    window.addEventListener("beforeunload", disconnectChat);

    // When component unmounts, disconnect
    return () => {
      window.removeEventListener("beforeunload", disconnectChat);
      disconnectChat();
    };
  }, [ncloud]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="user_chat_data">
              <div className="chat_section msg_history" id="chat-messages">
                <div className="chat-nav">
                  <span>
                    <IoIosArrowBack
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={() => navi("/chat")}
                    />
                  </span>
                  <span>
                    <GiHamburgerMenu
                      style={{
                        float: "right",
                        cursor: "pointer",
                        fontSize: "30px",
                      }}
                    />
                  </span>
                </div>

                {/* 현재 채널의 메시지 표시 */}
                {messages.map &&
                  messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        textAlign:
                          message.sender.id === accountData.email
                            ? "right"
                            : "left",
                        margin: "10px",
                      }}
                    >
                      {/* data.email */}
                      {message.sender.id !== accountData.email ? (
                        <User
                          onClick={handleAvatarClick}
                          className={
                            message.sender.id === accountData.email
                              ? "sent-message"
                              : "received-message"
                          }
                          avatarProps={{
                            src: "message.sender.profile",
                          }}
                          style={{ fontSize: "8px", color: "gray" }}
                        />
                      ) : null}

                      <div
                        style={{
                          backgroundColor:
                            message.sender.id === accountData.email
                              ? "lightblue"
                              : "lightgreen",
                          padding: "5px",
                          borderRadius: "4px",
                          display: "inline-block",
                        }}
                      >
                        <strong>{message.sender.name}</strong>
                        <div>{message.content}</div>
                        <div style={{ fontSize: "12px", color: "gray" }}>
                          {new Date(message.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                {isModalOpen && (
                  <ChatUserInfo messages={messages} accountData={accountData} />
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* 메시지 입력 및 전송 UI */}
              <div
                className="type_msg"
                style={{ position: "fixed", bottom: "50px", width: "600px" }}
              >
                <div className="input_msg_write">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="write_msg"
                      placeholder="Type a message"
                      value={userInput}
                      onChange={handleUserInput}
                    />
                    <button type="submit" className="msg_send_btn">
                      <TbCherryFilled
                        style={{ fontSize: "30px", color: "#F31260" }}
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
