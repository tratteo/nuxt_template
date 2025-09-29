<template>
    <div class="flex flex-row items-center group">
        <slot></slot>
        <div class="icon-wrapper">
            <div class="arrow-line"></div>
            <icon class="arrow-head" name="ic:round-keyboard-arrow-right"></icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "@nuxt/ui";

const props = defineProps<{ size?: ButtonProps["size"] }>();
const size = computed(() => {
    if (!props.size) return "20px";
    if (["xs", "sm"].includes(props.size)) return "16px";
    if (["lg", "xl"].includes(props.size)) return "24px";
    return "20px";
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
* {
    --icon-size: v-bind(size);
    --length: calc(var(--icon-size) / 2);
    --anim-duration: 200ms;
}
.icon-wrapper {
    @apply relative h-[var(--icon-size)] w-[var(--icon-size)];
}
.arrow-line {
    width: var(--length);
    transition: all var(--anim-duration) ease-out;
    @apply absolute top-[50%] translate-x-[100%] translate-y-[-50%] origin-left h-[calc(var(--icon-size)/12)] scale-x-0 rounded-full bg-current group-hover:scale-100;
}
.arrow-head {
    transition: all var(--anim-duration) ease-out;
    @apply absolute top-[50%] translate-y-[-50%] left-0 text-current  group-hover:left-[calc(var(--length)-1px)] h-[var(--icon-size)] w-[var(--icon-size)];
}
</style>
