<template>
    <u-drawer v-if="isMobile" v-bind="{ ...metaVariants, $attrs }" v-model:open="isOpen" :ui="{ body: 'w-full', footer: 'items-end', ...uiSheetVariants }">
        <template #title v-if="$slots.title"> <slot name="title" :arg="currentArg"></slot></template>
        <template #description v-if="$slots.description"> <slot name="description" :arg="currentArg"></slot></template>
        <template #body v-if="$slots.body">
            <animated-height>
                <slot name="body" :arg="currentArg"></slot>
            </animated-height>
        </template>
        <template #footer v-if="$slots.footer">
            <slot name="footer" :arg="currentArg"></slot>
        </template>
    </u-drawer>
    <u-modal v-else v-bind="{ ...metaVariants, $attrs }" v-model:open="isOpen" :ui="{ footer: 'justify-end', ...uiBoxVariants }">
        <template #title v-if="$slots.title"><slot name="title" :arg="currentArg"></slot></template>
        <template #description v-if="$slots.description"> <slot name="description" :arg="currentArg"></slot></template>
        <template #body v-if="$slots.body">
            <animated-height>
                <slot name="body" :arg="currentArg"></slot>
            </animated-height>
        </template>
        <template #footer v-if="$slots.footer">
            <div class="flex justify-end w-full gap-2">
                <slot name="footer" :arg="currentArg"></slot>
            </div>
        </template>
    </u-modal>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

export interface ModalElement {
    getArg: () => any | undefined;
    open: (arg?: any | undefined) => void;
    close: () => void;
}
const bp = useBreakpoints(breakpointsTailwind);

const currentArg = ref<any | undefined>();
const isOpen = ref(false);
const isMobile = computed(() => bp.smallerOrEqual("md").value);

const emit = defineEmits<{ (e: "close"): void; (e: "open", arg: any): any }>();
defineOptions({ inheritAttrs: true });
const props = withDefaults(
    defineProps<{
        id?: string;
        title?: string | ((arg: any | undefined) => string | undefined);
        uiSheetVariants?: { [key: string]: any };
        uiBoxVariants?: { [key: string]: any };
        description?: string | ((arg: any | undefined) => string | undefined);
        dismissible?: boolean;
    }>(),
    {
        dismissible: true,
    }
);

const metaVariants = computed(() => ({
    description: typeof props.description === "string" ? props.description : props.description?.(currentArg.value),
    title: typeof props.title === "string" ? props.title : props.title?.(currentArg.value),
    dismissible: props.dismissible,
}));

watch(isOpen, (val) => {
    if (!val) {
        emit("close");
    } else {
        emit("open", currentArg.value);
    }
});

function open(arg: any | undefined) {
    currentArg.value = arg;
    isOpen.value = true;
}

function close() {
    isOpen.value = false;
}

defineExpose<ModalElement>({
    getArg: () => currentArg.value,
    open: open,
    close: close,
});
</script>

<style lang="css">
@reference "~/assets/css/main.css";
</style>
