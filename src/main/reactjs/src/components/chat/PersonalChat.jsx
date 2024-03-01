import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../recoil/module/instance";

function PersonalChat({ userInfo, accountData, nc }) {
  const navi = useNavigate();

  const buttonRef = useRef(null);

  useEffect(() => {
    // 여기서 setTimeout을 사용하여 일정 시간 후에 버튼을 클릭합니다.
    const delayTimeInMilliseconds = 1000; // 5초 후에 클릭하려면 5000ms로 설정합니다.
    setTimeout(() => {
      buttonRef.current.click();
    }, delayTimeInMilliseconds);
  }, []);

  useEffect(() => {
    personalChat();
  }, []);

  const getChatInfo = async () => {
    try {
      console.log("getChatInfo");
      console.log("accountId: " + accountData.accountId);
      const response = await instance.get(
        `/chat/getonetonechat?accountId=${accountData.accountId}&raccountId=${userInfo.accountId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const personalChat = async () => {
    if (nc) {
      try {
        const chatInfo = await getChatInfo();
        const chatroom = chatInfo.chatRoom;
        if (chatroom) {
          await nc.disconnect();
          navi(`/chat/room/${chatroom}/${userInfo.accountId}`);
          window.location.reload();
        } else {
          // chatroom == null 일 경우
          const newchannel = await nc.createChannel({
            type: "PUBLIC",
            name: `${userInfo.name}님과의 채팅방`,
          });
          const newChatId = newchannel.id;
          const res = await instance.post(
            "/chat/createchatroom?accountId=" +
              accountData.accountId +
              "&chatRoom=" +
              newChatId +
              "&raccountId=" +
              userInfo.accountId +
              "&chatName=" +
              `${newchannel.name}`
          );
          await instance.post(
            "/chat/createchatroom?accountId=" +
              userInfo.accountId +
              "&chatRoom=" +
              newChatId +
              "&raccountId=" +
              accountData.accountId +
              "&chatName=" +
              `${accountData.name}님과의 채팅방`
          );

          console.log("res : ", res);
          await nc.subscribe(newChatId);
          await nc.disconnect();
          // 채팅방으로 이동
          navi(`/chat/room/${newChatId}/${userInfo.accountId}`);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error creating and subscribing channel:", error);
      }
    }
  };
  useEffect(() => {
    const disconnectChat = async () => {
      if (nc && nc !== null) {
        await nc.disconnect();
      }
    };
    window.addEventListener("beforeunload", disconnectChat);
    // When component unmounts, disconnect
    return () => {
      window.removeEventListener("beforeunload", disconnectChat);
      disconnectChat();
    };
  }, [nc]);

  return (
    <div>
      <div>
        <button ref={buttonRef} type="button" onClick={personalChat}></button>
      </div>
    </div>
  );
}
export default PersonalChat;
