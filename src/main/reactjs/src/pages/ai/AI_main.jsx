import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import MainItem from "../../components/ai/GPT/MainItem";
import {useLocation, useNavigate} from "react-router-dom";
import MainTop from "../../components/ai/GPT/MainTop";
import AI_MainHeader from "../../components/ai/GPT/AI_MainHeader";
import LoginVerificationModal from "../../utils/LoginVerificationModal";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {useRecoilValue} from "recoil";
import {useFetchUserInfo, userInfoState} from "../../recoil/hooks/UseFetchUserInfo";

const AI_main = () => {
    const isLogin = useRecoilValue(IsLoginAtom);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBack = () => {
        navigate(from);
    }

    useEffect(() => {
        setIsModalOpen(!isLogin);
    }, []);

    const handleConfigurationsClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }

        navigate('/login')
    }
    // const fetchUserInfo = useFetchUserInfo();
    const userInfo = useRecoilValue(userInfoState);
    console.log(userInfo);

    // useEffect(() => {
    //     fetchUserInfo();
    //     console.log(userInfo)
    // }, []);

    // 활성 슬라이드를 추적하는 상태
    const [activeSlide, setActiveSlide] = useState(0);
    console.log("슬라이더 정보 : "+activeSlide);
    return (
        <Layout useHeader={false}>
            <AI_MainHeader isLogin={isLogin} handleBack={handleBack}/>
            {/*<MainTop index={activeSlide} />*/}
            <MainItem  index={activeSlide} isLogin={isLogin} setActiveSlide={setActiveSlide}  />

        </Layout>
    );
};
export default AI_main;