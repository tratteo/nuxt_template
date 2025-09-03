<template>
    <nav class="relative select-none max-h-[75svh] w-full overflow-y-auto">
        <motion.div
            class="absolute w-[1px] bg-primary rounded-md left-0 z-[30000]!"
            :transition="{ duration: 0.1 }"
            :animate="{ top: indicatorStyle.top, height: indicatorStyle.height }"
        ></motion.div>
        <ul ref="navEl" class="flex flex-col items-stretch w-full text-sm overflow-y-auto scrollbar" :class="{ 'pl-4': !hideIndicator }">
            <li :id="`link-${t.id}`" v-for="(t, i) in flattenLinks" :title="t.text" class="w-full flex flex-col py-1">
                <a
                    :href="'#' + t.id"
                    class="block w-full whitespace-nowrap overflow-hidden text-ellipsis text-muted hover:text-default"
                    :class="{ 'text-primary!': visibilityMap[t.id]?.visible, 'pl-4': t.depth > 2 }"
                    >{{ t.text }}</a
                >
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import type { Toc, TocLink } from "@nuxt/content";
import l from "lodash";
import { motion } from "motion-v";

const props = withDefaults(defineProps<{ toc: Toc; hideIndicator?: boolean; maxDepth?: number }>(), { maxDepth: 3 });
let observer: IntersectionObserver | undefined;
const flattenLinks = flattenDeep(props.toc.links, (l) => l.children).filter((l) => l.depth <= props.maxDepth);
const navEl = useTemplateRef("navEl");

const visibilityMap = ref<{ [id: string]: { link: TocLink; visible: boolean; tocLink: HTMLElement; index: number } }>({});
const indicatorStyle = ref({ top: "0px", height: "0px" });

watch(visibilityMap, updateIndicatorStyle, { deep: true });

function updateIndicatorStyle() {
    if (props.hideIndicator) return;
    const sortedEntries = Object.values(visibilityMap.value).toSorted((a, b) => a.index - b.index);
    let start = sortedEntries.findIndex((e) => e.visible);
    let top = l.sumBy(sortedEntries.splice(0, start), (e) => e.tocLink.getBoundingClientRect().height);
    let height = 0;
    for (const entry of sortedEntries) {
        if (entry.visible) {
            const rect = entry.tocLink.getBoundingClientRect();
            height += rect.height ?? 0;
        }
    }
    indicatorStyle.value = { height: `${height}px`, top: `${top}px` };
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                visibilityMap.value[e.target.id]!.visible = e.isIntersecting;
            });
        },
        {
            rootMargin: "128px 0px -128px 0px",
        }
    );
    flattenLinks.forEach((l, i) => {
        const el = document.getElementById(l.id);
        if (!el) return;
        visibilityMap.value[l.id] = { link: l, visible: false, tocLink: navEl.value?.querySelector(`#link-${l.id}`)!, index: i };
        observer?.observe(el);
    });
});

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.scrollbar {
    scrollbar-width: thin;
}
</style>
