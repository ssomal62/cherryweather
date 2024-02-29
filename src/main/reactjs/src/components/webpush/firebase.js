import {getApps, initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyDfpbmaj7Qaql39NuytA9sHHIlWULG_UF4",
  authDomain: "web-push-notification-aec2a.firebaseapp.com",
  projectId: "web-push-notification-aec2a",
  storageBucket: "web-push-notification-aec2a.appspot.com",
  messagingSenderId: "1066654888426",
  appId: "1:1066654888426:web:b849b47aab538465db8293",
  measurementId: "G-HTF2DHLTEV",
};

// Firebase 앱을 초기화하는 함수
export function initalizeFirebaseApp() {
  // 앱이 이미 초기화된 경우를 방지
  if (!getApps.apps.length) {
    initializeApp.initializeApp(firebaseConfig);
  }
}

// Firebase 메시징 인스턴스 가져오기
export function getFirebaseMessaging() {
  initalizeFirebaseApp();
  const messaging = getMessaging();

  // Vapid key 설정
  messaging.usePublicVapidKey(
    "BCpuLItgtFCFiBh1e4fxgkhdNQglwvYqprWMlEg4AMmuyPDJGWWP-QqV3F3v6xUGD5HaRvDcmwmjjJFngxE-PTg"
  );

  return messaging;
}
