export function debounce(this: any, callback: (...args: any) => void, wait: number) {
    let timeoutId: number | null = null;
    return function debounceFn(this: any, ...args: any) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            timeoutId = null;
            callback.call(this, ...args);
        }, wait);
    };
}
