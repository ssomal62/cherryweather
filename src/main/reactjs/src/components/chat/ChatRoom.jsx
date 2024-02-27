import React, { useState, useEffect, useRef } from "react";

import "../../style/ChatRoomStyle.css";
import * as ncloudchat from "ncloudchat";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea, User, useDisclosure } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSend } from "react-icons/bs";
import Layout from "../../common/Layout";
import { Cookies } from "react-cookie";
import { instance } from "../../recoil/module/instance";
import ChatUserInfo from "./ChatUserInfo";
import ChatUserListModal from "./ChatUserList";
import { HiOutlinePaperClip } from "react-icons/hi";

const ChatRoom = () => {
  const [ncloud, setNcloud] = useState(null);
  const [accountData, setAccountData] = useState("");
  const { chatRoom } = useParams();
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState({});
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const cookies = new Cookies();
  const navi = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState({});
  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
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
      const chat = new ncloudchat.Chat();
      await chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNcloud(chat);
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

        if (uploadImage) {
          // Send image
          await ncloud.sendImage(chatRoom, uploadImage);
          const response = await ncloud.sendMessage(chatRoom, {
            type: "text",
            message: userInput,
          });
          // setMessages(prevMessages => [...prevMessages, response]);
        } else {
          // Send message
          const response = await ncloud.sendMessage(chatRoom, {
            type: "text",
            message: userInput,
          });
          // setMessages(prevMessages => [...prevMessages, response]);
        }

        setUserInput("");
        setUploadImage(null);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
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

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("modal-opened-body");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-opened-body");
  };

  const handleAvatarClick = (message) => {
    setSelectedMsg(message);
  };

  useEffect(() => {
    for (const channel of channels) {
      if (channel.id === chatRoom) {
        setChannelName(channel.name);
        // do something with channelName
        break;
      }
    }
  }, [channels, chatRoom]);
  // 채팅방 나가기
  useEffect(() => {
    const fetchCurrentChatId = async () => {
      try {
        const response = await instance.get(
          `/chat/getchatlist?accountId=${accountData.accountId}`
        );
        console.log("현재 채널", response.data);
        const currentChat = response.data.find(
          (chat) => chat.chatRoom === chatRoom
        );
        console.log("currentChat", currentChat);
        setCurrentChannelId(currentChat);
      } catch (error) {
        console.error("Error occurred: ", error);
      }
    };

    fetchCurrentChatId();
  }, [accountData.accountId, chatRoom]);

  const disconnectChat = async () => {
    if (currentChannelId) {
      const message = {
        type: "text",
        message: `${accountData.name}님이 채팅방을 나갔습니다.`,
      };
      await ncloud.sendMessage(chatRoom, message);
      await ncloud.unsubscribe(chatRoom);
      await instance.delete(
        `/chat/deletechatroom?chatId=${currentChannelId.chatId}&chatRoom=${chatRoom}`
      );

      navi("/chat");
    }
  };

  return (
    <Layout
      useHeader={false}
      useFooter={false}
      containerMargin="0"
      containerPadding="0"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="user_chat_data">
              <div className="chat_section msg_history" id="chat-messages">
                <div className="chat-nav">
                  <span>
                    <IoIosArrowBack
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                      onClick={() => navi("/chat")}
                    />
                  </span>
                  <strong>{channelName}</strong>

                  <span>
                    <GiHamburgerMenu
                      style={{
                        float: "right",
                        cursor: "pointer",
                        fontSize: "20px",
                        marginRight: "10px",
                      }}
                      onClick={onOpen}
                    ></GiHamburgerMenu>
                  </span>
                </div>

                <ChatUserListModal
                  disconnectChat={disconnectChat}
                  channelName={channelName}
                  isOpen={isOpen}
                  onClose={onClose}
                />

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
                          onClick={() => {
                            handleAvatarClick(message);
                            openModal();
                          }}
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
                              ? "#0084FF"
                              : "#f1f0f0",
                          color:
                            message.sender.id === accountData.email
                              ? "white"
                              : "black",
                          padding: "5px",
                          borderRadius: "4px",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
                      >
                        {message.sender.id === accountData.email ? null : (
                          <strong>{message.sender.name}</strong>
                        )}
                        <div>{message.content}</div>
                        <div style={{ fontSize: "10px" }}></div>
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          textAlign:
                            message.sender.id === accountData.email
                              ? "right"
                              : "left",
                          marginLeft:
                            message.sender.id === accountData.email
                              ? "0"
                              : "58px",
                        }}
                      >
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                {isModalOpen && (
                  <div>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <ChatUserInfo
                      className="modal-overlay"
                      onClick={closeModal}
                      selectedMsg={selectedMsg}
                      accountData={accountData}
                      nc={ncloud}
                    />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* 메시지 입력 및 전송 UI */}
              <div
                className="type_msg"
                style={{ position: "fixed", bottom: 0, width: "100%" }}
              >
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Textarea
                    placeholder="메시지를 입력해주세요."
                    className="write_msg"
                    type="text"
                    variant="underlined"
                    value={userInput}
                    onChange={handleUserInput}
                    bordered
                    style={{}} // 메시지 입력란이 남은 공간을 모두 차지하도록 설정
                  />
                  <div>
                    <input
                      type="file"
                      id="uploadImage"
                      name="file"
                      onChange={handleImageUpload}
                    />
                    <HiOutlinePaperClip
                      className="img_send_btn"
                      style={{
                        color: "#F31260",
                        cursor: "pointer",
                        alignContent: "left",
                      }}
                    />
                  </div>
                  <button type="submit" className="msg_send_btn">
                    <BsSend style={{ color: "#F31260" }} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
