import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useFetchUserInfo, userInfoState } from '../../recoil/hooks/UseFetchUserInfo';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const userInfo = useRecoilValue(userInfoState);
    const fetchUserInfo = useFetchUserInfo();
    const { profileImage, profileName } = userInfo;
    const imagwUrl = `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${profileImage}?type=f&w=600&h=600&ttype=jpg`;
    useEffect(() => {
      fetchUserInfo();
    }, []);

    const navigate = useNavigate();
    return (
      <Container>
            <ImageWapper>
                <ProfileImg src={imagwUrl} alt="profile" />
            </ImageWapper>
            <NickName>{profileName}</NickName>
            <Rating>내 온도 <b style={{color:"#F31260"}}>36.5</b></Rating>
            <InfoBtn onClick={()=>navigate("/modify/profile")}>프로필 편집</InfoBtn>
      </Container>
    );
};

export default Profile;

const Rating = styled.div`
margin: 0 0 18px;
    color: #4F5558;
    font-family: 'Avenir';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
`;

const InfoBtn = styled.button`
border-radius: 24px;
white-space: pre;
display: -ms-inline-flexbox;
display: inline-flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
padding: 6px 12px;
min-height: 32px;
min-width: 48px;
background: #F31260;
color: #FFFFFF;
`;

export const ProfileImg = styled.img`
width: auto;
height: 80px;
border-radius: 50%;
`;

export const ImageWapper = styled.div`
display: flex;
flex: 1 1 auto;
padding: 10px;
align-items: center;
-webkit-box-pack: center;
-webkit-box-align: center;
justify-content: center;
`;

const NickName = styled.div`
margin: 0 0 4px;
color: #242729;
font-weight: 700;
font-size: 20px;
line-height: 24px;
`;

const Container = styled.div`
    text-align: center;
    background: #FFFFFF;
`;