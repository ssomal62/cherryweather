import React, {useEffect, useRef, useState} from 'react';
import {Card, Button, CardFooter, Image, CardHeader} from '@nextui-org/react';
import {BiCloset} from "react-icons/bi";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoArrowForwardOutline} from "react-icons/io5";
import './css/mainItem.css';
import {useNavigate} from "react-router-dom"; // Make sure to create this CSS file in your project

import {Swiper, SwiperSlide} from 'swiper/react';
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
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const MainItem = ({index, isLogin, setActiveSlide}) => {
    const navigate = useNavigate();

    /*이미지 확대 효과 */
    // 확대 효과를 위한 상태
    const [zoomClass, setZoomClass] = useState('');

    useEffect(() => {
        // index 변경을 감지하여 확대 효과를 초기화하고 다시 적용
        // 먼저 확대 효과를 제거
        setZoomClass('noZoom');

        // 바로 다음에 확대 효과를 다시 적용
        // setTimeout을 사용하여 미세한 지연 후 확대 효과를 적용
        setTimeout(() => {
            setZoomClass('zoomEffect');
        }, 800); // 10ms 지연을 준 후 확대 효과 적용
    }, [index]); // index 변경을 감지
    /*확대효과 끝*/

    /*슬라이드  관련*/
    const onSlideChange = (swiper) => {
        setActiveSlide(swiper.realIndex); // 현재 활성화된 슬라이드 인덱스로 상태 업데이트

    };

    SwiperCore.use([Pagination, Navigation]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const slidesData = [
        {
            title: "옷차림 추천",
            subtitle: ["전문(?) 스타일리스트와 대화로 오늘의 옷차림을 골라보세요"],
            description: ["매일 아침, 무엇을 입을지 고민되시나요?", "체리가 여러분의 스타일을 분석해 개인 맞춤형 패션을 제안해 드려요. 오늘의 코디를 체리와 함께 결정해보세요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C8.png",
            navigateTo: '/gpt'
        },
        {
            title: "찜 추천 불러오기",
            subtitle: ["내가 선택한 옷을 보관하는 나만의 비밀 옷장이에요!"],
            description: ["꼼꼼히 고른 옷차림, 어디에 저장해두셨나요?", "체리의 비밀 옷장에서는 여러분의 모든 스타일을 안전하게 보관해드려요. 언제든지 꺼내보고 싶은 그 옷, 체리가 기억해 드릴게요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C3.png",
            navigateTo: '/imageList'
        },
        {
            title: "갤러리 둘러보기",
            subtitle: ["체리가 자신있게 추천하는 Made in Cherry의 여러 스타일!"],
            description: ["다양한 스타일이 궁금하시거나 새로운 영감이 필요하세요?", "그렇다면 체리의 드레스룸을 방문하세요. 각종 패션 아이템과 스타일을 한눈에 볼 수 있어요. 오늘의 스타일을 찾아보세요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C5.png",
            navigateTo: '/imageList'
        },
        {
            title: "랜덤 옷차림 추천",
            subtitle: ["랜덤 생성 옷차림이에요. 어떤옷이 나올지 아무도 몰라요!"],
            description: ["어떤 옷이 튀어나올지 아무도 몰라요.", "뜬금 없는 옷이 나올 수 있지만 어쩌면 보물 같은 옷이 나올지도 모르는걸요. 즉석에서 추천 옷차림을 보여줘요!"],
            src: "https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/%EC%B6%94%EC%B2%9C7.png",
            navigateTo: '/image'
        }
    ];

    const imageRef = useRef(null); // 이미지 참조 생성
    /*슬라이드 끝*/

    const handleNavigate = (navigateTo) => {
        if (!isLogin) {
            // 로그인이 되어있지 않다면 모달을 열어 로그인하라는 메시지를 표시
            setIsModalOpen(true);
        } else {
            // 로그인이 되어있다면 페이지 이동
            navigate(navigateTo);
        }
    };

    // const userInfo = useRecoilValue(userInfoState);

    /*페이징 */
    // 슬라이드로 이동하는 함수
    // Swiper 인스턴스에 접근하기 위한 ref
    const swiperRef = useRef(null);
    const goToSlide = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };


    return (
        <>
            <Swiper
                onSlideChange={onSlideChange} // onSlideChange 이벤트 핸들러 추가
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={200}
                slidesPerView={1}
                speed={800}
                navigation={{nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',}}
                // pagination={{
                //     // clickable: true,
                //     // el: 'swiper-pagination-bullet',
                //     // el: '.custom-pagination',
                //     // renderBullet: (index, className) => {
                //     //     return '<span class="' + className + '"></span>';
                //     // }
                // }}
                autoplay={{delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false,}}
                loop={true}
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <MainTop index={index}/>
                        <div className="slide-content max-w-[600x] w-[95%] h-[480px]">
                            <Card isFooterBlurred isHeaderBlurred className="w-full h-[470px] ">
                                <CardHeader className="bg-black/60 z-10 border-default-600">
                                    {slide.subtitle.map((line, lineIndex) => (
                                        <React.Fragment key={lineIndex}>
                                            <span
                                                className="card-description text-tiny font-bold text-white">{line}</span>
                                            {lineIndex < slide.subtitle.length - 1 && <br/>}
                                        </React.Fragment>
                                    ))}
                                </CardHeader>
                                <Image
                                    ref={imageRef} // 이미지 참조 할당
                                    removeWrapper
                                    // isZoomed
                                    // className="z-0 w-full h-[440px] object-cover"
                                    className={`z-0 w-full h-[440px] object-cover ${zoomClass}`}
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
                                                <span
                                                    className="card-description text-tiny font-medium text-black">{line}</span>
                                                    {lineIndex < slide.description.length - 1}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                    <Button radius="full" size="sm"
                                            onClick={() => handleNavigate(slide.navigateTo)}>이동하기</Button>

                                </CardFooter>
                            </Card>
                            <button className="swiper-button-next">
                                {/*<IoIosArrowForward />*/}
                            </button>
                            <button className="swiper-button-prev">
                                {/*<IoIosArrowBack />*/}
                            </button>
                        </div>
                        <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="custom-pagination"  >
                {slidesData.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot ${idx === index ? 'active' : ''}`}
                        onClick={() => goToSlide(idx)}
                    ></span>
                ))}
            </div>
        </>
    );
};

export default MainItem;