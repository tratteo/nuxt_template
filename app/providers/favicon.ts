import { createOperationsGenerator, defineProvider } from "@nuxt/image/runtime";

const operationsGenerator = createOperationsGenerator();

export default defineProvider<{ baseURL?: string }>({
    getImage(src, { modifiers }) {
        const size = modifiers.quality?.toString() ?? "64";
        const operations = operationsGenerator({ sz: size });
        const url = new URL("https://www.google.com/s2/favicons");
        url.search = new URLSearchParams({
            domain: src.trim().replace(/^[\/\\]/, ""),
        }).toString();
        return {
            url: `${url.toString()}&${operations}`,
        };
    },
});
