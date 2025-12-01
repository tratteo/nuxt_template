<template>
    <client-only v-if="!colorMode?.forced">
        <u-switch checked-icon="i-lucide-moon" unchecked-icon="i-lucide-sun" v-model="isDark" color="neutral" size="sm"></u-switch>
        <template #fallback>
            <div class="size-8"></div>
        </template>
    </client-only>
</template>
<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
    },
});
</script>
