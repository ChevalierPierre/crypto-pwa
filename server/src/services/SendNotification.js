import webpush from 'web-push';

export function SendNotification(params) {
    console.log('send notification')
    const payload = JSON.stringify({
      title: params.title,
      body: params.body,
      icon: "assets/main-page-logo-small-hat.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        url: params.url || "https://nostalgic-northcutt-170a0d.netlify.app/home", //+ params.
        primaryKey: 1,
      
      },
      actions: [
        {
          action: "open_url",
          title: "Go to the site",
        },
      ],
    });
  
    webpush
      .sendNotification(params.subscription, payload)
      .then((result) => console.log("send notifiaction result:", result))
      .catch((e) => console.log("send notification error: ", e.stack));
}