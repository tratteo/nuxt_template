<template>
    <motion.div ref="contentEl" class="overflow-y-hidden" :animate="{ height: contentHeight }" :transition="{ duration: duration, type: 'spring', bounce: 0.25 }">
        <div ref="innerEl" class="w-full flex items-center">
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
});

const contentEl = useTemplateRef("contentEl");
const innerEl = useTemplateRef("innerEl");

let resizeObserver: ResizeObserver | null = null;
const contentHeight = ref("0px");

function updateHeight() {
    if (!contentEl.value || !innerEl.value) return;
    contentHeight.value = `${innerEl.value.offsetHeight + 1}px`;
}

onMounted(() => {
    resizeObserver = new ResizeObserver(updateHeight);
    if (innerEl.value) {
        resizeObserver.observe(innerEl.value);
    }
    updateHeight();
});
onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
</style>
