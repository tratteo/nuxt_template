<template>
    <div ref="containerEl" class="flex flex-col gap-2 select-none">
        <div v-for="(item, i) in items" :key="i">
            <div class="w-full flex items-center gap-2">
                <div class="handle opacity-50 hover:opacity-100 flex items-center transition-all duration-150 ease-out touch-none">
                    <icon name="material-symbols:drag-indicator"></icon>
                </div>
                <slot name="item" :item="item" :index="i"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup generic="T">
import { useSortable } from "@vueuse/integrations/useSortable";

const props = defineProps<{ items: T[] }>();
const emits = defineEmits<{ (e: "update", items: T[]): void; (e: "swap", from: number, to: number): void }>();

const containerEl = ref<HTMLElement>();

useSortable(containerEl, props.items, {
    handle: ".handle",
    animation: 200,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
});
</script>

<style></style>
