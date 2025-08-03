<template>
    <LayoutGroup>
        <motion.div layout :transition="layoutTransition">
            <u-button @click="onClick" :disabled="isAwaiting || props.disabled" :type="type" :variant="variant" :color="color" class="flex items-center">
                <template #leading>
                    <motion.div
                        key="loading-icon"
                        layout
                        v-if="isAwaiting"
                        :variants="iconVariants"
                        initial="hidden"
                        animate="show"
                        :transition="iconTransition"
                        class="flex items-center"
                    >
                        <u-icon name="svg-spinners:180-ring-with-bg"></u-icon>
                    </motion.div>
                    <motion.div
                        key="icon"
                        layout
                        v-else-if="leadingIcon"
                        :variants="iconVariants"
                        initial="hidden"
                        animate="show"
                        :transition="iconTransition"
                        class="flex items-center"
                    >
                        <icon :name="leadingIcon"></icon>
                    </motion.div>
                </template>
                <template #default>
                    <motion.div v-if="$slots.default" key="content" layout :transition="layoutTransition">
                        <slot></slot>
                    </motion.div>
                </template>
            </u-button>
        </motion.div>
    </LayoutGroup>
</template>

<script lang="ts" setup>
import { LayoutGroup, motion, type VariantType } from "motion-v";

const iconVariants: { [k: string]: VariantType } = {
    hidden: {
        opacity: 0,
        scale: 0.5,
    },
    show: {
        opacity: 1,
        scale: 1,
    },
};
const layoutTransition: any = {
    type: "spring",
    bounce: 0.25,
    duration: 0.4,
};
const iconTransition: any = {
    type: "spring",
    bounce: 0.4,
    duration: 0.3,
    opacity: { delay: 0 },
};

const awaitingPromise = ref(false);
const isAwaiting = computed(() => props.awaiting || awaitingPromise.value);

const props = defineProps<{
    leadingIcon?: string;
    awaiting?: boolean;
    type?: "submit" | "reset" | "button";
    color?: "neutral" | "primary" | "error" | "success" | "warning" | "info";
    variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
    disabled?: boolean;

    promise?: () => Promise<void | any>;
}>();
const emits = defineEmits<{ (e: "click", ev: MouseEvent): void }>();

function onClick(ev: MouseEvent) {
    if (isAwaiting.value || props.disabled) return;
    emits("click", ev);
    if (!props.promise) return;
    awaitingPromise.value = true;
    props.promise().finally(() => (awaitingPromise.value = false));
}
</script>

<style></style>
