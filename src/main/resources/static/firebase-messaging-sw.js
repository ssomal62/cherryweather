// Firebase 프로젝트 설정 정보
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDfpbmaj7Qaql39NuytA9sHHIlWULG_UF4",
  authDomain: "web-push-notification-aec2a.firebaseapp.com",
  projectId: "web-push-notification-aec2a",
  storageBucket: "web-push-notification-aec2a.appspot.com",
  messagingSenderId: "1066654888426",
  appId: "1:1066654888426:web:b849b47aab538465db8293",
  measurementId: "G-HTF2DHLTEV",
};

firebase.initializeApp(firebaseConfig);

// Firebase 메시징 인스턴스 가져오기
const messaging = firebase.messaging();

// Vapid key 설정
messaging.usePublicVapidKey(
  "BCpuLItgtFCFiBh1e4fxgkhdNQglwvYqprWMlEg4AMmuyPDJGWWP-QqV3F3v6xUGD5HaRvDcmwmjjJFngxE-PTg"
);
