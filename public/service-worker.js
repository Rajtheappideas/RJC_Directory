self.addEventListener("push", (event) => {
  const data = event.data// Assuming the payload is in JSON format

  console.log(event,data);
  const options = {
    body: data.body,
    //     icon: "/path/to/your/icon.png",
    data: {
      url: data.link, // Customize the link to open when the notification is clicked
    },
  };
  console.log("notification", data);

  event.waitUntil(self.registration.showNotification(data.title, options));
});
// for navigate to the url clicked by user on link
self.addEventListener("notificationclick", (event) => {
  const notificationData = event.notification.data;

  if (notificationData.url) {
    clients.openWindow(notificationData.url);
  }

  event.notification.close();
});
