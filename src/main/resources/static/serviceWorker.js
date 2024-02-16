// serviceWorker.js 파일 내용
// Service Worker의 생명주기 이벤트를 처리합니다.

// 설치 단계에서 알림 권한을 요청하고, 설치 알림을 표시합니다.
window.self.addEventListener("install", (event) => {
  window.self.skipWaiting(); // 현재 서비스 워커를 즉시 활성화 상태로 전환합니다.
  console.log("Service Worker가 설치되었습니다.");
});

// 서비스 워커 활성화 이벤트 처리
window.self.addEventListener("activate", (event) => {
  window.self.clients.claim(); // 서비스 워커가 페이지의 컨트롤을 인수합니다.
  console.log("Service Worker가 활성화되었습니다.");
});

// 푸시 이벤트를 수신하여 알림을 표시합니다.
window.self.addEventListener("push", (event) => {
  const options = {
    body: "한국 결승 가자!!!",
    icon: "https://developer.mozilla.org/static/img/favicon-32x32.png",
    requireInteraction: true,
  };

  event.waitUntil(window.self.registration.showNotification("push", options));
});
