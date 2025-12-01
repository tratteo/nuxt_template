<template>
    <div class="w-full flex flex-col gap-4 items-stretch mt-4">
        <div class="flex justify-between gap-4 w-full items-center flex-wrap">
            <u-form-field>
                <template #label> In this tutorial we natively integrated <u-link to="https://leafletjs.com/" target="_blank">Leaflet</u-link> into Nuxt. </template>
                <template #description>The map is rendered client side only and the Leaflet module is dynamically imported. Check out the YouTube video for more details.</template>
            </u-form-field>
            <u-button label="Check out the video" icon="logos:youtube-icon" color="neutral" to="https://youtu.be/B24nLqwWzKI" target="_blank"></u-button>
        </div>
        <client-only>
            <map-view map-id="default-id" :height="'50svh'" width="100%" :markers="markers"></map-view>
        </client-only>
    </div>
</template>

<script lang="ts" setup>
import type { MarkerDefinition } from "~/components/map_view.vue";

const defaultMarkers: any[] = [
    { id: "Latina", coords: [41.46149509205332, 12.900105245304635] },
    { id: "Roma", coords: [41.89666989303321, 12.485015662922642] },
    { id: "Firenze", coords: [43.76446283660515, 11.259645031818566] },
    { id: "Trento", coords: [46.06179875887721, 11.109413237251811] },
    { id: "Parma", coords: [44.80493293802878, 10.320182049683936] },
];

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
