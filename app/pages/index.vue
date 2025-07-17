<template>
    <div class="w-full flex flex-col gap-4 items-center mt-4">
        <ClientOnly>
            <MapView map-id="default-id" :height="'50svh'" width="50%" :markers="markers"></MapView>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import type { MarkerDefinition } from "~/components/map_view.vue";
import { defaultMarkers } from "~/src/markers";

const markers = computed(() => {
    return defaultMarkers.map(
        (m) =>
            <MarkerDefinition>{
                id: m.id,
                coords: m.coords,
                popup: `<p class="text-center" onclick="alert('Ugly dangerous HTML executed!');">${m.id}</p>`,
                onClick(ev) {
                    console.log(ev.target);
                },
            }
    );
});
</script>

<style></style>
