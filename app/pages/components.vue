<template>
    <div class="flex justify-between gap-4 w-full items-stretch flex-wrap">
        <u-form-field>
            <template #label> Here you find all the various implemented components. </template>
            <template #description>You can check the different sections to go directly to the corresponding video.</template>
        </u-form-field>
        <u-separator></u-separator>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Reordable elements" description="Move the elements dragging them from the handle and check how the underlying list updates"></u-form-field>
            </template>
            <AnimatedHeight>
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
            </AnimatedHeight>
            <u-button label="Add" icon="material-symbols:add-rounded" variant="soft" class="w-fit ml-auto" @click="addItem"></u-button>
            <pre><code class="text-sm">{{ items }}</code></pre>
        </u-card>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Sticky element" description="Hover any of the following elements and they will stick to your mouse, very cool microinteraction"></u-form-field>
            </template>
            <div class="flex w-full justify-center">
                <StickyElement v-if="mounted">
                    <div class="bg-primary rounded-full aspect-square p-4 flex items-center justify-center text-inverted font-semibold">Hover me!</div>
                </StickyElement>
            </div>
        </u-card>
    </div>
</template>

<script lang="ts" setup>
const mounted = useMounted();
const items = ref(listGenerate(5, (i) => `Element ${i}`));

function addItem() {
    items.value.push(`Element ${items.value.length}`);
}
function removeItem(index: number) {
    items.value.splice(index, 1);
}
</script>

<style></style>
