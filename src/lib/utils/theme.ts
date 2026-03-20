export function getColorScheme() {
    const savedColorScheme = (() => {
        const theme = localStorage.getItem("preferredColorScheme");

        if (theme == null) {
            return "light";
        }

        if (["dark", "light"].includes(theme)) {
            return theme;
        }

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        return "light";
    })();

    return savedColorScheme
}


export function watchDarkColorScheme(cb: (matches: MediaQueryListEvent['matches']) => void) {
    const colorScheme = getColorScheme();
    cb(colorScheme === 'dark');

    const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.attributeName === "class") {
                cb(document.documentElement.classList.contains('dark-scheme'))
            }
        }
    });
    observer.observe(document.documentElement, { attributes: true, childList: false })

}