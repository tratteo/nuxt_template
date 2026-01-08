<template>
    <icon :name="iconName"></icon>
</template>

<script lang="ts" setup>
const props = defineProps<{ url?: string }>();
const iconName = computed(() => {
    const url = props.url?.trim()?.toLocaleLowerCase();
    if (isNullOrEmpty(url)) return "material-symbols:link-rounded";
    if (url!.includes("instagram.com")) {
        return "mdi:instagram";
    } else if (url!.includes("linkedin.com")) {
        return "mdi:linkedin";
    } else if (url!.includes("github.com")) {
        return "mdi:github";
    } else if (url!.includes("youtube.com")) {
        return "mdi:youtube";
    } else if (url!.includes("facebook.com")) {
        return "mdi:facebook";
    } else if (url!.includes("threads.net")) {
        return "tabler:brand-threads";
    } else if (url!.includes("tiktok.com")) {
        return "ic:baseline-tiktok";
    } else if (url!.includes("t.me")) {
        return "mdi:telegram";
    } else if (url!.includes("whatsapp.com") || url!.includes("wa.me")) {
        return "mdi:whatsapp";
    } else if (url!.endsWith(".pdf")) {
        return "material-symbols:picture-as-pdf-rounded";
    } else if (url!.includes("zoom.us")) {
        return "simple-icons:zoom";
    } else if (url!.includes("meet.google.com")) {
        return "simple-icons:googlemeet";
    } else if (url!.includes("google.com")) {
        return "mdi:google";
    } else if (url!.endsWith(".jpeg") || url!.endsWith(".jpg") || url!.endsWith(".png") || url!.endsWith(".webp")) {
        return "material-symbols:imagesmode-rounded";
    } else if (url!.endsWith(".mp4") || url!.endsWith(".mov")) {
        return "material-symbols:video-library-rounded";
    } else if (url!.endsWith(".ogg") || url!.endsWith(".mp3") || url!.endsWith(".wav")) {
        return "material-symbols:sound-detection-loud-sound-rounded";
    } else if (url!.endsWith(".csv")) {
        return "material-symbols:csv-rounded";
    }
    return "material-symbols:link-rounded";
});
</script>

<style></style>
