import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { clubDetailState } from "../../../recoil/hooks/UseClubApi";
import { useLikeClub } from "../../../recoil/hooks/UseLikeApi";
import { HeartIcon } from "../../../assets/icon/HeartIcon";
import { Cookies } from "react-cookie";
import { instance } from "../../../recoil/module/instance";
import { IsLoginAtom } from "../../../recoil/LoginAtom";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import { currentMembershipState } from "../../../recoil/hooks/UseMembershipApi";
import UnableToJoinModal from "./UnableToJoinModal";
import { userInfoState } from "../../../recoil/hooks/UseFetchUserInfo";

const ClubJoinButton = () => {
  const navigate = useNavigate();

  const isLogin = useRecoilValue(IsLoginAtom);

  const { clubDetail, liked: clubLiked } = useRecoilValue(clubDetailState);

  const myMembership = useRecoilValue(currentMembershipState);

  const myRole =
    myMembership && myMembership.info ? myMembership.info.role : "default";

  const [liked, setLiked] = useState(clubLiked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnableJoinModalOpen, setIsUnableJoinModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const cookie = new Cookies();

  const { toggleLikeClub } = useLikeClub();

  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    setRole(clubDetail.joinApprovalStatus === "JOIN" ? "MEMBER" : "WAITING");
    setLiked(clubLiked);
  }, [clubLiked, clubDetail.joinApprovalStatus]);

  const handleLikeClick = () => {
    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    setLiked(!liked);
    toggleLikeClub({ type: "CLUB", targetId: clubDetail.clubId });

    const likeAlarmData = {
      targetId: clubDetail?.representativeUserId,
      type: "LIKE",
      importance: 1,
      description: `${userInfo.name}님이 좋아요를 눌렀습니다.`
    };

    // 알림 데이터를 서버로 전송
    sendLikeAlarmData(likeAlarmData);
  };

  const sendLikeAlarmData = async (data) => {
    try {
      await instance.post("/alarm", data, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      });
      console.log("좋아요 알림 전송 성공", data);
    } catch (error) {
      console.error("좋아요 알림 전송 실패", error);
    }
  };

  const handleJoinClick = () => {
    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
      console.log("값확인" + clubDetail?.currentMembers )
  if(isLogin && (clubDetail?.currentMembers === clubDetail?.maxMembers)) {
      setIsUnableJoinModalOpen(true);
      return;
  }
    onSave();
  };

  const onSave = async () => {
    const requestData = {
      clubId: clubDetail.clubId,
      role: role,
    };

    const cookie = new Cookies();
    try {
      const res = await instance.post("/membership", requestData, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      });

      // 클럽 가입을 요청한 경우의 알림 데이터
      const joinRequestAlarmData = {
        targetId: clubDetail?.representativeUserId, // 클럽의 호스트 ID
        type: clubDetail?.joinApprovalStatus === "JOIN" ? "CLUBJOIN" : "CLUBWAIT",
        importance: 2,
        description: clubDetail?.joinApprovalStatus === "JOIN" ?
          `${userInfo.name}님이 클럽 가입 승인을 요청하였습니다.` :
          `${userInfo.name}님이 클럽 가입 승인 대기입니다.`
      };

      // 클럽 가입 요청 알림을 보냅니다.
      if (clubDetail.joinApprovalStatus === "JOIN" && userInfo.accountId !== clubDetail.representativeUserId) {
        await sendJoinAlarmData(joinRequestAlarmData);
        navigate("/club-join");
      }

      // 클럽 가입 승인 대기 알림을 보냅니다.
      if (clubDetail.joinApprovalStatus === "APPROVAL" && userInfo.accountId !== clubDetail.representativeUserId) {
        await sendJoinAlarmData(joinRequestAlarmData);
        navigate("/club-wait");
      }

      console.log("Success:", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendJoinAlarmData = async (data) => {
    const cookie = new Cookies();
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
  }

  const joinButtonRender = () => {
    switch (myRole) {
      case "HOST":
      case "MEMBER":
      case "MODERATOR":
        return (
          <Button
            fullWidth
            color="success"
            variant="solid"
            size="lg"
            radius="lg"
            style={{ marginRight: "2%", height: "70%" }}
            onClick={() => navigate("/chat/club", { state: { clubDetail } })}
          >
            <span style={styles.font}>채팅하기</span>
          </Button>
        );
      case "WAITING":
        return (
          <Button
            fullWidth
            color="primary"
            variant="solid"
            size="lg"
            radius="lg"
            style={{ marginRight: "2%", height: "70%" }}
          >
            <span style={styles.font}>가입대기중</span>
          </Button>
        );
      case "":
      default:
        return (
          <Button
            fullWidth
            color="danger"
            variant="solid"
            size="lg"
            radius="lg"
            style={{ marginRight: "2%", height: "70%" }}
            onPress={handleJoinClick}
          >
            <span style={styles.font}>가입하기</span>
          </Button>
        );
    }
  };

  return (
    <>
      <Footer>
        <ButtonContainer>
          <Button
            isIconOnly
            className="text-default-900/60 data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
            onPress={handleLikeClick}
          >
            <HeartIcon
              style={styles.icon}
              className={liked ? "[&>path]:stroke-transparent" : ""}
              fill={liked ? "currentColor" : "none"}
            />
          </Button>
        </ButtonContainer>

                {joinButtonRender()}
            </Footer>
            <LoginVerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
           <UnableToJoinModal isOpen={isUnableJoinModalOpen} onClose={() => setIsUnableJoinModalOpen(false)}/>
        </>
    );
};

export default ClubJoinButton;

const styles = {
  icon: {
    width: 30,
    height: 30,
    color: "#F31260",
  },
  font: {
    fontSize: 18,
    fontWeight: 600,
  },
};
const ButtonContainer = styled.div`
  flex: 0 1 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2% 0 2%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 9%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 30;
  background-color: white;
  box-shadow: 0px -4px 20px -5px rgba(0, 0, 0, 0.1);
`;
