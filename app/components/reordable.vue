<template>
    <div ref="containerEl" class="flex flex-col gap-2 select-none">
        <div v-for="(item, i) in mappedItems" :key="item.id">
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
import l from "lodash";

const props = defineProps<{ items: T[] }>();
const emits = defineEmits<{ (e: "update", items: T[]): void; (e: "swap", from: number, to: number): void }>();

const containerEl = ref<HTMLElement>();
const mappedItems = ref<WithId<T>[]>(props.items.map((l, i) => ({ id: i.toString(), payload: l })));

useSortable(containerEl, mappedItems, {
    handle: ".handle",
    animation: 200,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    onSort: function (evt: any) {
        swap(props.items, evt.oldIndex, evt.newIndex);
        emits("swap", evt.oldIndex, evt.newIndex);
    },
});

watch(
    () => props.items,
    () => {
        mappedItems.value = props.items.map((l, i) => ({ id: i.toString(), payload: l }));
    },
    { deep: true }
);

watch(
    mappedItems,
    (newVal) => {
        const newProps = newVal.map((l, i) => l.payload);
        if (!l.isEqual(newProps, props.items)) {
            emits(
                "update",
                mappedItems.value.map((e) => e.payload as T)
            );
        }
    },
    { deep: true }
);
</script>

<style></style>
