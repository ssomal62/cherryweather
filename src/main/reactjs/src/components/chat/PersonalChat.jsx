import * as ncloudchat from "ncloudchat";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";

function PersonalChat(props) {
  const [accountData, setAccountData] = useState("");
  const [nc, setNc] = useState("");
  const navi = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    unumchk();
  }, []);

  const buttonRef = useRef(null);

  useEffect(() => {
    // 여기서 setTimeout을 사용하여 일정 시간 후에 버튼을 클릭합니다.
    const delayTimeInMilliseconds = 1000; // 5초 후에 클릭하려면 5000ms로 설정합니다.
    setTimeout(() => {
      buttonRef.current.click();
    }, delayTimeInMilliseconds);
  }, []);

  const unumchk = async () => {
    try {
      const accessToken = cookies.get("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await instance.get("/account/user-info", config);
      setAccountData(res.data);
      console.log("res : ", res);
      const chat = new ncloudchat.Chat();
      chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNc(chat);
      console.log("nc : ", nc);
      await chat.connect({
        id: res.data.email,
        name: res.data.name,
        profile: res.data.profileImage,
        customField: "json",
      });
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  const getChatInfo = async () => {
    try {
      console.log("getChatInfo");
      console.log("accountId: " + accountData.accountId);
      const response = await instance.get(
        `/chat/getchatinfo?accountid=${accountData.accountId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const adminChat = async () => {
    if (nc) {
      try {
        const chatroom = await getChatInfo();
        if (chatroom) {
          await nc.disconnect();
          navi(`/chat/room/${chatroom}`);
        } else {
          // chatroom == null 일 경우
          const newchannel = await nc.createChannel({
            type: "PUBLIC",
            name: "관리자 채팅방",
          });
          const newChatId = newchannel.id;
          await instance.post(
            "/chat/insertchatroom?accountid=" +
              accountData.accountId +
              "&chatRoom=" +
              newChatId
          );

          await nc.subscribe(newChatId);
          // 채팅방으로 이동
          await nc.disconnect();
          navi(`/chat/room/${newChatId}`);
        }
      } catch (error) {
        console.error("Error creating and subscribing channel:", error);
      }
    }
  };

  useEffect(() => {
    const disconnectChat = async () => {
      if (nc) {
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
    <div style={{ textAlign: "center", fontSize: "50px" }}>
      <button ref={buttonRef} type="button" onClick={adminChat}>
        관리자와 채팅방으로 이동 중..
      </button>
    </div>
  );
}

export default PersonalChat;
