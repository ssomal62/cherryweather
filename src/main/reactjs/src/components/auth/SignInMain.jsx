import React from "react";
import { Button } from "@nextui-org/react";
import styled from "styled-components";
import weatherLogo from "../../assets/images/brand/cw3.png";
import weatherImg from "../../assets/images/sun.png";
import { useNavigate } from "react-router-dom";

const SignInMain = () => {
    const navigate = useNavigate();

    // 이미지 url
    const kakaoImgUrl =
      "https://d2v80xjmx68n4w.cloudfront.net/assets/icon/kakao-logo_v2.png";
    const naverImgUrl =
      "https://d2v80xjmx68n4w.cloudfront.net/assets/icon/naver-logo_v2.png";
  
    // 카카오 간편 로그인
    const onKakaoLogin = () => {
      window.location.href =
        // "https://kauth.kakao.com/oauth/authorize?client_id=b88ca7fa19db1413d2a289f79c168f97&redirect_uri=http://cherryweather.site/oauth&response_type=code";
        "https://kauth.kakao.com/oauth/authorize?client_id=b88ca7fa19db1413d2a289f79c168f97&redirect_uri=http://localhost:9002/oauth&response_type=code";
    };

  return (
    <>
      <IconWapper>
        <LogoImg
          alt=""
          src={weatherImg}
          style={{ width: "150px", height: "150px" }}
        />
      </IconWapper>
      <LogoWapper>
        <LogoImg alt="logo" src={weatherLogo} />
      </LogoWapper>
      <LoginContainer>
        <LoginBtn onClick={onKakaoLogin} style={{ backgroundColor: "#FEE500" }}>
          <IconImg alt="kakao" src={kakaoImgUrl} />
          <LoginBtnText>카카오로 로그인하기</LoginBtnText>
        </LoginBtn>
        <LoginBtn style={{ backgroundColor: "rgb(30, 200, 0)" }}>
          <IconImg alt="naver" src={naverImgUrl} />
          <LoginBtnText>네이버로 로그인하기</LoginBtnText>
        </LoginBtn>
        <LoginBtn
          onClick={() => navigate("/login/local")}
          style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}
        >
          <IconImg alt="naver" src={weatherImg} />
          <LoginBtnText>이메일로 로그인하기</LoginBtnText>
        </LoginBtn>
        <JoinWapper>
          <JoinText onClick={()=>navigate("/join")}>회원가입</JoinText>
          <Hr />
          <JoinText>문의하기</JoinText>
        </JoinWapper>
      </LoginContainer>
    </>
  );
};

export default SignInMain;

export const Hr = styled.hr`
  width: 1px;
  height: 13px;
  margin: 0 14px;
  background: #d2d5d6;
  border: none;
`;

export const JoinText = styled.span`
  font-weight: 400;
  color: #4f5558;
  text-decoration: inherit;
  font-size: 13px;
  line-height: 16px;
`;

export const JoinWapper = styled.div`
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
  padding-bottom: 32px;
  margin-top: 10px;
`;

export const LogoWapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  justify-content: center;
  margin-bottom: 30px;
`;

export const LoginBtnText = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
`;

export const LoginContainer = styled.div`
  flex: 0 1 auto;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  display: flex;
`;

export const LogoImg = styled.img`
  width: auto;
  height: 40px;
`;

export const IconWapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding: 10px;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  justify-content: center;
`;

export const LoginBtn = styled(Button)`
  width: 100%;
  max-width: 400px;
  margin: 0 32px;
  padding: 12px 16px;
  display: -ms-flexbox;
  display: flex;
  border-radius: 24px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
`;

export const IconImg = styled.img`
  overflow-clip-margin: content-box;
  overflow: clip;
  height: 24px;
  aspect-ratio: auto 24 / 24;
  width: 24px;
  box-sizing: border-box;
  border-style: none;
`;
