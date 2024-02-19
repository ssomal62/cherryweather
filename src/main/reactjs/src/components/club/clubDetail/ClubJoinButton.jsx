import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../../recoil/hooks/UseClubDetailState";
import {useLikeClub} from "../../../recoil/hooks/UseLikedState";
import {HeartIcon} from "../../../assets/icon/HeartIcon";

const ClubJoinButton = () => {

    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);
    const club = useRecoilValue(clubDetailState);
    const {toggleLikeClub} = useLikeClub();

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

            <Button
                fullWidth
                color='danger'
                variant='solid'
                size='lg'
                radius='lg'
                style={{marginRight:'2%', height:'70%'}}
                onPress={()=> navigate('/club-join')}
            >
                <span style={styles.font}> 가입하기 </span>
                <small className="text-default-500">가입한 경우 채팅입장으로 변경</small>
            </Button>

        </Footer>
    );
};

export default ClubJoinButton;

const styles = {
    icon     : {
        width : 30,
        height: 30,
        color : '#F31260',
    },
    font     : {
        fontSize  : 18,
        fontWeight: 600,
    },
}
const ButtonContainer = styled.div`
  flex: 0 1 20%; // Flex basis set to 20%, allowing this item to grow or shrink
  display: flex;
  justify-content: center;
  align-items: center;
  margin : 0 2% 0 2%;
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
