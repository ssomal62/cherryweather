import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../../recoil/hooks/UseClubDetailState";
import {useLikeClub} from "../../../recoil/hooks/UseLikedState";
import {HeartIcon} from "../../../assets/icon/HeartIcon";
import {Cookies} from "react-cookie";
import {instance} from "../../../recoil/module/instance";
import {IsLoginAtom} from "../../../recoil/LoginAtom";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import {memberInfoState, useCheckMember} from "../../../recoil/hooks/CheckIsMember";

const ClubJoinButton = ({clubId}) => {

    const navigate = useNavigate();

    useCheckMember(clubId);

    const isLogin = useRecoilValue(IsLoginAtom);
    const club = useRecoilValue(clubDetailState)
    const membership = useRecoilValue(memberInfoState);

    const [liked, setLiked] = useState(club.liked);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState('');

    const {toggleLikeClub} = useLikeClub();

    useEffect(() => {
        setRole(club.clubDetail.joinApprovalStatus === "JOIN" ? "MEMBER" : "WAITING")
        setLiked(club.liked);
    }, [club.liked, club.clubDetail.joinApprovalStatus]);

    const handleLikeClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        setLiked(!liked);
        toggleLikeClub({type: "CLUB", targetId: club.clubDetail.clubId});
    };

    const handleJoinClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        onSave();
    }

    const onSave = async () => {
        console.log("클럽 조인 스테이ㅓ티" + club.clubDetail.joinApprovalStatus);

        const requestData = {
            clubId: club.clubDetail.clubId,
            role  : role
        };

        const cookie = new Cookies();
        try {
            const res = await instance.post('/membership', requestData, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`
                }
            });

            if (club.clubDetail.joinApprovalStatus === "JOIN") {
                navigate('/club-join');
            }
            if (club.clubDetail.joinApprovalStatus === "APPROVAL") {
                navigate('/club-wait');
            }
            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const joinButtonRender = () => {
        switch (membership?.role) {
            case "HOST":
            case "MEMBER":
            case "MODERATOR":
                return <Button fullWidth color="success" variant="solid" size="lg" radius="lg"
                               style={{marginRight: "2%", height: "70%"}}>
                            <span style={styles.font}>채팅하기</span>
                        </Button>
            case "WAITING" :
                return <Button fullWidth color="primary" variant="solid" size="lg" radius="lg"
                            style={{marginRight: "2%", height: "70%"}}>
                        <span style={styles.font}>가입대기중</span>
                        </Button>
            default :
                return <Button fullWidth color="danger" variant="solid" size="lg" radius="lg"
                        style={{marginRight: "2%", height: "70%"}}
                        onPress={handleJoinClick}>
                        <span style={styles.font}>가입하기</span>
                       </Button>
        }
    }

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
            <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
};

export default ClubJoinButton;

const styles = {
    icon: {
        width : 30,
        height: 30,
        color : '#F31260',
    },
    font: {
        fontSize  : 18,
        fontWeight: 600,
    },
}
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
  box-shadow: 0px -4px 20px -5px rgba(0, 0, 0, 0.1)
`;
