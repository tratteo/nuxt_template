<template>
    <layout-group>
        <motion.div layout :transition="layoutTransition">
            <u-button @click="onClick" v-bind="mergedAttrs" class="flex items-center">
                <template #default>
                    <motion.div v-if="$slots.default" key="content" layout :transition="layoutTransition">
                        <slot></slot>
                    </motion.div>
                </template>
            </u-button>
        </motion.div>
    </layout-group>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "@nuxt/ui";
import { LayoutGroup, motion, type $Transition } from "motion-v";

const layoutTransition: $Transition = { type: "spring", bounce: 0.25, duration: 0.4 };
const attrs = useAttrs();
const awaitingPromise = ref(false);
const isAwaiting = computed(() => props.awaiting || awaitingPromise.value);

const props = defineProps<
    {
        awaiting?: boolean;
        promise?: () => Promise<void | any>;
    } & ButtonProps
>();
const mergedAttrs = computed(() => {
    return { ...props, disabled: isAwaiting.value || props.disabled, icon: isAwaiting.value ? "svg-spinners:180-ring-with-bg" : props.leadingIcon, ...attrs };
});
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
