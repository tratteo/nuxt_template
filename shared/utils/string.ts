export function tryParseInt(s: string | undefined | null): number | undefined {
    if (isNullOrEmpty(s)) return undefined;
    try {
        const v = Number.parseInt(s!);
        return v;
    } catch (ex) {
        return undefined;
    }
}

export function tryParse(s: string | undefined | null): number | undefined {
    if (isNullOrEmpty(s)) return undefined;
    try {
        const v = Number.parseFloat(s!);
        if (isNaN(v)) return undefined;
        return v;
    } catch (ex) {
        return undefined;
    }
}
export function isNullOrEmpty(s: string | undefined | null): boolean {
    return s === undefined || s === null || s.length <= 0;
}
export function readablePrice(unitAmount: number | undefined | null): string | undefined {
    if (!unitAmount) return undefined;
    return (unitAmount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function wordCapitalize(s: string | undefined | null): string | undefined | null {
    if (isNullOrEmpty(s)) return s;
    let splits = s?.split(" ");
    return splits?.map((s) => capitalize(s)).join(" ");
}
export function firstWord(s: string | undefined | null, cap: boolean = false): string | undefined | null {
    if (isNullOrEmpty(s)) return s;
    let splits = s?.split(" ");
    if (!splits) return "";
    const word = splits.at(0);
    return cap ? capitalize(word) : word;
}
export function capitalize<T extends string | undefined | null>(s: T): T {
    if (s === undefined || s === null) return s;
    if (s.length <= 0) return s;
    return (s!.charAt(0).toUpperCase() + s!.slice(1).toLowerCase()) as T;
}
export function toShortString(v: number | undefined): string | undefined {
    if (v === undefined) return undefined;
    let sign = Math.sign(v);
    const splits = Math.abs(v).toString().split(".");
    let str = splits[0]!;
    if (str.length > 6) {
        str = `${str.slice(0, str.length - 6)}.${str.slice(-6, -4)}M`;
    } else if (str.length > 3) {
        str = `${str.slice(0, str.length - 3)}.${str.slice(-3, -1)}K`;
    } else if (splits.length > 1) {
        str += `.${splits[1]!.substring(0, 2)}`;
    }
    if (sign < 0) {
        return `-${str}`;
    }
    return str;
}

export function toUriSafeString(input: string | undefined | null): string | undefined {
    if (isNullOrEmpty(input)) return undefined;
    return (
        input!
            .toLocaleLowerCase()
            // Replace spaces with dashes
            .replace(/\s+/g, "-")
            // Encode to URI and then remove any percent-encoded characters
            .split("")
            .filter((encodedChar) =>
                // Keep only characters that are alphanumeric, dash, period, or underscore
                /^[a-zA-Z0-9\-._~]$/.test(encodedChar)
            )
            .map((char) => encodeURIComponent(char))
            .join("")
    );
}

export function countryCodeToFlagEmoji(countryCode: string | undefined | null): string {
    if (isNullOrEmpty(countryCode)) return "";
    const codePoints = countryCode!
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
