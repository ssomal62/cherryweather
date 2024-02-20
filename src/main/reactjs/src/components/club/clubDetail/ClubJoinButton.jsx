import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../../recoil/hooks/UseClubDetailState";
import {useLikeClub} from "../../../recoil/hooks/UseLikedState";
import {HeartIcon} from "../../../assets/icon/HeartIcon";
import {Cookies} from "react-cookie";
import axios from "axios";

const ClubJoinButton = ({isMember}) => {

    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const club = useRecoilValue(clubDetailState)

    const {toggleLikeClub} = useLikeClub();

    const onSave = async () => {

        const requestData = {
            clubId: club.clubId,
        };

        const cookie = new Cookies();
        try {
            const res = await axios.post('http://localhost:9002/api/membership', requestData, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`
                }
            });

            navigate('/club-join');
            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLikeClick = () => {
        setLiked(!liked);
        toggleLikeClub(club.clubId).then(r => r);
    };

    return (
        <Footer>
            <ButtonContainer>
                <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onPress={() => setLiked((v) => !v)}
                >
                    <HeartIcon
                        style={styles.icon}
                        className={liked ? "[&>path]:stroke-transparent" : ""}
                        fill={liked ? "currentColor" : "none"}
                    />
                </Button>
            </ButtonContainer>

            {isMember ? (
                <Button fullWidth color="success" variant="solid" size="lg" radius="lg"
                        style={{marginRight: "2%", height: "70%"}}
                        //onPress={} 채팅 페이지로 이동
                >
                    <span style={styles.font}>
                      채팅하기
                    </span>
                </Button>
            ) : (
                <Button fullWidth color="danger" variant="solid" size="lg" radius="lg"
                        style={{marginRight: "2%", height: "70%"}}
                        onPress={onSave}
                >
                    <span style={styles.font}>
                      가입하기
                    </span>
                </Button>
            )}

        </Footer>
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
