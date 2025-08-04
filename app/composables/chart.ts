import type { ChartOptions, ChartType, ChartTypeRegistry, Plugin } from "chart.js";
export class PluginsFactory {
    static verticalIndicator = <Plugin>{
        id: "vertical-indicator",
        beforeDraw: function (chart, args, options) {
            if (chart.tooltip && (chart.tooltip as any)._active && (chart.tooltip as any)._active.length > 0) {
                let x = chart.tooltip.caretX;
                let yAxis = chart.scales.y;
                let ctx = chart.ctx;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yAxis!.top);
                ctx.lineTo(x, yAxis!.bottom);
                ctx.lineWidth = 2;
                ctx.strokeStyle = cssColor("--ui-border")!;
                ctx.stroke();
                ctx.restore();
            }
        },
    };
}

export const useChart = <T extends ChartType = keyof ChartTypeRegistry>({ decorator }: { decorator?: (options: ChartOptions<T>) => void }) => {
    const options = computed<ChartOptions<T>>(() => {
        const fontFamily = window.getComputedStyle(document.body).getPropertyValue("font-family");
        const fontColor = cssColor("--ui-text")!;
        const borderColor = cssColor("--ui-border");
        const bgColor = cssColor("--ui-bg");
        var opt = <ChartOptions<T>>{
            maintainAspectRatio: false,
            responsive: true,
            font: {
                family: fontFamily,
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
            datasets: {
                line: {
                    pointStyle: "rectRounded",
                },
                bar: {
                    pointStyle: "rectRounded",
                },
                doughnut: {
                    borderWidth: 4,
                    spacing: 16,
                    borderColor: borderColor,
                    borderRadius: 8,
                    pointStyle: "rectRounded",
                },
            },
            color: fontColor,
            animation: {
                duration: 400,
                easing: "easeOutExpo",
            },
            plugins: {
                title: {
                    display: false,
                },
                subtitle: {
                    display: false,
                },
                legend: {
                    align: "start",
                    position: "bottom",

                    labels: {
                        usePointStyle: true,

                        pointStyle: "rectRounded",
                        color: fontColor,
                    },
                },
                colors: {
                    enabled: true,
                    forceOverride: false,
                },
                tooltip: {
                    bodyColor: fontColor,
                    titleColor: fontColor,
                    footerColor: fontColor,
                    caretPadding: 8,
                    footerFont: {
                        family: fontFamily,
                    },
                    usePointStyle: true,
                    cornerRadius: 8,
                    padding: 8,
                    titleMarginBottom: 12,
                    animation: {
                        duration: 250,
                        easing: "easeOutQuad",
                    },
                    bodyFont: {
                        family: fontFamily,
                    },
                    titleFont: {
                        family: fontFamily,
                    },
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
            },
            scales: {
                x: {
                    ticks: { color: fontColor },
                    border: {
                        width: 1,
                        color: borderColor,
                    },
                    grid: {
                        display: false,
                        drawOnChartArea: false,
                        color: borderColor,
                        lineWidth: 1,
                        tickWidth: 1,
                    },
                },
                y: {
                    border: {
                        width: 1,
                        color: borderColor,
                    },
                    ticks: { color: fontColor },
                    grid: {
                        display: false,
                        drawOnChartArea: false,
                        color: borderColor,
                        lineWidth: 1,
                        tickWidth: 1,
                    },
                },
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 8,
                    hitRadius: 20,
                },
                line: {
                    borderJoinStyle: "round",
                    borderCapStyle: "round",
                    borderWidth: 4,
                    tension: 0.25,
                },

                bar: {
                    hoverBorderColor: fontColor,
                    borderRadius: 8,
                    borderWidth: 0,
                },
            },
        };
        if (decorator) {
            decorator(opt);
        }
        return opt;
    });
    return { options };
};
