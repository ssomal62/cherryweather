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
import ClubChat from "../../chat/ClubChat";

const ClubJoinButton = () => {
  const navigate = useNavigate();

  const isLogin = useRecoilValue(IsLoginAtom);

  const { clubDetail, liked: clubLiked } = useRecoilValue(clubDetailState);

  const myMembership = useRecoilValue(currentMembershipState);

  const myRole =
    myMembership && myMembership.info ? myMembership.info.role : "default";

  const [liked, setLiked] = useState(clubLiked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");

  const { toggleLikeClub } = useLikeClub();

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
  };

  const handleJoinClick = () => {
    if (!isLogin) {
      setIsModalOpen(true);
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

            if (clubDetail.joinApprovalStatus === "JOIN") {
                navigate("/club-join");
            }
            if (clubDetail.joinApprovalStatus === "APPROVAL") {
                navigate("/club-wait");
            }
            console.log("Success:", res);
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
        </>
    );
};

export default ClubJoinButton;

const styles = {
    icon: {
        width : 30,
        height: 30,
        color : "#F31260",
    },
    font: {
        fontSize  : 18,
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
