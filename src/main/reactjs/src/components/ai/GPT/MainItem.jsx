import React, {useEffect, useState} from 'react';
import {Card, Button, CardFooter, Image} from '@nextui-org/react';
import { BiCloset } from "react-icons/bi";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";
import './css/mainItem.css';
import {useNavigate} from "react-router-dom"; // Make sure to create this CSS file in your project

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SwiperCore from "swiper";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import MainTop from "./MainTop";
import {useRecoilValue} from "recoil";
import {userInfoState} from "../../../recoil/hooks/UseFetchUserInfo";

const MainItem = ({index, isLogin, setActiveSlide }) => {
    const navigate = useNavigate();

    SwiperCore.use([Navigation]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const slidesData = [
        {
            title: "체리의 소곤소곤 옷장",
            description: ["전문 스타일리스트(?) 체리와 함께", "오늘의 옷차림을 골라보세요"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/youngsh92%40naver.com/42161429843982215070f513e1b-12d2-4e34-9c38-f4730713ccb5.png",
            navigateTo: '/gpt'
        },
        {
            title: "체리의 비밀 옷장",
            description: ["내가 선택한 옷을 보관하는", "나만의 비밀 옷장이에요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/youngsh92%40naver.com/54619020071927277513d1fcd13-99fb-41e6-ac4f-7e3477010d92.png",
            navigateTo: '/imageList'
        },
        {
            title: "체리의 드레스룸",
            description: ["체리가 자신있게 추천하는","Made in Cherry의 여러 스타일!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EB%93%9C%EB%A0%88%EC%8A%A4%EB%A3%B8.jpg",
            navigateTo: '/imageList'
        },
        {
            title: "체리의 꿈꾸는 옷장",
            description: ["랜덤으로 생성되는 옷차림이에요.","어떤옷이 나올지 체리도 몰라요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EA%BF%88%EA%BE%B8%EB%8A%94%20%EC%98%B7%EC%9E%A5%202.jpg",
            navigateTo: '/image'
        }
    ];

    const onSlideChange = (swiper) => {
        setActiveSlide(swiper.realIndex); // 현재 활성화된 슬라이드 인덱스로 상태 업데이트
    };

    const handleNavigate = (navigateTo) => {
        if (!isLogin) {
            // 로그인이 되어있지 않다면 모달을 열어 로그인하라는 메시지를 표시
            setIsModalOpen(true);
        } else {
            // 로그인이 되어있다면 페이지 이동
            navigate(navigateTo);
        }
    };

    const userInfo = useRecoilValue(userInfoState);
    console.log(userInfo);


    return  (
        <Swiper
            onSlideChange={onSlideChange} // onSlideChange 이벤트 핸들러 추가
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={200}
            slidesPerView={1}
            speed={800}
            navigation ={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',}}
            pagination={{ clickable: true,  el: '.swiper-pagination',
                renderBullet: (index, className) => {
                    return '<span class="' + className + '"></span>';
                }
            }}
            autoplay={{ delay: 3000 , pauseOnMouseEnter: true, disableOnInteraction: false,}}
            loop={true}
        >
            {slidesData.map((slide, index) => (
                <SwiperSlide key={index}>
                    <MainTop index={index} />
                    <div className="slide-content max-w-[700px] w-full" >
                        <Card isFooterBlurred className="w-full h-[400px]">
                            <Image
                                removeWrapper
                                isZoomed
                                className="z-0 w-full h-full object-cover"
                                src={slide.src}
                                objectFit="cover"
                                width="100%"
                                height="100%"
                                alt={slide.title}
                                onClick={() => handleNavigate(slide.navigateTo)}
                            />
                            <CardFooter className="absolute bg-white/80 bottom-0 z-10  border-default-600 ">
                                <div className="flex flex-grow gap-2 items-center">
                                    <BiCloset size="40px"/>
                                    <div className="flex flex-col">
                                        <p className="card-title text-medium uppercase font-bold text-black">{slide.title}</p>
                                        {slide.description.map((line, lineIndex) => (
                                            <React.Fragment key={lineIndex}>
                                                <span className="card-description text-tiny font-medium text-black">{line}</span>
                                                {lineIndex < slide.description.length - 1}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <Button radius="full" size="sm" onClick={() => handleNavigate(slide.navigateTo)}>이동하기</Button>

                            </CardFooter>
                        </Card>
                        <button className="swiper-button-next">
                            <IoArrowForwardOutline />
                        </button>
                        <button className="swiper-button-prev">
                            <IoArrowBackOutline />
                        </button>
                    </div>
                    <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MainItem;