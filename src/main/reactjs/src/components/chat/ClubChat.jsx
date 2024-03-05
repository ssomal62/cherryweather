import * as ncloudchat from "ncloudchat";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";

function ClubChat() {
  const [accountData, setAccountData] = useState("");
  const [nc, setNc] = useState("");
  const navi = useNavigate();
  const cookies = new Cookies();

  const location = useLocation();
  const { clubDetail } = location.state || {};

  const buttonRef = useRef(null);

  useEffect(() => {
    // 여기서 setTimeout을 사용하여 일정 시간 후에 버튼을 클릭합니다.
    const delayTimeInMilliseconds = 1000; // 5초 후에 클릭하려면 5000ms로 설정합니다.
    setTimeout(() => {
      buttonRef.current.click();
    }, delayTimeInMilliseconds);
  }, []);
  useEffect(() => {
    unumchk();
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
      const chat = new ncloudchat.Chat();
      chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNc(chat);
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
      console.log("club: " + clubDetail.clubId);
      console.log("getChatInfo");
      console.log("accountId: " + accountData.accountId);
      const response = await instance.get(
        `/chat/getclubchatinfo?accountId=${accountData.accountId}&clubId=${clubDetail?.clubId}`
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getChatClubId = async () => {
    try {
      const response2 = await instance.get(
        `/chat/getchatroombyclubid?clubId=${clubDetail?.clubId}`
      );
      console.log("response2: ", response2.data);
      return response2.data;
    } catch (error) {
      console.error(error);
    }
  };

  const insertClubChat = async () => {
    if (nc) {
      try {
        const chatroom = await getChatInfo();
        const clubArray = await getChatClubId();
        const clubId = clubArray.toString();
        console.log("clubId: " + clubId);
        if (chatroom) {
          await nc.disconnect();
          navi(`/chat/room/${chatroom}/${clubDetail?.clubId}`);
        } else if (clubId.length > 0) {
          await instance.post(
            "/chat/insertclubchatroom?accountId=" +
              accountData.accountId +
              "&chatRoom=" +
              clubId +
              "&clubId=" +
              clubDetail?.clubId +
              "&chatName=" +
              clubDetail?.name
          );
          await nc.subscribe(clubId);
          // 채팅방으로 이동
          await nc.disconnect();
          navi(`/chat/room/${clubId}/${clubDetail?.clubId}`);
        } else {
          const newchannel = await nc.createChannel({
            type: "PUBLIC",
            name: `${clubDetail?.name} 채팅방`,
          });
          const newChatId = newchannel.id;

          const res = await instance.post(
            "/chat/insertclubchatroom?accountId=" +
              accountData.accountId +
              "&chatRoom=" +
              newChatId +
              "&clubId=" +
              clubDetail?.clubId +
              "&chatName=" +
              clubDetail?.name
          );
          console.log(res.data);
          console.log("res", res);
          await nc.subscribe(newChatId);
          // 채팅방으로 이동
          await nc.disconnect();
          navi(`/chat/room/${newChatId}/${clubDetail?.clubId}`);
        }
      } catch (error) {
        console.error("Error creating and subscribing channel:", error);
        window.location.reload();
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
    <div>
      <button ref={buttonRef} type="button" onClick={insertClubChat}></button>
    </div>
  );
}

export default ClubChat;
