import React from 'react';
import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';
import { LuSettings } from "react-icons/lu";
import Profile from '../../components/mypage/Profile';
import Footer from '../../common/footer/Footer';
import MyClub from '../../components/mypage/MyClub';
import MyPickClub from '../../components/mypage/MyPickClub';
import MyPageMenu from '../../components/mypage/MyPageMenu';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
    const navigate = useNavigate();
    
    return (
    <>
    <Nav>
        <div style={{flex:"1px"}}>
        <IoArrowBack style={{width: 30, height: 30, color: 'black'}} onClick={()=>navigate("/")}/>
        </div>
        <TitleWapper><Title>마이페이지</Title></TitleWapper>
        <IconWapper onClick={()=>navigate("/mypage/setting")}><SettingsIcon /></IconWapper>
    </Nav>
        <Container>
        <Profile />
        <MyClub />
        <MyPickClub />
        <MyPageMenu />
        </Container>
    <Footer />
    </>
    );
};

export default Mypage;

export const Container = styled.div`
    margin: auto;
    padding: 10px 0 48px;
    padding-bottom: calc(env(safe-area-inset-bottom) + 48px);
    max-width: 600px;
    display: block;
`;

const SettingsIcon = styled(LuSettings)`
display: -ms-flexbox;
display: flex;
margin: 0 0 0 auto;
position: relative;
width: 24px;
height: 24px;
`;

export const IconWapper = styled.div`
text-align: right;
flex: 1;
`;

export const Title = styled.div`
font-weight: 700;
font-size: 17px;
line-height: 20px;
`;

export const TitleWapper = styled.div`
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
text-align: center;
flex: 2;
`;



export const Nav = styled.div`
height: 52px;
background: #FFFFFF;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
padding: 0 12px;
box-sizing: border-box;
z-index: 1;
position: sticky;
top: 0;
left: 0;
right: 0;
max-width: 600px;
margin: auto;
`;