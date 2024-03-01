import React, { useState, useEffect, useRef } from "react";
import "../../style/ChatRoomStyle.css";
import * as ncloudchat from "ncloudchat";
import { useNavigate, useParams } from "react-router-dom";
import { User, useDisclosure } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPaperclip, BsSend } from "react-icons/bs";
import Layout from "../../common/Layout";
import { Cookies } from "react-cookie";
import { instance } from "../../recoil/module/instance";
import ChatUserInfo from "./ChatUserInfo";
import ChatUserListModal from "./ChatUserList";

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
  const [senderProfile, setSenderProfile] = useState({});
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
    };
    initializeChat();
  }, [chatRoom]);

  console.log("channels 채널 정보 : ", channels);

  const fetchChannelMessages = async (chat, channelId) => {
    try {
      const filter = { channel_id: channelId };
      const sort = { created_at: 1 };
      let offset = 0;
      const per_page = 100;
      let allMessages = [];

      while (true) {
        const option = { offset, per_page };
        const channelMessages = await chat.getMessages(filter, sort, option);
        const messagesData = channelMessages.edges ? channelMessages.edges : {};
        const messages = await Promise.all(
          messagesData.map(async (edge) => {
            const message = edge.node;
            // 여기서 각 메시지 발신자의 프로필 정보를 가져옵니다.
            try {
              const profileResponse = await instance.get(
                `/account/getfinduser?email=${message.sender.id}`
              );
              // 프로필 이미지 URL을 메시지 객체에 추가합니다.
              message.sender.profileImage = profileResponse.data.profileImage;
              setSenderProfile(message.sender.profileImage);
            } catch (profileError) {
              console.error("Error fetching sender profile:", profileError);
              // 프로필 정보를 가져오는데 실패한 경우, 기본 값을 사용할 수 있습니다.
              message.sender.profileImage = "기본이미지URL";
            }
            return message;
          })
        );

        allMessages = allMessages.concat(messages);
        if (messages.length < per_page) {
          break; // 더 이상 가져올 대화 내용이 없으면 반복문 종료
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
    try {
      if (!ncloud) {
        throw new Error("Chat is not initialized");
      }

      // 이미지가 있을 경우
      if (uploadImage) {
        console.log("chatRoom : ", chatRoom);
        const formData = new FormData();
        formData.append("file", uploadImage);
        formData.append("chatRoom", chatRoom);

        // 이미지 업로드 API 호출
        const images = await instance.post("/chat/upload", formData);
        console.log("images 이미지 : ", images);

        // 이미지 전송 API 호출 (예시, 실제 함수는 환경에 따라 다를 수 있음)
        const imgres = await ncloud.sendImage(chatRoom, uploadImage);
      }

      // 메시지가 있고, 이미지가 없을 경우
      if (userInput.trim() !== "" && !uploadImage) {
        // 메시지 전송 API 호출
        const response = await ncloud.sendMessage(chatRoom, {
          type: "text",
          message: userInput,
        });
      }

      // 입력 필드 초기화
      setUserInput("");
      setUploadImage(null);
    } catch (error) {
      console.error("Error:", error);
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

  // 채팅방 나가기
  useEffect(() => {
    const fetchCurrentChatId = async () => {
      try {
        const response = await instance.get(
          `/chat/getchatlist?accountId=${accountData.accountId}`
        );
        console.log("현재 채널", response.data);
        const currentChatName = response.data.find(
          (chat) => chat.chatRoom === chatRoom
        )?.chatName;
        const currentChat = response.data.find(
          (chat) => chat.chatRoom === chatRoom
        );
        console.log("currentChat", currentChat);
        setChannelName(currentChatName);
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

  console.log("messages 메세지 정보 : ", messages);

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
                  isOpen={isOpen}
                  onClose={onClose}
                  messages={messages}
                  profileImage={senderProfile}
                />
                {/*{renderMessages()}*/}
                {/* 현재 채널의 메시지 표시 */}

                {messages
                  .filter((message) => message.channel_id === chatRoom)
                  .map((message, index) => (
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
                            src: `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${
                              message.sender.profileImage ===
                              "기본이미지 넣어야함"
                                ? "default_image.jpg"
                                : message.sender.profileImage
                            }?type=f&w=600&h=600&ttype=jpg`,
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
                          borderRadius:
                            message.attachment_filenames.name !== ""
                              ? "10px"
                              : "4px",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
                      >
                        {message.sender.id === accountData.email ? null : (
                          <strong>{message.sender.name}</strong>
                        )}
                        <div>{message.content}</div>
                        {message.attachment_filenames &&
                          message.attachment_filenames.url && (
                            <img
                              src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/chat/${chatRoom}/${message.attachment_filenames.name}?type=f&w=600&h=600&ttype=jpg`}
                              style={{
                                maxWidth: "170px",
                                borderRadius: "10px",
                              }}
                              alt="image"
                            />
                          )}
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
                      style={{ cursor: "pointer" }}
                      className="modal-overlay"
                      onClick={closeModal}
                      selectedMsg={selectedMsg}
                      accountData={accountData}
                      nc={ncloud}
                    />
                  </div>
                )}
                <div ref={messagesEndRef} />
                {/* 메시지 입력 및 전송 UI */}

                <div className="type_msg">
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      border: "1px solid #eaeaea",
                      width: "100%",
                      maxWidth: "600px",
                    }}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                      <BsPaperclip size={20} />
                    </label>
                    <input
                      type="text"
                      value={userInput}
                      onChange={handleUserInput}
                      placeholder="메시지를 입력하세요..."
                      style={{
                        width: "100%",
                        flexGrow: 2,
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                      className="gap-1"
                    />
                    <button
                      type="submit"
                      variant="contained"
                      css={{ width: "fit-content" }}
                      size="small"
                      className="ml-2 mr-2"
                    >
                      <BsSend />
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
