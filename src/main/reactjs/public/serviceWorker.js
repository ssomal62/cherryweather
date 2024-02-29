// serviceWorker.js 파일 내용
// Service Worker의 생명주기 이벤트를 처리합니다.

// 설치 단계에서 설치 알림을 표시합니다.
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  self.skipWaiting(); // 현재 서비스 워커를 즉시 활성화 상태로 전환합니다.
  console.log("Service Worker가 설치되었습니다.");
});

// 서비스 워커 활성화 이벤트 처리
// eslint-disable-next-line no-restricted-globals

self.addEventListener("activate", (event) => {
  self.clients.claim(); // 서비스 워커가 페이지의 컨트롤을 인수합니다.
  console.log("Service Worker가 활성화되었습니다.");
});

// 푸시 이벤트를 수신하여 알림을 표시합니다.
// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", (event) => {
  const data = event.data.json(); // 푸시 메시지에서 데이터를 추출합니다.
  const options = {
    body: "오늘의 날씨는",
    icon: require("../../assets/images/sun.png"),
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
