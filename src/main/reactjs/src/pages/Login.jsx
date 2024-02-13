import React from "react";
import Layout from "../common/Layout";
import { Button } from "@nextui-org/react";
import styled from "styled-components";
import { Input } from "@nextui-org/react";

const Login = () => {

  const onKakaoLogin = () => {
    window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=b88ca7fa19db1413d2a289f79c168f97&redirect_uri=http://localhost:9002/oauth&response_type=code";
  };

  return (
    <Layout>
      <Conatiner>
        <LogoDiv>체리웨더</LogoDiv>
        <FormDiv>
          <div
            key="sm"
            className="flex w-full flex-wrap md:flex-nowrap mb-1 md:mb-0 gap-4"
          >
            <Input size="sm" type="email" label="Email" />
          </div>
          <div
            key="sm"
            className="flex w-full flex-wrap md:flex-nowrap mb-3 md:mb-0 gap-4"
          >
            <Input size="sm" type="password" label="password" />
          </div>
          <JoinButton
            style={{ backgroundColor: "rgb(255, 212, 0)", border: "none" }}
          >
            <JoinText>로그인</JoinText>
          </JoinButton>
        </FormDiv>
        <OauthDiv>
          <OauthTitle>SNS 간편 로그인</OauthTitle>
          <IconWapper>
            <IconBtn style={{ backgroundColor: "rgb(30, 200, 0)" }}>
              <IconImg
                alt=""
                src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/naver-logo_v2.png"
              />
            </IconBtn>
                <IconBtn onClick={onKakaoLogin} style={{ backgroundColor: "rgb(249, 224, 0)" }} >
                  <img
                    src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/kakao-logo_v2.png"
                    alt="Kakao login"
                  />
                </IconBtn>
            <IconBtn
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(228, 229, 237)",
              }}
            >
              <IconImg
                alt=""
                src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/google-logo_v2.png"
              />
            </IconBtn>
          </IconWapper>
        </OauthDiv>
        <JoinDiv>
          <JoinButton>
            <JoinText>회원가입</JoinText>
          </JoinButton>
        </JoinDiv>
      </Conatiner>
    </Layout>
  );
};

export default Login;

const JoinText = styled.span`
  font-family: "Metro Sans", sans-serif;
  box-sizing: border-box;
`;

const JoinButton = styled(Button)`
  outline: none;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s ease 0s, border-color 0.3s ease 0s;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  height: 42px;
  font-size: 16px;
  padding: 0px 20px;
  line-height: 16px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(200, 202, 210);
  color: rgb(33, 34, 36);
`;

const IconImg = styled.img`
  overflow-clip-margin: content-box;
  overflow: clip;
  height: 24px;
  aspect-ratio: auto 24 / 24;
  width: 24px;
  box-sizing: border-box;
  border-style: none;
`;

const IconBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;

const IconWapper = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-top: 8px;
`;

const OauthTitle = styled.h5`
  margin: 0;
  color: #212224;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0;
`;

const JoinDiv = styled.div`
  box-sizing: border-box;
`;

const OauthDiv = styled.div`
margin: 20px 0px 16px;
border: 1px solid rgb(228, 229, 237);
padding: 16px;
border-radius: 8px;
`;

const FormDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  flex: 1 1 0%;
`;

const LogoDiv = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const Conatiner = styled.div`
  padding: 15px 18px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
`;
