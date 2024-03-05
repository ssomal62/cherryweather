import React, {useEffect, useState} from "react";
import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {GoHome} from "react-icons/go";
import {FiSettings} from "react-icons/fi";
import {useLocation, useNavigate} from "react-router-dom";
import LoginVerificationModal from "../../../utils/LoginVerificationModal";
import {BsChatRightDots} from "react-icons/bs";
import {TbJacket, TbPhoto} from "react-icons/tb";

export default function SaveImageHeader({ isLogin, handleBack}) {

    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleChatClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        navigate('/gpt')
    }

    const handleJacketClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        navigate('/image')
    }

    const handleGalleryClick = () => {
        if (!isLogin) {
            setIsModalOpen(true);
            return;
        }
        navigate('/gallery')
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const styles = {
        navBar : {
            maxWidth            : '600px',
            width               : '100%',
            backgroundColor     : scrolled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0)',
            backdropFilter      : scrolled ? 'blur(10px)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
            position            : 'fixed',
            display             : 'flex',
            justifyContent      : 'center',
            margin              : 'auto',
            transition          : 'background-color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
            boxShadow           : scrolled ? '0 20px 20px 0 rgba(0, 0, 0, 0.03)' : '0 0px 0px 0 rgba(0, 0, 0, 0)'
        },
        iconBox: {
            borderRadius   : 50,
            backgroundColor: scrolled ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.3)',
            transition     : 'background-color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
            width          : 30,
            height         : 30,
            alignItems     : 'center',
            display        : 'flex',
            justifyContent : 'center',
            cursor         : 'pointer',
        },
        icon   : {
            width     : 20,
            height    : 21,
            color     : scrolled ? 'black' : 'white',
            transition: 'color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
        },
        text   : {
            fontWeight: 600,
            fontSize  : 20,
            display   : scrolled ? 'block' : 'none',

        }
    };

    return (
        <>
            <Navbar style={styles.navBar}>
                <NavbarContent justify="start">
                    <NavbarItem
                        style={styles.iconBox}
                        onClick={() => handleBack()}
                    >
                        <IoArrowBack style={styles.icon}/>
                    </NavbarItem>
                    <NavbarItem style={styles.text}
                                onClick={() => navigate('/')}>
                        <p>내 옷장</p>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="items-center" justify="end">

                    <NavbarItem
                        style={styles.iconBox}
                        onClick={handleChatClick}
                    >
                        <BsChatRightDots style={styles.icon}/>
                    </NavbarItem>
                    <NavbarItem
                        style={styles.iconBox}
                        onClick={handleJacketClick}
                    >
                        <TbJacket  style={styles.icon}/>
                    </NavbarItem>
                    <NavbarItem
                        style={styles.iconBox}
                        onClick={handleGalleryClick}
                    >
                        <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                        <TbPhoto   style={styles.icon}/>
                    </NavbarItem>
                    <NavbarItem
                        style={styles.iconBox}
                        onClick={() => navigate('/')}>
                        <GoHome style={styles.icon}/>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

        </>
    );
}


