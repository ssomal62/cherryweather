import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components';
import {useFetchUserInfo, userInfoState} from '../../recoil/hooks/UseFetchUserInfo';
import {useNavigate} from 'react-router-dom';
import {Avatar, Button} from "@nextui-org/react";
import {FaPen} from "react-icons/fa6";

const Profile = () => {
    const userInfo = useRecoilValue(userInfoState);
    const fetchUserInfo = useFetchUserInfo();
    const { profileImage, profileName } = userInfo;
    const imageUrl = `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${profileImage}?type=f&w=600&h=600`
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const navigate = useNavigate();
    return (
        <Container>
            <ImageWapper>
                <div className="relative z-10">
                    <Button
                        isIconOnly
                        radius="full"
                        color="default"
                        variant="faded"
                        startContent={<FaPen/>}
                        style={{
                            position: 'absolute',
                            top     : '75%',
                            right   : '0',
                            zIndex  : 20
                        }}
                        onClick={() => navigate("/modify/profile")}
                    />
                    <Avatar
                        isBordered
                        radius="full"
                        color="default"
                        showFallback
                        src={imageUrl}
                        alt="profile"
                        style={{width: '120px', height: '120px'}}
                    />
                </div>
            </ImageWapper>
            <NickName>{profileName}</NickName>
            {/*<Rating>내 온도 <b style={{color:"#F31260"}}>36.5</b></Rating>*/}
        </Container>
    );
};

export default Profile;

export const ImageWapper = styled.div`
  margin: 5% 0 5% 0;
  display: flex;
  flex: 1 1 auto;
  padding: 10px;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  justify-content: center;
  position: relative;
`;

const NickName = styled.div`
  margin: 0 0 5% 0;
  color: white;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const Container = styled.div`
  text-align: center;
`;
