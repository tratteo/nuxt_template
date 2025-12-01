<template>
    <div class="flex flex-row items-center group" :class="rootClass">
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
const rootClass = computed(() => {
    if (!props.size) return "gap-3";
    if (["xs", "sm"].includes(props.size)) return "gap-2";
    if (["lg", "xl"].includes(props.size)) return "gap-4";
    return "gap-3";
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
* {
    --icon-size: v-bind(size);
    --length: calc(var(--icon-size) / 2);
    transition: all 200ms ease-out;
}
.icon-wrapper {
    @apply relative h-(--icon-size) w-(--length);
}
.arrow-line {
    @apply absolute top-[50%] left-0 translate-y-[-50%] origin-left h-[calc(var(--icon-size)/12)] group-hover:w-(--length) w-0 rounded-full bg-current;
}
.arrow-head {
    @apply absolute top-[50%] translate-x-[-55%] translate-y-[-50%] left-0 text-current group-hover:left-(--length) h-(--icon-size) w-(--icon-size);
}
</style>
