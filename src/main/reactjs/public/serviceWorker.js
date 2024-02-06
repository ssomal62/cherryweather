// serviceWorker.js

// // 'self' 변수 대신 'window' 객체 사용
// const options = {
//   body: "한국 결승 가자!!!",
//   icon: "https://developer.mozilla.org/static/img/favicon-32x32.png",
//   requireInteraction: true,
// };

// if (window.registration) {
//   window.registration.showNotification("test", options);
// } else {
//   console.log("Service Worker가 아직 등록되지 않았습니다.");
// }

// 'self' 변수 대신 'registration' 객체를 사용
this.addEventListener("push", function (event) {
  const options = {
    body: "한국 결승 가자!!!",
    icon: "https://developer.mozilla.org/static/img/favicon-32x32.png",
    requireInteraction: true,
  };

  if (this.registration) {
    this.registration.showNotification("test", options);
  } else {
    console.log("Service Worker가 아직 등록되지 않았습니다.");
  }
});
