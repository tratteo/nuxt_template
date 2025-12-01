<template>
    <div>
        <vchart ref="chartEl" class="w-full h-full" :init-options="{}" :option="mergedOptions" :theme="chartTheme"></vchart>
    </div>
</template>

<script lang="ts" setup>
import "echarts";
import { type EChartsInitOpts, type EChartsOption } from "echarts";
import vchart from "vue-echarts";
const props = defineProps<{ initOptions?: EChartsInitOpts; options?: EChartsOption }>();
const chartEl = useTemplateRef("chartEl");

const chartTheme = ref<EChartsOption>({
    color: [
        "#2ec7c9",
        "#b6a2de",
        "#5ab1ef",
        "#ffb980",
        "#d87a80",
        "#8d98b3",
        "#e5cf0d",
        "#97b552",
        "#95706d",
        "#dc69aa",
        "#07a2a4",
        "#9a7fd1",
        "#588dd5",
        "#f5994e",
        "#c05050",
        "#59678c",
        "#c9ab00",
        "#7eb00a",
        "#6f5553",
        "#c14089",
    ],
    animationDelay: 200,
    animationDelayUpdate: 0,
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 400,
    animationEasingUpdate: "cubicOut",
    textStyle: {},
    tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: cssColor("--ui-bg"),
        borderColor: cssColor("--ui-border"),
        textStyle: { color: cssColor("--ui-text") },
    },
    legend: { show: true, itemGap: 8, left: 0, itemWidth: 12, itemHeight: 12, itemStyle: {}, textStyle: { color: cssColor("--ui-text-toned") } },
    pie: { animationEasing: "circularOut" },
    bar: {
        barMaxWidth: 64,
        itemStyle: {
            borderRadius: [8, 8, 0, 0],
        },
    },
    line: {
        lineStyle: {
            width: 2,
        },
        symbolSize: 4,
        symbol: "roundRect",
        smooth: 0.25,
        animationEasing: "circularOut",
    },
    valueAxis: {
        splitLine: { show: false },
    },
    categoryAxis: {
        splitLine: { show: false },
    },
    grid: {
        left: 16,
        right: 16,
        top: 32,
        outerBoundsContain: "axisLabel",
    },
});
const mergedOptions = computed<EChartsOption>(() => ({ tooltip: {}, grid: {}, legend: {}, ...props.options }));
function resize() {
    chartEl.value?.resize();
}
onMounted(() => {
    window.addEventListener("resize", resize);
});
onUnmounted(() => {
    window.removeEventListener("resize", resize);
});
function showLoading() {
    chartEl.value?.chart?.showLoading("default", {
        text: "Loading data...",
        textColor: cssColor("--ui-text"),
        color: cssColor("--ui-primary"),
        maskColor: cssColor("--ui-bg", 0.75),
        fontSize: 12,
        zlevel: 1000,
    });
}
function hideLoading() {}
defineExpose({ chartEl, showLoading, hideLoading });
</script>

<style></style>
