import React from "react";
import styled from "styled-components";
import menuImg from "../../assets/images/menu.png";

const Footer = () => {
    return (
        <BottomNav>
            <BottomWapper>
                <Div></Div>
                <BtnWapper><A><img alt="" src={menuImg} style={{width:'28px', height:'28px'}}/><BtnText>홈</BtnText></A></BtnWapper>
                <BtnWapper><A><img alt="" src={menuImg} style={{width:'28px', height:'28px'}}/><BtnText>추천모임</BtnText></A></BtnWapper>
                <BtnWapper><A><img alt="" src={menuImg} style={{width:'28px', height:'28px'}}/><BtnText>찜</BtnText></A></BtnWapper>
                <BtnWapper><A><img alt="" src={menuImg} style={{width:'28px', height:'28px'}}/><BtnText>마이페이지</BtnText></A></BtnWapper>
            </BottomWapper>
        </BottomNav>
    );
};

export default Footer;

const BtnText = styled.div`
  color: #242729;
  text-align: center;
  font-size: 11px;
  line-height: 13px;
`;

const A = styled.a`
  color: inherit;
  text-decoration: inherit;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 7.5px 0 6px;
  position: relative;
`;

const BtnWapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  transition: 0.2s cubic-bezier(0.19, 1, 0.22, 1);
`;

const Div = styled.div`
  position: absolute;
  pointer-events: none;
  width: 101%;
  height: 50%;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;
const BottomWapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-around;
  border-radius: 16px 16px 0px 0px;
  background: #ffffff;
  border-top: 0.5px solid #d2d5d6;
  border-left: 0.5px solid #d2d5d6;
  border-right: 0.5px solid #d2d5d6;
  position: relative;
  max-width: 600px;
  margin: auto;
`;

const BottomNav = styled.div`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 10;
`;
