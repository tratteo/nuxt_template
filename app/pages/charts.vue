<template>
    <div class="w-full flex flex-col items-center gap-4 mt-4">
        <div class="flex justify-between gap-4 w-full items-center flex-wrap">
            <u-form-field>
                <template #label> Render beautiful charts in Nuxt with <u-link to="https://echarts.apache.org/en/index.html" target="_blank">Apache Echarts</u-link>. </template>
            </u-form-field>
            <u-alert
                title="Charting library has been switched from Chartjs to Echarts"
                description="Why? I just like it more, configuration is simpler, many more functionalities, a lot of community examples!"
                color="info"
                variant="subtle"
                icon="material-symbols:info-rounded"
                :actions="[{ label: 'Check out examples', to: 'https://echarts.apache.org/examples/en/index.html', color: 'neutral', target: '_blank' }]"
            ></u-alert>
        </div>
        <div class="flex flex-col gap-16 w-full">
            <client-only>
                <chart class="h-[30svh] w-full" :options="lineChartOptions"></chart>
            </client-only>
            <client-only>
                <chart class="h-[30svh] w-full" :options="bubbleChartOptions"></chart>
            </client-only>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts";

const lineChartOptions = computed<EChartsOption>(() => ({
    xAxis: {
        type: "category",
        data: Array.from({ length: 20 }, (_, i) => i.toString()),
    },
    yAxis: {
        type: "value",

        name: "Events",
    },
    legend: {
        show: false,
    },
    tooltip: {
        valueFormatter: (val) => (val as number).toFixed(2),
        axisPointer: {
            type: "line",
            animationEasingUpdate: "cubicOut",
            animationDurationUpdate: 300,
        },
    },

    series: [
        {
            type: "line",
            name: "Dataset",
            areaStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: cssColor("--ui-primary")!,
                        },
                        {
                            offset: 1,
                            color: cssColor("--ui-primary", 0)!,
                        },
                    ],
                    global: false,
                },
                opacity: 0.5,
            },
            color: cssColor("--ui-primary"),
            data: Array.from({ length: 20 }, (_, i) => i + Math.random() * 5),
        },
    ],
}));
const bubbleChartOptions = computed<EChartsOption>(() => ({
    tooltip: {
        trigger: "item",
        valueFormatter: (val) => (val as number).toFixed(2),
        axisPointer: {
            type: "none",
            animationEasingUpdate: "cubicOut",
            animationDurationUpdate: 300,
        },
    },

    xAxis: {
        splitLine: {
            lineStyle: {
                type: "dashed",
            },
        },
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: "dashed",
            },
        },
        scale: true,
    },

    series: [
        {
            name: "Bubble dataset",
            type: "scatter",
            data: Array.from({ length: 12 }, (_, i) => [Math.random() * 10, Math.random() * 10, Math.random() * 5, i]),
            emphasis: {
                focus: "series",
                scale: 1.2,
            },
            itemStyle: {
                shadowBlur: 8,
                shadowColor: cssColor("--ui-bg", 0.2),
                shadowOffsetY: 4,
                color: cssColor("--ui-primary", 0.5)!,
                borderColor: cssColor("--ui-primary")!,
            },
            symbolSize: function (data) {
                return 5 + Math.sqrt(data[2]) * 20;
            },
        },
        {
            name: "Bubble dataset 2",
            type: "scatter",
            data: Array.from({ length: 12 }, (_, i) => [Math.random() * 10, Math.random() * 10, Math.random() * 5, i]),
            emphasis: {
                focus: "series",
                scale: 1.2,
            },
            itemStyle: {
                shadowBlur: 8,
                shadowColor: cssColor("--ui-bg", 0.2),
                shadowOffsetY: 4,
                color: cssColor("--ui-warning", 0.5)!,
                borderColor: cssColor("--ui-warning")!,
            },
            symbolSize: function (data) {
                return Math.sqrt(data[2]) * 20;
            },
        },
    ],
}));
</script>

<style></style>
