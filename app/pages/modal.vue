<template>
    <div class="w-full flex flex-col gap-4 items-center mt-4 p-4">
        <div class="flex justify-between gap-4 w-full items-center flex-wrap">
            <u-form-field>
                <template #label> Responsive modals in Nuxt. </template>
                <template #description>
                    In this example we created a system to handle modals really easily and make them responsive, ready for mobile. <br />
                    • Open the modal with a certain argument <br />
                    • Change the theme and see how the modal adapts <br />
                    • Shrink the page and see that the modals switches to a very cool bottom sheet! <br />
                </template>
            </u-form-field>
            <u-button label="Check out the video" icon="logos:youtube-icon" color="neutral" to="https://youtu.be/OAScxDDialk" target="_blank"></u-button>
        </div>
        <u-separator></u-separator>
        <u-field-group>
            <u-button label="Open modal" @click="task" variant="subtle"></u-button>
            <u-select :items="items" placeholder="Pick an argument" class="min-w-32" v-model="arg"></u-select>
        </u-field-group>

        <modal ref="modalEl" title="A new cool modal" description="This is a very cool modal description that represents some information">
            <template #body="{ arg }">
                <div class="min-h-40">Argument: {{ arg ?? "undefined" }}</div>
                <Modal ref="nestedModal" title="This is a nested modal" description="This nested modal has the argument equal to double the initial argument">
                    <template #body="{ arg }">Argument: {{ arg }}</template>
                </Modal>
            </template>
            <template #footer="{ arg }">
                <u-button label="Open nested" color="neutral" @click="() => nestedModalEl?.open(arg * 2)"></u-button>
            </template>
        </modal>
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
