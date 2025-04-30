// https://github.com/mdn/dom-examples/blob/main/screen-wake-lock-api/script.js


if ('wakeLock' in navigator) {
    console.log('wakeLock' in navigator);

    let wakeLock = null;

    // create an async function to request a wake lock
    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log(wakeLock);
        } catch (err) {
            console.error(err);
        }
    }
    requestWakeLock();

    document.addEventListener('visibilitychange', _ => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
            requestWakeLock();
        }
    });
}
