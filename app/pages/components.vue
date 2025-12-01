<template>
    <div class="flex justify-between gap-4 w-full items-stretch flex-wrap mb-32">
        <u-form-field>
            <template #label> Here you find all the various implemented components. </template>
            <template #description>You can check the different sections to go directly to the corresponding video.</template>
        </u-form-field>
        <u-separator></u-separator>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Reordable elements" description="Move the elements dragging them from the handle and check how the underlying list updates"></u-form-field>
            </template>
            <animated-height>
                <div class="flex flex-col gap-4 w-full">
                    <Reordable :items="items" class="">
                        <template #item="{ item, index }">
                            <div class="bg-muted w-full rounded-md p-2 flex items-center">
                                <u-input :model-value="item" @update:model-value="(v) => items.splice(index, 1, v)"></u-input>
                                <u-button
                                    color="error"
                                    variant="ghost"
                                    icon="material-symbols:delete-rounded"
                                    size="sm"
                                    class="ml-auto"
                                    @click="() => removeItem(index)"
                                ></u-button>
                            </div>
                        </template>
                    </Reordable>
                </div>
            </animated-height>
            <u-button label="Add" icon="material-symbols:add-rounded" variant="soft" class="w-fit ml-auto" @click="addItem"></u-button>
            <pre><code class="text-sm">{{ items }}</code></pre>
        </u-card>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Sticky element" description="Hover any of the following elements and they will stick to your mouse, very cool microinteraction"></u-form-field>
            </template>
            <div class="flex w-full justify-center">
                <sticky-element v-if="mounted">
                    <div class="bg-primary rounded-full aspect-square p-4 flex items-center justify-center text-inverted font-semibold">Hover me!</div>
                </sticky-element>
            </div>
        </u-card>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Arrow microinteraction" description="Hover the button to animate the arrow"></u-form-field>
            </template>
            <div class="flex flex-col gap-2">
                <div class="flex items-stretch gap-2">
                    <u-select :items="['xs', 'sm', 'md', 'lg', 'xl']" v-model="animatedArrowProps.size"></u-select>
                    <u-select :items="['outline', 'ghost', 'link', 'solid', 'subtle', 'soft']" v-model="animatedArrowProps.variant"></u-select>
                </div>
                <div class="flex w-full justify-center">
                    <u-button class="group" :variant="cast<ButtonProps['variant']>(animatedArrowProps.variant)" :size="cast<ButtonProps['size']>(animatedArrowProps.size)">
                        <animated-arrow :size="cast<ButtonProps['size']>(animatedArrowProps.size)"> Click me</animated-arrow>
                    </u-button>
                </div>
            </div>
        </u-card>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Copyable text menu" description="A text field that can be copied and has the possibility to add different actions"></u-form-field>
            </template>
            <div class="flex flex-col items-center gap-2">
                <copyable-text
                    content="Copy me!"
                    class="w-fit"
                    :items="[
                        { label: 'Check repository', icon: 'mdi:github' },
                        { label: 'Go on YouTube', icon: 'mdi:youtube' },
                    ]"
                ></copyable-text>
            </div>
        </u-card>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field
                    label="Morphing gradient"
                    description="This gradient randomly animates its scale, border radius and adjusts its rotation based on the mouse interactions."
                ></u-form-field>
            </template>
            <div class="flex flex-col gap-2">
                <morphing-gradient class="opacity-100"></morphing-gradient>
            </div>
        </u-card>
    </div>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "@nuxt/ui";

const mounted = useMounted();
const animatedArrowProps = ref({ size: "md", variant: "solid" });
const items = ref(listGenerate(5, (i) => `Element ${i}`));

function addItem() {
    items.value.push(`Element ${items.value.length}`);
}
function removeItem(index: number) {
    items.value.splice(index, 1);
}
</script>

<style></style>
