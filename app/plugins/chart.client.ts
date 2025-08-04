import { Chart, registerables } from "chart.js";
//import annotationPlugin from "chartjs-plugin-annotation";

export default defineNuxtPlugin({
    setup(nuxtApp) {
        Chart.register(...registerables);
        console.log("chartjs initialized");
    },
    enforce: "pre",
});
