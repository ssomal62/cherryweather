import React, { useEffect } from 'react';
import Layout from '../common/Layout';
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { IsLoginAtom } from "../recoil/LoginAtom";
import { instance } from '../recoil/module/instance';

const OauthInfo = () => {

      // 쿠키 선언
  const cookie = new Cookies();

  // recoil Atom으로 전역상태가 된 isLogin을 가져온다.
  const [isLogin, setIsLogin] = useRecoilState(IsLoginAtom);

    useEffect(() => {
        // URL에서 인증 코드(code) 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          sendTokenToServer(code);
        }
        console.log("백통신 실행됨")
      }, []);
    
      const sendTokenToServer = async (code) => {
        try {
          const response = await instance.post("/oauth/kakao/sign-in", {
            authCode: code, // 카카오 로그인 성공 후 받은 인증 코드
            provider: "KAKAO",
          });
          console.log(response.data);
          cookie.set("accessToken", response.data.accessToken, { path: "/" });
          setIsLogin(true);
        } catch (error) {
          console.error("서버 통신 실패:", error);
        }
      };
    return (
        <Layout>
            <div>OAuthInfo</div>
        </Layout>
    );
};

export default OauthInfo;