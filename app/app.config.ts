export default defineAppConfig({
    ui: {
        card: {
            slots: {
                body: "flex flex-col gap-2",
            },
        },
        formField: {
            slots: {
                container: "flex flex-col gap-2",
                help: "m-0",
            },
        },
        toaster: {
            slots: {
                viewport: "z-10001",
            },
        },
    },
});
