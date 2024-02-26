import React, {useEffect, useRef, useState} from 'react';
import './Footer.css';
import {HiOutlineHome} from "react-icons/hi2";
import {IoAddCircleOutline} from "react-icons/io5";
import {HiOutlineChat} from "react-icons/hi";
import {FiUsers} from "react-icons/fi";
import styled from "styled-components";
import Sweater from "../../assets/icon/Sweater";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@nextui-org/react";


const bgColorsIcon = ["#3C3C3C", "#3C3C3C", "#3C3C3C", "#3C3C3C", "#3C3C3C"];

const Footer = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태 추가
    const [borderStyle, setBorderStyle] = useState({});
    const [isMounted, setIsMounted] = useState(false); // 마운트 상태 추적

    const menuItems = [
        { Icon: HiOutlineHome, path: '/', index: 0 },
        { Icon: Sweater, path: '/ai', index: 1 },
        { Icon: IoAddCircleOutline, path: '/club-add', index: 2 },
        { Icon: FiUsers, path: '/community', index: 3 },
        { Icon: HiOutlineChat, path: '/chat', index: 4 }
    ];


    const getCurrentIndex = () => menuItems.findIndex(item => item.path === location.pathname);
    const [activeIndex, setActiveIndex] = useState(getCurrentIndex());

    const calculateLeft = (index) => {
        const itemPercentage = 64.0;
        const centerOfItem = itemPercentage / 2;
        return (itemPercentage * index) + centerOfItem;
    };

    const setInitialSvgPosition = (index) => {
        const left = calculateLeft(index !== -1 ? index : 0);
        const displayStyle = index === -1 ? 'none' : 'block';
        setBorderStyle({
            transform: `translateX(${left}%)`,
            transition: 'none',
            display: displayStyle
        });
    };

    useEffect(() => {
        const currentIndex = getCurrentIndex();
        setActiveIndex(currentIndex);
        setIsAnimating(false); // 페이지 로드 완료 시 애니메이션 비활성화
        if (!isMounted) {
            // 첫 마운트 시에만 실행
            setInitialSvgPosition(currentIndex);
            // 마운트 완료 후에는 no-transition 클래스를 제거하기 위해 상태 업데이트
            setTimeout(() => setIsMounted(true), 350); // CSS transition 시간과 일치시킵니다.
        }else {
            // 페이지 전환 시에는 애니메이션을 비활성화하지 않습니다.
            updateBorderStyle(currentIndex);
        }

    }, [location.pathname]);


    const updateBorderStyle = (index) => {
        if (menuRef.current) {
            const displayStyle = index === -1 ? 'none' : 'block'; // activeIndex가 -1일 때 svg-container를 숨깁니다.
            setBorderStyle({
                transform: `translateX(${calculateLeft(index)}%)`,
                transition: isMounted ? 'transform 300ms ease' : 'none', // 마운트 이후에만 전환 효과 적용
                display: displayStyle // svg-container의 display 속성 동적 설정
            });
        }
    };


    const handleItemClick = (index, path) => {
        setActiveIndex(index);
        updateBorderStyle(index);
        setTimeout(() => {
            navigate(path);
        }, 350);
    };

    return (
        <BottomNav>
            <div className="menu" ref={menuRef}>
                {menuItems.map((item, index) => (
                    <Button key={index} color='success'
                            className={`menu__item ${index === activeIndex ? 'active' : ''} ${!isMounted || isAnimating ? 'no-transition no-transform-transition'  : ''}`}
                            onClick={() => handleItemClick(index, item.path)}
                            style={{ '--bgColorItem': bgColorsIcon[index] }}>
                        <item.Icon className="icon" style={{ stroke: index === activeIndex ? 'var(--bgColorMenu)' : '#c4c4c4' }}/>
                    </Button>
                ))}
                <div className="svg-container" style={borderStyle}>
                    <svg viewBox="0 0 200 45.5">
                        <defs>
                            <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
                                <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
                            </clipPath>
                        </defs>

                        <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z"   fill="white" clip-path="url(#menu)" filter="url(#shadow)"/>
                    </svg>
                </div>

            </div>
        </BottomNav>
    );
};


export default Footer;

const BottomNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 30;
`;
