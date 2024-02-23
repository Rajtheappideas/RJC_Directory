importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBPkYe5rzjupkGGyCycVUms3df_UdqugS4",
  authDomain: "rjc-app.firebaseapp.com",
  projectId: "rjc-app",
  storageBucket: "rjc-app.appspot.com",
  messagingSenderId: "413998419418",
  appId: "1:413998419418:web:04af33ddab2c7690b184e3",
  measurementId: "G-H0C0VF2R9E",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
