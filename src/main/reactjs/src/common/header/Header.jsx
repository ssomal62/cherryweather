import React, {useEffect, useState} from "react";
import {IoOptionsOutline, IoSearchOutline} from "react-icons/io5";
import {Navbar, NavbarContent,} from "@nextui-org/react";
import BrandMenu from "./BrandMenu";
import AvatarMenu from "./AvatarMenu";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {AiOutlineLogin} from "react-icons/ai";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import GoBellDropNotificationIcon from "../../components/webnotification/GoBellDropNotificationIcon";
import {useFetchUserInfo} from "../../recoil/hooks/UseFetchUserInfo";
import {searchClubListState} from "../../recoil/hooks/UseClubApi";
import {requestNotificationPermissionAndToken} from "../../components/webpush/requestNotificationPermissionAndToken";

export default function Header({opacity}) {
    const isLogin = useRecoilValue(IsLoginAtom);
    const [registration, setRegistration] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchUserInfo = useFetchUserInfo();
    const setSearchState = useSetRecoilState(searchClubListState);

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

    const handleSearchClick = () => {
        setSearchState([]);
        sessionStorage.removeItem('searchResult');
        sessionStorage.removeItem('searchTriggered');
        sessionStorage.removeItem('scrollPosition');
        navigate('/search', {state: {from: location.pathname}});
    }

  const makeNotiTest = () => {
    // 함수 내용은 기존 WebNotificationTest 컴포넌트의 makeNotiTest 함수를 참고하여 이동시켜주세요.
    if (isLogin) {
      requestNotificationPermissionAndToken().then(() => {
        // 사용자에게 알림 표시 (알림 권한이 이미 허용된 경우)
        const options = {
          body: "오늘의 날씨는 어떠세요?",
          icon: "/path/to/icon.png", // icon 경로를 정확히 지정해야 함
          requireInteraction: true,
        };

        const notificationTitle = "오늘의 날씨!"; // 알림 제목

        // 알림 권한이 부여되었는지 확인
        if (Notification.permission === "granted") {
          // 서비스 워커 준비 상태 확인
          navigator.serviceWorker.ready.then((registration) => {
            // 알림 표시
            registration.showNotification(notificationTitle, options);
          });
        } else {
          console.error(
            "알림을 표시할 수 없습니다. 권한이 부여되지 않았습니다."
          );
        }
      });
    }
  };

    return (
        <Navbar shouldHideOnScroll style={styles.navBar(opacity)}>
            <NavbarContent className="sm:flex gap-4" justify="start">
                <BrandMenu/>
            </NavbarContent>

            <NavbarContent
                as="div"
                className="items-center"
                justify="end"
                style={{position: "relative"}}
            >
                {/*<IoOptionsOutline style={styles.icon}/>*/}
                <IoSearchOutline style={styles.icon}
                                 onClick={handleSearchClick}
                />

                <GoBellDropNotificationIcon onClick={makeNotiTest}/>
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
        cursor     : 'pointer',
    },
    navBar:(opacity) =>  ({
        backgroundColor: opacity? 'rgba(0,0,0,0)': 'rgba(255,255,255,0.7)',
        backdropFilter : 'blur(0px)',
        maxWidth       : '600px',
        width          : '100%',
        position       : 'fixed',
        display        : 'flex',
        justifyContent : 'center',
        margin         : 'auto',
        transition     : 'background-color 0.3s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
        boxShadow      : opacity? 'none' : '0 20px 20px 0 rgba(0, 0, 0, 0.03)'
    }),
};
