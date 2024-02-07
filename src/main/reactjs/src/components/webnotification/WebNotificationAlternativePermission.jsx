import {useEffect, useState} from "react";

const WebNotificationAlternativePermission = ({onPermissionChange}) => {
  const [notificationPermission, setNotificationPermission] =
    useState("default");

  useEffect(() => {
    const askNotificationPermission = () => {
      if (!("Notification" in window)) {
        console.log("이 브라우저는 알림을 지원하지 않습니다.");
        return;
      }

      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
          onPermissionChange(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          setNotificationPermission(permission);
          onPermissionChange(permission);
        });
      }
    };

    askNotificationPermission();
  }, [onPermissionChange]);

  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
      return true;
    } catch (e) {
      return false;
    }
  };

  // notificationPermission 변수를 사용하여 컴포넌트 동작을 변경
  useEffect(() => {
    if (notificationPermission === "granted") {
      // 알림 권한이 허용된 경우에 실행할 동작
    } else if (notificationPermission === "denied") {
      // 알림 권한이 거부된 경우에 실행할 동작
    }
  }, [notificationPermission]);

  return null;
};

export default WebNotificationAlternativePermission;
