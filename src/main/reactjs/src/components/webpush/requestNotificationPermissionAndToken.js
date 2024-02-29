import {getFirebaseMessaging} from "../webpush/firebase";

// 사용자의 알림 권한 요청 및 FCM 토큰 획득
export async function requestNotificationPermissionAndToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // 토큰 획득
      await retrieveFCMToken();
    } else {
      console.log("Unable to get permission to notify.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
}

async function retrieveFCMToken() {
  try {
    const messaging = getFirebaseMessaging();
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
