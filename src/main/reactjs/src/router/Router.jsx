import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "../pages/Home";

import OauthInfo from "../pages/OAuthInfo";
import AddClub from "../pages/club/AddClub";
import ClubDetails from "../pages/club/ClubDetails";
import BlockIfLoggedIn from "../components/access/BlockIfLoggedIn";
import ClubConfigurations from "../pages/club/ClubConfigurations";
import ClubMembers from "../pages/club/ClubMembers";
import ClubJoin from "../pages/club/ClubJoin";
import SignIn from "../pages/auth/SignIn";
import LocalSignIn from "../components/auth/LocalSignIn";
import SignUp from "../pages/user/SignUp";
import MyPage from "../pages/user/MyPage";
import AI_main from "../pages/ai/AI_main";
import GPT from "../pages/ai/ChatGPT";
import AI_image from "../pages/ai/ImageGenerator";
import WeatherDetail from "../pages/weather/WeatherDetail";
import AI_imageList from "../pages/ai/SavedImage";
import Community from "../pages/community/Community";
import MySetting from "../components/mypage/MySetting";
import ModifyProfile from "../components/mypage/ModifyProfile";

import Chat from "../pages/chat/Chat";
import Event from "../pages/event/Event";
import Adminchat from "../components/chat/Adminchat";
import ChatRoom from "../components/chat/ChatRoom";
import ClubWaitingToJoin from "../pages/club/ClubWaitingToJoin";

import NaverCallBack from "../pages/auth/NaverCallBack";
import Search from "../pages/search/Search";
import AddClubSuccess from "../pages/club/AddClubSuccess";
import FeedEditor from "../pages/feed/FeedEditor";
import ClubFeedList from "../pages/club/ClubFeedList";
import ClubChat from "../components/chat/ClubChat";
import AddEvent from "../components/event/AddEvent";
import ImageGallery from "../pages/ai/ImageGallery";
import Casual from "../components/ai/image/Casual";
import Modern from "../components/ai/image/Modern";
import Sporty from "../components/ai/image/Sporty";
import Classic from "../components/ai/image/Classic";

const Router = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>로딩중...</div>}> {/* Suspense : 레이즈 라우터 사용시 컴포넌트가 로드되는 동안 표시하는 화면을 출력*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/login"
                        element={
                            <BlockIfLoggedIn>
                                <SignIn/>
                            </BlockIfLoggedIn>
                        }
                    />
                    <Route path="/login/local" element={<LocalSignIn/>}/>
                    <Route
                        path="/oauth"
                        element={
                            <BlockIfLoggedIn>
                                <OauthInfo/>
                            </BlockIfLoggedIn>
                        }
                    />
                    <Route
                        path="/join"
                        element={
                            <BlockIfLoggedIn>
                                <SignUp/>
                            </BlockIfLoggedIn>
                        }
                    />
                    <Route path="/mypage" element={<MyPage/>}/>
                    <Route path="/mypage/setting" element={<MySetting/>}/>
                    <Route path="/modify/profile" element={<ModifyProfile/>}/>
                    <Route
                        path="/oauth/callback/naver"
                        element={
                            <BlockIfLoggedIn>
                                <NaverCallBack/>
                            </BlockIfLoggedIn>
                        }
                    />
                    <Route path="/community" element={<Community/>}>
                        <Route path=":selectPage" element={<Community/>}/>
                    </Route>

                    <Route path="/search" element={<Search/>}/>

                    <Route path="/club-details/:clubId" element={<ClubDetails/>}/>
                    <Route path="/club-add" element={<AddClub/>}>
                        <Route path=":clubId" element={<AddClub/>}/>
                    </Route>
                    <Route path="/add-success/:clubId" element={<AddClubSuccess/>}/>
                    <Route path="/club-configurations" element={<ClubConfigurations/>}/>
                    <Route path="/club-members/:clubId" element={<ClubMembers/>}/>
                    <Route path="/club-join" element={<ClubJoin/>}/>
                    <Route path="/club-wait" element={<ClubWaitingToJoin/>}/>
                    <Route path="/club-feed/:clubId" element={<ClubFeedList/>}/>

                    <Route path="/feed-editor" element={<FeedEditor/>}>
                        <Route path=":feedId" element={<FeedEditor/>}/>
                    </Route>

                    <Route path="/ai" element={<AI_main/>}/>
                    <Route path="/gpt" element={<GPT/>}/>
                    <Route path="/image" element={<AI_image/>}/>
                    <Route path="/imageList" element={<AI_imageList/>}/>
                    <Route path="/gallery" element={<ImageGallery/>}/>
                    <Route path="/casual" element={<Casual/>} />
                    <Route path="/modern" element={<Modern />} />
                    <Route path="/sporty" element={<Sporty />} />
                    <Route path="/classic" element={<Classic />} />
                    <Route path="/weatherDetail" element={<WeatherDetail/>}/>

                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/chat/room/:chatRoom/:clubId" element={<ChatRoom/>}/>
                    <Route path="/chat/admin" element={<Adminchat/>}/>
                    <Route path="/chat/club" element={<ClubChat/>}/>

                    <Route path="/event" element={<Event/>}/>
                    <Route path="/event-add" element={<AddEvent/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
