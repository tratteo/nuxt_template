<template>
    <div v-if="mounted" class="relative flex justify-center items-start pointer-events-none z-[-100]">
        <motion.div ref="blobEl" class="blob" :animate="{ rotate: `${smoothAngle}rad`, transition: { duration: 2 } }"></motion.div>
    </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const blobEl = useTemplateRef("blobEl");
const mounted = useMounted();
const previousAngle = ref(0);
const totalRotation = ref(0);
const smoothAngle = ref(0);
const props = withDefaults(defineProps<{ size?: string; blur?: number; scaleAmplitude?: number }>(), {
    size: "200px",
    scaleAmplitude: 0.2,
    blur: 10,
});

onMounted(() => {
    setTimeout(() => {
        requestAnimationFrame(morph);
    }, 400);

    window.addEventListener("mousemove", mouseMove);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", mouseMove);
});

function getSmoothAngle(angle: number) {
    let angleDiff = angle - previousAngle.value;
    if (angleDiff > Math.PI) {
        angleDiff -= 2 * Math.PI;
    } else if (angleDiff < -Math.PI) {
        angleDiff += 2 * Math.PI;
    }
    totalRotation.value += angleDiff;
    previousAngle.value = angle;
    return totalRotation.value;
}
function mouseMove(ev: MouseEvent) {
    if (!blobEl.value?.$el) return;
    const rect = blobEl.value.$el.getBoundingClientRect();
    const deltaX = ev.clientX - (rect.left + rect.width / 2);
    const deltaY = ev.clientY - (rect.top + rect.height / 2);
    smoothAngle.value = getSmoothAngle(Math.atan2(deltaY, deltaX));
}

function randomScale(): string {
    if (!blobEl.value) return "1 1 1";
    const magnitude = props.scaleAmplitude;
    return `${remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude])} ${remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude])} ${remap(
        Math.random(),
        [0, 1],
        [1 - magnitude, 1 + magnitude]
    )}`;
}

function randomRotation(): string {
    return `${Math.random() * 360}deg`;
}

function randomBorderRadius(): string {
    if (!blobEl.value) return "0deg";
    return `${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(
        Math.random(),
        [0, 1],
        [10, 80]
    )}% / ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(Math.random(), [0, 1], [10, 80])}% ${remap(
        Math.random(),
        [0, 1],
        [10, 80]
    )}%`;
}

function morph() {
    if (!blobEl.value) return;
    blobEl.value.$el.style.scale = randomScale();
    blobEl.value.$el.style.borderRadius = randomBorderRadius();
    blobEl.value.$el.style.filter = `blur(${props.blur}px)`;

    setTimeout(
        () => {
            requestAnimationFrame(morph);
        },
        Math.random() * 2000 + 2500
    );
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.blob {
    transform-origin: center !important;
    filter: blur(0px);
    border-radius: 36%;
    z-index: -100 !important;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
    background: linear-gradient(var(--color-violet-500), var(--ui-primary));
    color: transparent;
    width: v-bind(size);
    height: v-bind(size);
    transition:
        filter 3s,
        scale 3s,
        border-radius 3s;
}
</style>
