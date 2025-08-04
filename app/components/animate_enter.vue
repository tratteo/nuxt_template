<template>
    <motion.div
        initial="hidden"
        whileInView="show"
        :variants="containerVariants"
        :inViewOptions="{ once: true, amount: 0.75 }"
        :transition="{ duration: 0.6, type: 'spring', bounce: 0.25, staggerChildren: 0.1, delayChildren: 0.3 }"
        class="w-full"
    >
        <slot></slot>
    </motion.div>
</template>

<script lang="ts" setup>
import { motion, stagger } from "motion-v";

const props = withDefaults(defineProps<{ marginTop?: number; marginLeft?: number; marginRight?: number }>(), { marginTop: 64, marginLeft: 0, marginRight: 0 });
const containerVariants = {
    hidden: { opacity: 0, marginTop: props.marginTop, marginLeft: props.marginLeft, marginRight: props.marginRight },
    show: { opacity: 1, marginTop: 0, marginLeft: 0, marginRight: 0 },
};
</script>

<style></style>
