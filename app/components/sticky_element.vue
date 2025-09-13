<template>
    <motion.div ref="elementRef" class="w-fit h-fit" :style="{ x, y }" @hover-start="handlePointerEnter" @hover-end="handlePointerLeave">
        <slot></slot>
    </motion.div>
</template>

<script setup lang="ts">
import { frame, motion, type SpringOptions, useMotionValue, useSpring } from "motion-v";

const props = withDefaults(defineProps<{ amplitude?: number; spring?: SpringOptions }>(), {
    amplitude: 10,
    spring: () => <SpringOptions>{ damping: 50, stiffness: 2000 },
});

const elementRef = useTemplateRef("elementRef");
const xPoint = useMotionValue(0);
const yPoint = useMotionValue(0);
const x = useSpring(xPoint, props.spring);
const y = useSpring(yPoint, props.spring);
const dragging = ref(false);

function asymptoteFun(val: number) {
    return props.amplitude * Math.sign(val) * Math.log(1e-3 * val * val + 1);
}

function handlePointerMove(ev: PointerEvent) {
    const rect = elementRef.value?.$el;
    if (!rect) return;

    frame.read(() => {
        const targetX = ev.clientX - rect.offsetLeft - rect.offsetWidth / 2;
        const targetY = ev.clientY - rect.offsetTop - rect.offsetHeight / 2;
        const restX = asymptoteFun(targetX);
        const restY = asymptoteFun(targetY);
        if (!dragging.value) return;
        xPoint.set(restX);
        yPoint.set(restY);
    });
}

onMounted(() => {
    window.addEventListener("pointermove", handlePointerMove);
});

onUnmounted(() => {
    window.removeEventListener("pointermove", handlePointerMove);
});

function handlePointerEnter() {
    dragging.value = true;
}

function handlePointerLeave() {
    xPoint.set(0);
    yPoint.set(0);
    dragging.value = false;
}
</script>

<style></style>
