import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useState } from "react";
import { instance } from "../module/instance";
import { useNavigate } from "react-router-dom";
import { userInfoState } from "./UseFetchUserInfo";
import { ncloudchat } from "ncloudchat";

export const JoinClubChat = atom({
  key: "joinClubChat",
  default: [],
});

export const UseFetchClubChat = ({ clubId }) => {
  const [userInfo] = useRecoilState(userInfoState);
  const setClubChat = useRecoilValue(JoinClubChat);
  const [nc, setNc] = useState("");
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      const chat = new ncloudchat.Chat();
      chat.initialize("11af8973-18b8-48c2-86ee-ac1993451e1b");
      setNc(chat);

      await nc.connect({
        id: userInfo.email,
        name: userInfo.name,
        profile: userInfo.profileImage,
        customField: "json",
      });

      const newchannel = await nc.createChannel({
        type: "PUBLIC",
        name: "클럽 이름 채팅방",
      });

      const newChatId = newchannel.id;
      const res = await instance.post(
        `/chat/insertclubchatroom?accountid=${userInfo.accountId}&chatRoom=${newChatId}&clubid=${clubId}`
      );
      setClubChat(res.data);
      console.log("res.data : ", res.data);
      // 채팅방 구독
      await nc.subscribe(newChatId);
      // 채팅방으로 이동
      await nc.disconnect();
      navigate(`/chat/room/${newChatId}`);
    } catch (error) {
      console.error("채팅방 생성 실패", error);
    }
  }, [setClubChat]);
};
