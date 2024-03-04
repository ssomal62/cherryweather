import React, { useState } from "react";
import Layout from "../../common/Layout";
import { IconWapper, LoginBtnText, LoginContainer, LogoImg, LogoWapper } from "./SignInMain";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IsLoginAtom } from "../../recoil/LoginAtom";
import {Chip, Divider, Input, useDisclosure} from "@nextui-org/react";
import styled from "styled-components";
import weatherImg from "../../assets/images/sun.png";
import { instance } from "../../recoil/module/instance";
import FindEmail from "./modal/FindEmail";


const LocalSignIn = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {isOpen : findEmailIsOpen, onOpen : findEmailOnOpen, onOpenChange:findEmailOnOpenChange} = useDisclosure();
    const [isLogin, setIsLogin] = useRecoilState(IsLoginAtom);

      // 로그인 form 데이터
      const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // 데이타를 인풋 밸류로 교체하는 함수
    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    //로그인 버튼 클릭시 실행되는 함수
    const submitLogin = async () => {
        try {
        //로그인 요청 보내기
        const res = await instance.post("/auth/sign-in", loginData);
        console.log(res);
        //토큰 쿠키에 저장
        cookies.set("accessToken", res.data.accessToken, { path: "/" });
        //로그인 상태 리코일로 변경
        setIsLogin(true);
        console.log(isLogin);
        //메인 페이지로 이동
        navigate("/");
        } catch (error) {
        alert(error.response.data.message);
        console.error(error);
        }
    }

    console.log(loginData.email, loginData.password);
    return (
        <Layout>
        <IconWapper>
          <LogoImg
            alt=""
            src={weatherImg}
            style={{ width: "100px", height: "100px" }}
          />
        </IconWapper>
        <LogoWapper>
            <p style={{fontSize: 25, fontWeight: 800}}>이메일 로그인</p>
        </LogoWapper>
        <LoginContainer>
        <LoginInput type="email" label="이메일" name="email" onChange={onChange}/>
        <LoginInput type="Password" label="비밀번호" name="password" onChange={onChange}/>
            <div className="flex h-5 items-center space-x-4 text-small">
                <Chip size="sm" variant="light" className="cursor-pointer" onClick={findEmailOnOpen}>아이디찾기</Chip>
                <Divider orientation="vertical" className="h-1/2"/>
                <Chip size="sm" variant="light" className="cursor-pointer">비밀번호찾기</Chip>
            </div>
            <SunlightButton style={{marginTop: "8%"}} onClick={()=>submitLogin()}>
            <LoginBtnText>로그인</LoginBtnText>
        </SunlightButton>
            <FindEmail isOpen={findEmailIsOpen} onOpenChange={findEmailOnOpenChange}/>
        </LoginContainer>
      </Layout>
    );
};

export default LocalSignIn;

const SunlightButton = styled.button`
  background-color: #F31260;
  max-width: 350px;
  width: 100%;
  color: white;
  padding: 15px 17px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF4171;
  }

  &:active {
    background-color: #FF4171;
  }
`;

const LoginInput = styled(Input)`
width: 100%;
max-width: 350px;
margin: 0 20px;
display: -ms-flexbox;
display: flex;
border-radius: 30px;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
margin-bottom: 10px;
position: relative;
overflow: hidden;
`;

const Title = styled.h1`
font-family: "YClover-Bold", sans-serif;
font-size: 24px;
`;
