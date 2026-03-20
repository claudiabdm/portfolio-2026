/**
 * Removes trailing slash from pathname if any.
 * @param {string} pathname
 * @returns {string}
 */
export function removeSlash(pathname: string) {
    if (pathname === '/') return pathname

    if (pathname[pathname.length - 1] === '/') return pathname.slice(0, -1)

    return pathname
}