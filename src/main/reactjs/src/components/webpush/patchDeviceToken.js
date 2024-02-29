// FCM 연결 및 토큰 관리에 관련된 함수들을 정의합니다.
import messaging from "../../../public/firebase-messaging-sw"; // firebaseConfig 파일 경로에 맞게 조정
import {instance} from "../../recoil/module/instance";

async function requestNotificationPermissionAndToken() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    // 토큰 획득 및 서버로 전송
    retrieveFCMToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
}

async function retrieveFCMToken() {
  try {
    const currentToken = await messaging.getToken();
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // 서버로 토큰 전송 (여기서는 서버리스 방식으로 토큰을 관리하므로 서버로 보내지 않음)
    } else {
      console.log(
        "No Instance ID token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
}
