<template>
    <div class="w-full flex flex-col gap-8 items-center mt-4 p-4">
        <u-button-group>
            <u-button label="Open modal" @click="task"></u-button>
            <u-select :items="items" placeholder="Pick an argument" class="min-w-[8rem]" v-model="arg"></u-select>
        </u-button-group>
        <ColorModeButton></ColorModeButton>
        <ul>
            <li>• Open the modal with a certain argument</li>
            <li>• Shrink the page and see that the modals switches to a very cool bottom sheet!</li>
        </ul>
        <Modal ref="modalEl" title="A new cool modal" description="This is a very cool modal description that represents some information">
            <template #body="{ arg }">
                <div class="min-h-[20rem]">Argument: {{ arg }}</div>
                <Modal ref="nestedModal" title="This is a nested modal" description="This nested modal has the argument equal to double the initial argument">
                    <template #body="{ arg }">Argument: {{ arg }}</template>
                </Modal>
            </template>
            <template #footer="{ arg }">
                <u-button label="Open nested" color="neutral" @click="() => nestedModalEl?.open(arg * 2)"></u-button>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import type { ModalElement } from "~/components/modal.vue";
const modalEl = useTemplateRef<ModalElement>("modalEl");
const nestedModalEl = useTemplateRef<ModalElement>("nestedModal");
const items = listGenerate(10, (i) => i);
const arg = ref();
async function task() {
    modalEl.value?.open(arg.value);
}
</script>

<style></style>
