<template>
    <div class="w-full flex flex-col items-center mt-4">
        <div class="flex flex-col max-w-5xl gap-16 w-full">
            <ClientOnly>
                <div class="relative w-full" :style="{ height: '30svh' }">
                    <Line class="max-w-full" :data="lineData" :options="lineChart.options.value" :plugins="[PluginsFactory.verticalIndicator]" />
                </div>
            </ClientOnly>
            <ClientOnly>
                <div class="relative w-full" :style="{ height: '30svh' }">
                    <Bubble class="max-w-full" :data="bubbleData" :options="bubbleChart.options.value" />
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Bubble, Line } from "vue-chartjs";

const lineChart = useChart<"line">({
    decorator: (options) => {
        options.plugins!.legend!.display = false;
    },
});
const bubbleChart = useChart<"bubble">({
    decorator: (options) => {
        options.interaction = { intersect: true, mode: "nearest" };
    },
});

const lineData = computed<ChartData<"line">>(() => ({
    labels: listGenerate(20, (i) => i.toString()),
    datasets: [
        {
            label: "Dataset",
            borderColor: cssColor("--ui-primary"),
            fill: true,
            backgroundColor: cssColor("--ui-primary", 0.4),
            data: listGenerate(20, (i) => Math.random() * 5),
        },
    ],
}));

const bubbleData = computed<ChartData<"bubble">>(() => ({
    labels: listGenerate(12, (i) => i.toString()),
    datasets: [
        {
            label: "Bubble dataset",
            borderColor: cssColor("--ui-primary"),
            backgroundColor: cssColor("--ui-primary", 0.4),
            data: listGenerate(12, (i) => ({ x: Math.random() * 10, y: Math.random() * 10, r: i * 5 })),
        },
        {
            label: "Bubble dataset 2",
            borderColor: cssColor("--color-amber-400"),
            backgroundColor: cssColor("--color-amber-400", 0.4),
            data: listGenerate(12, (i) => ({ x: Math.random() * 10, y: Math.random() * 10, r: i * 5 })),
        },
    ],
}));
</script>

<style></style>
