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
const x = useSpring(0, props.spring);
const y = useSpring(0, props.spring);
const dragging = ref(false);

function asymptoteFun(val: number) {
    return props.amplitude * Math.sign(val) * Math.log(1e-3 * val * val + 1);
}

function handlePointerMove(ev: PointerEvent) {
    if (!dragging.value) return;
    const el = elementRef.value?.$el;
    if (!el) return;
    const rect = (el as HTMLElement).getBoundingClientRect();
    frame.read(() => {
        const targetX = ev.clientX - (rect.left + rect.width / 2);
        const targetY = ev.clientY - (rect.top + rect.height / 2);
        const restX = asymptoteFun(targetX);
        const restY = asymptoteFun(targetY);
        x.set(restX);
        y.set(restY);
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
    x.set(0);
    y.set(0);
    dragging.value = false;
}
</script>

<style></style>
