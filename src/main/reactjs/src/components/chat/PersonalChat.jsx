import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";

function PersonalChat({ userInfo, accountData, nc }) {
  const navi = useNavigate();


  const buttonRef = useRef(null);
  const cookie = new Cookies();

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

          await nc.subscribe(newChatId);
          // 채팅방을 생성한 사람과 대화를 시작한 사람이 다를 경우에만 알림을 보냅니다.
          if (accountData.accountId !== userInfo.accountId) {
            const chatPersonalAlarmData = {
              targetId: userInfo.accountId, // targetId에 새로운 채팅방 Id를 추가
              type: "PERSONALCHAT",
              importance: 2,
              description: `${accountData.name}님과의 1대1 대화방이 생성되었습니다.`,
            };
            await sendChatAlarmData(chatPersonalAlarmData);
            console.log("알람 : ", sendChatAlarmData);

            await nc.disconnect();
          }
          // 개인 채팅방 생성 알림 전송(주석부분)
          // 채팅방으로 이동
          navi(`/chat/room/${newChatId}/${userInfo.accountId}`);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error creating and subscribing channel:", error);
      }
    }
  };

  const sendChatAlarmData = async (data) => {
    try {
      // 데이터 전송 전에 조건을 확인하여 올바른 targetId에게만 알림을 보냅니다.
      if (data.targetId !== userInfo.accountId) {
        await instance.post("/alarm", data, {
          headers: {
            Authorization: `Bearer ${cookie.get("accessToken")}`,
          },
        });
      }
    } catch (error) {
      console.error("Alarm Data Error:", error);
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
