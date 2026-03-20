
export function throttle(this: any, callback: (...args: any) => void, wait = 0) {
    let intervalId: number | null = null;

    return function throttleFn(this: any, ...args: any) {
        if (intervalId === null) {
            callback.call(this, ...args);
            intervalId = window.setInterval(() => {
                if (intervalId) clearInterval(intervalId);
                intervalId = null;
            }, wait);
        }
    };
}