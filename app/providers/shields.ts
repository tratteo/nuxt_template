import { defineProvider } from "@nuxt/image/runtime";
export default defineProvider<{ baseURL?: string }>({
    getImage(src, { modifiers }) {
        const url = new URL("https://img.shields.io");
        const customModifiers = modifiers as any;
        url.pathname = src.trim();
        url.search = new URLSearchParams({
            ...customModifiers,
        }).toString();
        return {
            url: url.toString(),
        };
    },
});
