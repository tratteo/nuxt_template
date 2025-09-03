import * as culori from "culori";

export function cssColor(cssVar: string, alpha?: number, format?: "hsl" | "oklch" | "rgba" | "hex"): string | undefined {
    const property = window.getComputedStyle(document.body).getPropertyValue(cssVar);
    const color = culori.parse(property);
    if (color) {
        color.alpha = alpha;
    }
    format ??= "hex";
    switch (format) {
        case "hsl":
            return culori.formatHsl(color);
        case "oklch":
            const toOklch = culori.converter("oklch");
            return culori.formatCss(toOklch(color));
        case "rgba":
            return culori.formatRgb(color);
        case "hex":
            return culori.formatHex8(color);
    }
}
export function hexToRgba(hex: string, alpha: number = 1) {
    const color = culori.parseHex(hex);
    if (!color) return undefined;
    color.alpha = alpha;
    return culori.formatRgb(color);
}
export function oklchToHex(oklch: string | undefined): string | undefined {
    if (!oklch) return undefined;
    const color = culori.parse(oklch);
    return culori.formatHex(color);
}
