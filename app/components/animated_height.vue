<template>
    <motion.div
        ref="content"
        class="overflow-y-hidden"
        :animate="{ height: contentHeight }"
        :transition="{ duration: disableAnimation ? 0 : duration, type: 'spring', bounce: 0.25 }"
    >
        <div ref="inner" class="w-full flex items-center">
            <slot></slot>
        </div>
    </motion.div>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
defineProps({
    initialOpen: {
        type: Boolean,
        default: false,
    },
    duration: {
        type: Number,
        default: 0.4,
    },
    disableAnimation: {
        type: Boolean,
        default: false,
    },
});

const content = ref<HTMLElement | null>(null);
const inner = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;
const contentHeight = ref("0px");

const updateHeight = () => {
    if (!content.value || !inner.value) return;
    contentHeight.value = `${inner.value.offsetHeight + 1}px`;
};

onMounted(() => {
    resizeObserver = new ResizeObserver(updateHeight);
    if (inner.value) {
        resizeObserver.observe(inner.value);
    }
    updateHeight();
});
onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<style scoped>
@reference "~/assets/css/main.css";
</style>
