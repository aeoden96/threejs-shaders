import axios from 'axios';

export async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL;
    const reg = await navigator.serviceWorker.register (`${url}/sw.js`, { scope: '/' });
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}

export async function subscribe (serviceWorkerReg) {
    console.log('subscribe');
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe ({
        userVisibleOnly: true,
        applicationServerKey: 'BKemtwM7irZVq7QiMjpIvx_.....',
      });
      axios.post ('/subscribe', subscription);
      console.log(subscription);
  }
}
