
export function snakeCasetoPascalCase(str: string) {
    return str
        .split("_")
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        })
        .join("");
}

export function pascalCaseToSnakeCase(str: string) {
    let res = str[0].toLowerCase()

    for (let i = 1; i < str.length; i++) {
        const char = str[i]
        if (char === char.toUpperCase()) {
            res += `_${char.toLowerCase()}`
        } else {
            res += char
        }
    }

    return res
}

export function capitalizeFirstLetter(str: string) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}