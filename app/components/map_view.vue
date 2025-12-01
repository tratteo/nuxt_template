<template>
    <div :style="{ height: height, width: width }" class="relative overflow-clip rounded-lg">
        <div v-if="controls" class="absolute bottom-0 right-[50%] translate-x-[50%] p-4 flex items-center gap-1 z-1000">
            <u-button @click="zoomOut" title="Zoom out" variant="soft" size="sm" color="neutral" icon="material-symbols:remove-rounded"> </u-button>
            <u-button @click="zoomIn" title="Zoom in" variant="soft" size="sm" color="neutral" icon="material-symbols:add-rounded"> </u-button>
            <u-button @click="() => fitView()" title="Center view" variant="soft" size="sm" color="neutral" icon="material-symbols:center-focus-weak-outline"> </u-button>
        </div>
        <div :id="mapId" :style="{ height: '100%', width: '100%' }"></div>
    </div>
</template>

<script lang="ts" setup>
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

export type LeafletInstance = typeof import("leaflet");
export interface MarkerDefinition {
    coords: [number, number];
    id: string;
    popup?: string;
    onClick?: (ev: Event) => void;
    options?: L.MarkerOptions;
}

var leaflet: LeafletInstance;
var map: L.Map | undefined;
const ready = ref(false);

const emit = defineEmits<{ (e: "ready", L: LeafletInstance, map?: L.Map): void }>();
const props = withDefaults(
    defineProps<{
        mapId: string;
        width?: string;
        height?: string;
        center?: [number, number];
        zoom?: number;
        controls?: boolean;
        markers?: MarkerDefinition[];
        cluster?: boolean;
    }>(),
    {
        cluster: true,
        controls: true,
        width: "100%",
        height: "100%",
        zoom: 6,
        center: [41.89025458379308, 12.492188020193412] as any,
    }
);

function zoomIn() {
    map?.setZoom(map.getZoom() + 1);
}
function zoomOut() {
    map?.setZoom(map.getZoom() - 1);
}
async function onMapReady() {
    emit("ready", leaflet, map);
    ready.value = true;
}

function fitView(animate: boolean = true) {
    if (props.markers && props.markers.length > 0) {
        var bounds = leaflet.latLngBounds(props.markers?.map((coord) => leaflet.latLng(coord.coords[0], coord.coords[1])));
        map?.fitBounds(bounds, {
            padding: [48, 48],
            maxZoom: 14,
            animate: animate,
        });
    } else {
        map?.setView(props.center, props.zoom);
    }
}
function injectMarkers() {
    const clusterGroup = (leaflet as any).markerClusterGroup();
    const layers: L.Layer[] = [];
    console.log(props.markers);
    (props.markers ?? []).forEach((m) => {
        const opt = m.options ?? {};
        var marker = leaflet.marker(m.coords, {
            title: m.id,
            ...opt,
        });
        if (m.popup) {
            const popup = leaflet.DomUtil.create("div", "w-full h-full");
            if (m.onClick !== undefined) {
                popup.classList.add("cursor-pointer");
                (popup as HTMLElement).addEventListener("click", m.onClick);
            }
            popup.innerHTML = m.popup;
            marker.bindPopup(popup);
        }
        if (props.cluster) {
            clusterGroup.addLayer(marker);
        } else {
            layers.push(marker);
        }
    });
    if (props.cluster) {
        layers.push(clusterGroup);
    }
    layers.forEach((l) => map?.addLayer(l));
}

onMounted(async () => {
    leaflet = (await import("leaflet")).default;
    await import("leaflet.markercluster");
    map = leaflet
        .map(props.mapId, {
            worldCopyJump: true,
            minZoom: 3,
            zoomControl: false,
        })
        .setView(props.center, props.zoom)
        .whenReady(onMapReady);

    leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '<a href="https://www.openstreetmap.org/copyright" target="__blank">OpenStreetMap</a> contributors',
        })
        .addTo(map);

    injectMarkers();
    fitView(false);
});
</script>

<style lang="css">
@reference "~/assets/css/main.css";

.leaflet-control-attribution {
    @apply bg-default rounded-tl-md px-2 opacity-75 hover:opacity-100 backdrop-opacity-50 transition-opacity duration-200 ease-out;
}
.leaflet-popup-content-wrapper {
    @apply bg-default px-1 pb-2 pt-4 text-default;
    p {
        @apply m-0;
    }
}

.leaflet-popup-tip {
    @apply bg-default;
}

.leaflet-popup-close-u-button {
    @apply absolute top-1 right-2 text-lg m-0;
}

:deep(.leaflet-interactive) {
    transition: all 0.1s ease-out;
}
.leaflet-tooltip {
    transition: opacity 0s ease-out;
}
.leaflet-popup-content {
    @apply mx-2 mb-2;
}
.leaflet-interactive {
    outline: none;
}
.marker-cluster {
    div {
        @apply w-full h-full m-0 rounded-full flex flex-row justify-center items-center bg-primary ring-4 font-normal text-lg ring-primary/50;
    }
    @apply bg-primary;
}
</style>
