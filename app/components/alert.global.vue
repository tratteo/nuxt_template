<template>
    <u-alert :title="title" :description="description" variant="subtle" :color="getColorName" :icon="getIconName" class="alert">
        <template #title v-if="$slots.title"><slot name="title"></slot></template>
        <template #description v-if="$slots.description"><slot name="description"></slot></template>
    </u-alert>
</template>

<script lang="ts" setup>
export type AlertType = "warning" | "info" | "error" | "success";
const props = withDefaults(defineProps<{ type?: AlertType; title?: string; description?: string }>(), { type: "info" });
const getIconName = computed(() => {
    switch (props.type) {
        case "error":
            return "ph:minus-circle-fill";
        case "warning":
            return "material-symbols:warning-rounded";
        case "info":
            return "material-symbols:info-rounded";
        case "success":
            return "material-symbols:check-circle-rounded";
    }
});
const getColorName = computed(() => {
    switch (props.type) {
        case "error":
            return "error";
        case "warning":
            return "warning";
        case "info":
            return "info";
        case "success":
            return "success";
    }
});
</script>

<style lang="css">
@reference "~/assets/css/main.css";
</style>
