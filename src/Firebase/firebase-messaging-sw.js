import { getToken } from "firebase/messaging";
import { app, messaging } from "./firebaseConfig";
import { toast } from "react-hot-toast";

function subscribeForNotification(setToken, setLoading) {
  if (window.Notification.permission === "denied") {
    toast.remove();

    return;
  }

  if (window.Notification.permission === "granted") {
    toast.loading("Loading...");
    setLoading(true);
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_CLOUD_MESSAGING_KEY,
    })
      .then((currentToken) => {
        toast.remove();
        setToken(currentToken);
        setLoading(false);
      })
      .catch((err) => {
        toast.remove();
        console.error(err);
        setLoading(false);
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  window.Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      toast.remove();
      toast.loading("Loading...");
      setLoading(true);

      getToken(messaging, {
        vapidKey: process.env.REACT_APP_CLOUD_MESSAGING_KEY,
      })
        .then((currentToken) => {
          toast.remove();
          setToken(currentToken);
          setLoading(false);
        })
        .catch((err) => {
          toast.remove();
          console.error(err);
          setLoading(false);
          setToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      // toast("please allowed notifications.");
    }
  });
}
export function GetToken(setToken, setLoading) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js", { scope: "/" })
    .then(
      function (reg) {
        var serviceWorker;
        if (reg.installing) {
          serviceWorker = reg.installing;
          // console.log('Service worker installing');
        } else if (reg.waiting) {
          serviceWorker = reg.waiting;
          // console.log('Service worker installed & waiting');
        } else if (reg.active) {
          serviceWorker = reg.active;
          // console.log('Service worker active');
        }

        if (serviceWorker) {
          // console.log("sw current state", serviceWorker.state);
          if (serviceWorker.state == "activated") {
            //If push subscription wasnt done yet have to do here
            // console.log("sw already activated - Do watever needed here");
          }
          serviceWorker.addEventListener("statechange", function (e) {
            // console.log("sw statechange : ", e.target.state);
            if (e.target.state == "activated") {
              // use pushManger for subscribing here.
              // console.log(
              //   "Just now activated. now we can subscribe for push notification"
              // );
              subscribeForNotification(setToken, setLoading)
            }
          });
        }
      },
      function (err) {
        console.error(
          "unsuccessful registration with ",
          "firebase-messaging-sw.js",
          err
        );
      }
    )
}

// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
