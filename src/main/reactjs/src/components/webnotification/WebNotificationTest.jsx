// import React, {useState} from "react";
// import WebNotificationAlternativePermission from "./WebNotificationAlternativePermission";

import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";

// const WebNotificationTest = () => {
//   const [notificationPermission, setNotificationPermission] = useState("");

//   const handlePermissionChange = (permission) => {
//     setNotificationPermission(permission);
//   };

//   const makeNotiTest = () => {
//     if (
//       notificationPermission === "denied" ||
//       notificationPermission === "default"
//     ) {
//       alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
//     } else {
//       let notification = new Notification("test", {
//         body: "웹 알림 Test입니다",
//         icon: "https://developer.mozilla.org/static/img/favicon-32x32.png",
//         requireInteraction: true,
//       });

//       // 알림 이벤트
//       notification.addEventListener("click", () => {
//         window.open("https://www.naver.com/");
//       });
//     }
//   };

//   return (
//     <div>
//       <WebNotificationAlternativePermission
//         onPermissionChange={handlePermissionChange}
//       />

//       <button onClick={makeNotiTest}>알림 테스트</button>
//     </div>
//   );
// };

const WebNotificationTest = ({goBell}) => {
  const [registration, setRegistration] = useState(null);
  const isLogin = useRecoilValue(IsLoginAtom); // 로그인 상태를 가져온다

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((reg) => {
          console.log("Service Worker 등록 성공:", reg);
          setRegistration(reg); // registration 객체 저장
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
      // 로그인 상태에서만 알림을 보냄
      if (Notification.permission === "granted") {
        const options = {
          body: "오늘의 날씨는",
          icon: require("../../assets/images/sun.png"),
          requireInteraction: true,
        };

        if (registration) {
          // registration 객체 확인
          registration.showNotification("cherryWeather", options);
        } else {
          console.log("Service Worker가 아직 등록되지 않았습니다.");
        }
      } else if (Notification.permission === "denied") {
        console.log("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
        alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
      } else {
        // 사용자가 아직 알림 권한을 설정하지 않은 경우
        // 알림 권한 요청
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            makeNotiTest(); // 알림 권한이 허용된 경우 다시 알림 보내기 시도
          } else {
            console.log("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
            alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
          }
        });
      }
    } else {
      // 로그인 상태가 아닌경우
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div>
      <button onClick={makeNotiTest}>{goBell}</button>
    </div>
  );
};

export default WebNotificationTest;
