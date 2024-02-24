import React, {useEffect, useState} from "react";
import {IoOptionsOutline, IoSearchOutline} from "react-icons/io5";
import {Navbar, NavbarContent,} from "@nextui-org/react";
import BrandMenu from "./BrandMenu";
import AvatarMenu from "./AvatarMenu";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {AiOutlineLogin} from "react-icons/ai";
import {NavLink, useNavigate} from "react-router-dom";
import GoBellDropNotificationIcon from "./GoBellWithNotificationIcon";
import { useFetchUserInfo } from "../../recoil/hooks/UseFetchUserInfo";

export default function Header() {
    const isLogin = useRecoilValue(IsLoginAtom);
    const [registration, setRegistration] = useState(null);
    const navigate = useNavigate();

    const fetchUserInfo = useFetchUserInfo();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        // Service Worker 등록
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/serviceWorker.js")
                .then((reg) => {
                    console.log("Service Worker 등록 성공:", reg);
                    setRegistration(reg);
                })
                .catch((error) => {
                    console.log("Service Worker 등록 실패:", error);
                });
        } else {
            console.log("Service Worker를 지원하지 않습니다.");
        }
    }, []);

    const makeNotiTest = () => {
        // 함수 내용은 기존 WebNotificationTest 컴포넌트의 makeNotiTest 함수를 참고하여 이동시켜주세요.
        if (isLogin) {
            if (Notification.permission === "granted") {
                const options = {
                    body: "오늘의 날씨는",
                    icon: require("../../assets/images/sun.png"),
                    requireInteraction: true,
                };

                if (registration) {
                    registration.showNotification("cherryWeather", options);
                } else {
                    console.log("Service Worker가 아직 등록되지 않았습니다.");
                }
            } else if (Notification.permission === "denied") {
                console.log("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
                alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
            } else {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        makeNotiTest();
                    } else {
                        console.log("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
                        alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
                    }
                });
            }
        } else {
            alert("로그인이 필요합니다.");
        }
    };

    return (
        <Navbar shouldHideOnScroll style={styles.navBar}>
            <NavbarContent className="sm:flex gap-4" justify="start">
                <BrandMenu/>
            </NavbarContent>

            <NavbarContent
                as="div"
                className="items-center"
                justify="end"
                style={{ position: "relative" }}
            >
                <IoOptionsOutline style={styles.icon}/>
                <IoSearchOutline style={styles.icon}
                                 onClick={()=>navigate('/club-search')}
                />

                <GoBellDropNotificationIcon onClick={makeNotiTest} />
                {isLogin ? (
                    <AvatarMenu />
                ) : (
                    <NavLink to="/login">
                        <AiOutlineLogin style={styles.icon} />
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
        cursor:'pointer',
    },
    navBar: {
        backgroundColor: 'rgba(255,255,255,0.7)',
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
