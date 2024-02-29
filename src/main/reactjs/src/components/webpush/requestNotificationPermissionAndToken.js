import messaging from '../../../public/firebase-messaging-sw'; // firebaseConfig 파일 경로에 맞게 조정
import { sendTokenToServer } from './sendTokenToServer'; // sendTokenToServer 함수 임포트
import firebase from 'firebase/app';
import 'firebase/messaging';


// 사용자의 알림 권한 요청 및 FCM 토큰 획득
export function requestNotificationPermissionAndToken() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // 토큰 획득
      retrieveFCMToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}


// FCM 토큰 획득 및 서버로 전송
function retrieveFCMToken() {
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      // 서버로 토큰 전송
      sendTokenToServer(currentToken);
    } else {
      console.log('No Instance ID token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}