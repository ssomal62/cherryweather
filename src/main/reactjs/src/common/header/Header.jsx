import React, {useEffect, useState} from "react";
import {IoOptionsOutline, IoSearchOutline} from "react-icons/io5";
import {Navbar, NavbarContent,} from "@nextui-org/react";
import BrandMenu from "./BrandMenu";
import AvatarMenu from "./AvatarMenu";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {AiOutlineLogin} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import WebNotificationTest from "../../components/webnotification/WebNotificationTest";
import {GoBellWithNotificationIcon} from "./GoBellWithNotificationIcon";
import {useFetchUserInfo} from "../../recoil/hooks/UseFetchUserInfo";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const isLogin = useRecoilValue(IsLoginAtom);

    const fetchUserInfo = useFetchUserInfo();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsOpen(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Navbar shouldHideOnScroll style={styles.navBar}>
            <NavbarContent className="sm:flex gap-4" justify="start">
                <BrandMenu/>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <IoOptionsOutline style={styles.icon}/>
                <IoSearchOutline style={styles.icon}/>

                <WebNotificationTest
                    goBell={
                        <GoBellWithNotificationIcon style={styles.icon} setIsOpen={setIsOpen} isOpen={isOpen}/>
                    }
                />
                {isLogin ? (
                    <AvatarMenu/>
                ) : (
                    <NavLink to="/login">
                        <AiOutlineLogin style={styles.icon}/>
                    </NavLink>
                )}
            </NavbarContent>
        </Navbar>
    );
}

const styles = {
    block : {
        backgroundColor: "white",
        marginRight    : 10,
        marginTop      : 15,
        marginBottom   : 15,
    },
    nav   : {
        display       : "flex",
        justifyContent: "flex-end",
        alignItems    : "center",
    },
    icon  : {
        width      : 22,
        height     : 22,
        color      : "black",
        marginRight: 3,
    },
    navBar: {
        backgroundColor: 'rgba(255,255,255,0)',
        backdropFilter : 'blur(0px)',
        maxWidth       : '600px',
        width          : '100%',
        position       : 'fixed',
        display        : 'flex',
        justifyContent : 'center',
        margin         : 'auto',
        transition     : 'background-color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
        boxShadow      : '0 20px 20px 0 rgba(0, 0, 0, 0.03)'
    },
};
