import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../recoil/hooks/UseFetchUserInfo';
import Image from '../../assets/images/club/person/1.jpg'

const Profile = () => {
    const userInfo = useRecoilValue(userInfoState);
    return (
      <Container>
            <ImageWapper>
                <ProfileImg src={Image} alt="profile" />
            </ImageWapper>
            <NickName>{userInfo.profileName}</NickName>
            <Rating>내 온도 <b style={{color:"#F31260"}}>36.5</b></Rating>
            <InfoBtn>프로필 편집</InfoBtn>
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

const ProfileImg = styled.img`
width: auto;
height: 80px;
border-radius: 50%;
`;

const ImageWapper = styled.div`
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