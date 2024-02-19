import React, {Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../recoil/LoginAtom";
// import { lazy } from "react";

// 일반적인 임포트 방법
import Home from "../pages/Home";
import Club from "../pages/club/Club";
// import Login from "../pages/Login";
import WebNotificationTest from "../components/webnotification/WebNotificationTest";
import OauthInfo from "../pages/OAuthInfo";
import AddClub from "../pages/club/AddClub";
// import ClubDetails from "../pages/club/ClubDetails";
import BlockIfLoggedIn from "../components/access/BlockIfLoggedIn";
import SignIn from "../pages/auth/SignIn";
import LocalSignIn from "../components/auth/LocalSignIn";
import SignUp from "../pages/user/SignUp";
import MyPage from "../pages/user/MyPage";
import AI_main from "../pages/ai/AI_main";
import GPT from "../pages/ai/ChatGPT";
import AI_image from "../pages/ai/ImageGenerator";


// 레이즈 라우터 임포트 방법
// const Login = lazy(() => import("../pages/Login"));
// const Home = lazy(() => import("../pages/Home"));
// const Club = lazy(() => import("../pages/Club"));

// 레이즈 라우터를 사용하기 위해선 위와같은 임포트 방식을 사용하여야 한다
// 일반적인 라우터와 레이즈 라우터의 차이점은
// 일반적인 라우터는 컴포넌트를 불러오는 시점에 컴포넌트를 불러오지만
// 레이즈 라우터는 컴포넌트를 불러오는 시점에 컴포넌트를 불러오지 않고
// 라우터에 접근했을 때 컴포넌트를 불러온다

// Suspense 컴포넌트는 레이즈 라우터를 사용할 때 필수 사용을 권장한다.
// Suspense 컴포넌트는 fallback 속성을 가지고 있는데
// fallback 속성은 레이즈 라우터를 사용할 때 컴포넌트를 불러오는 시점에
// 사용자에게 보여줄 컴포넌트를 지정하는 속성이다
// fallback 속성에는 일반적으로 로딩 컴포넌트를 넣어준다
// fallback 속성에 넣어준 컴포넌트는 레이즈 라우터를 사용할 때
// 컴포넌트를 불러오는 시점에 사용자에게 보여준다
// fallback 속성에 넣어준 컴포넌트는 Suspense 컴포넌트가 사라지면
// 같이 사라진다

const Router = () => {
  const isLogin = useRecoilValue(IsLoginAtom);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>로딩중..잠만기달...</div>}>
        {/* Suspense는 레이즈 라우터 사용시 컴포넌트가 로드되는 동안 표시하는 화면을 출력할 수 있다*/}
        <Routes>
          {/* 로그인 여부와 상관없이 접근할 수 있는 페이지  */}
          <Route path="/" element={<Home />} />
          {/* 로그인 없이 접근 가능하나 로그인이 되어있으면 접근 불가한 페이지 */}
          <Route path="/login" element={<BlockIfLoggedIn><SignIn /></BlockIfLoggedIn>} />
          <Route path="/login/local" element={<LocalSignIn />} />
          <Route path="/oauth" element={<BlockIfLoggedIn><OauthInfo /></BlockIfLoggedIn>} />
          <Route path="/join" element={<BlockIfLoggedIn><SignUp /></BlockIfLoggedIn>} />
          <Route path="/mypage" element={<MyPage /> } />
          {/* 로그인 상태가 true여야 접근할 수 있는 페이지 */}
          <Route path="/club" element={<Club />} />
          {/* <Route path="/clubdetails/:num" element={<ClubDetails />} /> */}
             {/*<Route path=":num" element={<ClubDetails />} />*/}

          <Route path="/club-add" element={<AddClub />} />
          <Route path="/ai" element={<AI_main />} />
          <Route path="/gpt" element={<GPT />} />
          <Route path="/image" element={<AI_image />} />



          {/* WebNotificationTest 경로 추가 */}
          <Route
            path="/web-notification-test"
            element={<WebNotificationTest />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
