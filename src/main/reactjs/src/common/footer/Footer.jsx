import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import './Footer.css';
import { HiOutlineHome, HiOutlineChat } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import Sweater from "../../assets/icon/Sweater";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import styled from "styled-components";
import LoginVerificationModal from "../../utils/LoginVerificationModal";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";

const bgColorsIcon = ["#3C3C3C", "#3C3C3C", "#3C3C3C", "#3C3C3C", "#3C3C3C"];

const Footer = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(false);
    const [borderStyle, setBorderStyle] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLogin = useRecoilValue(IsLoginAtom);
    const menuItems = [
        { Icon: HiOutlineHome, path: '/', index: 0 },
        { Icon: Sweater, path: '/ai', index: 1 },
        { Icon: IoAddCircleOutline, path: '/club-add', index: 2 },
        { Icon: FiUsers, path: '/community', index: 3 },
        { Icon: HiOutlineChat, path: '/chat', index: 4 }
    ];

    const getCurrentIndex = () => {
        if (location.pathname.startsWith('/community')) {
            return menuItems.findIndex(item => item.path === '/community');
        }
        return menuItems.findIndex(item => item.path === location.pathname);
    };

    const [activeIndex, setActiveIndex] = useState(getCurrentIndex());

    useLayoutEffect(() => {
        const currentIndex = getCurrentIndex();
        setInitialSvgPosition(currentIndex);
        setIsAnimating(false); // 초기 애니메이션 중지
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentIndex = getCurrentIndex();
        setActiveIndex(currentIndex);
        if (!isMounted) {
            setInitialSvgPosition(currentIndex);
            setTimeout(() => setIsMounted(true), 350);
        } else {
            updateBorderStyle(currentIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const calculateLeft = (index) => (64.0 * index) + 32.0;

    const setInitialSvgPosition = (index) => {
        setBorderStyle({
            transform: `translateX(${calculateLeft(index)}%)`,
            transition: 'none',
            display: index === -1 ? 'none' : 'block'
        });
    };

    const updateBorderStyle = (index) => {
        setBorderStyle({
            transform: `translateX(${calculateLeft(index)}%)`,
            transition: isMounted ? 'transform 300ms ease' : 'none',
            display: index === -1 ? 'none' : 'block'
        });
    };

    const handleItemClick = (index, path) => {
        if ((index === 2 || index === 4) && !isLogin) {
            handelCheckLogin();
        } else {

            setActiveIndex(index);
            updateBorderStyle(index);
            setTimeout(() => navigate(path), 350);
            sessionStorage.removeItem('searchResult');
            sessionStorage.removeItem('searchTriggered');
            sessionStorage.removeItem('scrollPosition');
        }
    };

    const handelCheckLogin = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
    }

    return (
        <BottomNav>
            <div className="menu" ref={menuRef}>
                {menuItems.map((item, index) => (
                    <Button key={index} color='success'
                            className={`menu__item ${index === activeIndex ? 'active' : ''} ${!isMounted || isAnimating ? 'no-transition no-transform-transition' : ''}`}
                            onClick={() => handleItemClick(index, item.path)}
                            style={{ '--bgColorItem': bgColorsIcon[index] }}>
                        <item.Icon className="icon" style={{ stroke: index === activeIndex ? 'var(--bgColorMenu)' : '#c4c4c4' }}/>
                    </Button>
                ))}
                <div className={`svg-container ${!isMounted || isAnimating ? 'no-transition no-transform-transition' : ''}`} style={borderStyle}>
                    <svg viewBox="0 0 200 45.5">
                        <defs>
                            <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
                                <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
                            </clipPath>
                        </defs>

                        <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z"  fill="white"
                              clipPath="url(#menu)" filter="url(#shadow)"/>
                    </svg>
                </div>
            </div>
            <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
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
`
