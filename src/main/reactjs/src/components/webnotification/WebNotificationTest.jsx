import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import GoBellDropNotificationIcon from "../../common/header/GoBellWithNotificationIcon";

const WebNotificationTest = () => {
  const [registration, setRegistration] = useState(null);
  const isLogin = useRecoilValue(IsLoginAtom);

  useEffect(() => {
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
    <div>
      <GoBellDropNotificationIcon onClick={makeNotiTest} />
    </div>
  );
};
export default WebNotificationTest;
