import React, {useEffect, useState} from 'react';
import {Card, Button, CardFooter, Image, CardHeader} from '@nextui-org/react';
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
            title: "옷차림 추천",
            description: ["매일 아침, 무엇을 입을지 고민되시나요?","체리가 여러분의 스타일을 분석해 개인 맞춤형 패션을 제안해 드려요. 오늘의 코디를 체리와 함께 결정해보세요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C8.png",
            navigateTo: '/gpt'
        },
        {
            title: "찜 추천 불러오기",
            description: ["꼼꼼히 고른 옷차림, 어디에 저장해두셨나요?","체리의 비밀 옷장에서는 여러분의 모든 스타일을 안전하게 보관해드려요. 언제든지 꺼내보고 싶은 그 옷, 체리가 기억해 드릴게요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C3.png",
            navigateTo: '/imageList'
        },
        {
            title: "갤러리 둘러보기",
            description: ["다양한 스타일이 궁금하시거나 새로운 영감이 필요하세요?","그렇다면 체리의 드레스룸을 방문하세요. 각종 패션 아이템과 스타일을 한눈에 볼 수 있어요. 오늘의 스타일을 찾아보세요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C5.png",
            navigateTo: '/imageList'
        },
        {
            title: "랜덤 옷차림 추천",
            description: ["어떤 옷이 튀어나올지 아무도 몰라요.","뜬금 없는 옷이 나올 수 있지만 어쩌면 보물 같은 옷이 나올지도 모르는걸요. 즉석에서 추천 옷차림을 보여줘요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C7.png",
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
                    <div className="slide-content max-w-[600x] w-[95%]" >
                        <Card isFooterBlurred className="w-full h-[440px]">
                            <Image
                                removeWrapper
                                isZoomed
                                className="z-0 w-full h-[440px] object-cover"
                                src={slide.src}
                                objectFit="cover"
                                alt={slide.title}
                                onClick={() => handleNavigate(slide.navigateTo)}
                            />
                            <CardFooter className="absolute bg-white/80 bottom-0 z-10 border-default-600 ">
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