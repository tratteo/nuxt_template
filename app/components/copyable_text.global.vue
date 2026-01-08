<template>
    <u-field-group class="w-full" :size="size">
        <u-input :model-value="content" aria-label="Copy text" readonly class="w-full" :size="size"> </u-input>
        <u-button
            @click="onClick"
            type="button"
            variant="subtle"
            :color="copied ? 'success' : 'neutral'"
            :size="size"
            aria-label="copy content"
            :icon="copied ? 'material-symbols:check-circle-rounded' : 'material-symbols:content-copy-outline-rounded'"
        ></u-button>
        <u-dropdown-menu v-if="(items?.length ?? 0) > 0" :items="props.items ?? []" :size="size">
            <u-button color="neutral" variant="subtle" icon="i-lucide-chevron-down" :size="size" />
        </u-dropdown-menu>
    </u-field-group>
</template>

<script lang="ts" setup>
import type { ButtonProps, DropdownMenuItem } from "@nuxt/ui";

const clipboard = useClipboard();
const copied = ref<boolean>(false);
const props = defineProps<{ content: string; items?: DropdownMenuItem[]; size?: ButtonProps["size"] }>();
const emit = defineEmits<{ (e: "click", val: string, ev: MouseEvent): void }>();

function onClick(event: MouseEvent) {
    emit("click", props.content, event);
    clipboard.copy(props.content);
    copied.value = true;
    setTimeout(() => {
        return (copied.value = false);
    }, 1500);
}
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
</style>
