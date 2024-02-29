// FCM 연결 및 토큰 관리에 관련된 함수들을 정의합니다.
import messaging from '../../../public/firebase-messaging-sw'; // firebaseConfig 파일 경로에 맞게 조정
import { instance } from '../../recoil/module/instance';


async function handleLogin() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    // Service Worker를 확인하고 메시징 토큰을 가져옵니다.
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const token = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BCpuLItgtFCFiBh1e4fxgkhdNQglwvYqprWMlEg4AMmuyPDJGWWP-QqV3F3v6xUGD5HaRvDcmwmjjJFngxE-PTg'
      });
      sendTokenToServer(token);
    } else {
      console.log('서비스 워커를 지원하지 않는 브라우저입니다.');
    }
  } else {
    console.log('푸시 알림 거부됨');
  }
}

// 서버에 토큰 전송
async function sendTokenToServer(token) {
  // 여기에 서버의 API 엔드포인트 URL을 넣으세요.
  const serverUrl = "/web-push/tokens"; // 예시 경로

  try {
    const response = await instance.post(serverUrl, { token });

    if (!response.ok) {
      throw new Error('서버 응답 실패');
    }
    console.log('토큰을 서버로 전송 완료');
  } catch (error) {
    console.error('토큰을 서버로 전송 실패:', error);
  }
}