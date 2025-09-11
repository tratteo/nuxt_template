<template>
    <div class="flex justify-between gap-4 w-full items-stretch flex-wrap">
        <u-form-field>
            <template #label> Here you find all the various implemented components. </template>
            <template #description>You can check the different sections to go directly to the corresponding video.</template>
        </u-form-field>
        <u-separator></u-separator>
        <u-card variant="subtle" class="w-full">
            <template #header>
                <u-form-field label="Reordable list" description="Move the elements dragging them from the handle and check how the underlying list updates"></u-form-field>
            </template>
            <ReordableList :items="items">
                <template #item="{ item, index }">
                    <div class="bg-muted w-full rounded-md p-2 flex items-center">
                        {{ item.payload }}
                        <u-button color="error" variant="ghost" icon="material-symbols:delete-rounded" size="sm" class="ml-auto" @click="() => removeItem(index)"></u-button>
                    </div>
                </template>
            </ReordableList>
            <u-button label="Add" icon="material-symbols:add-rounded" variant="soft" class="w-fit ml-auto" @click="addItem"></u-button>
            <pre><code class="text-sm">{{ items }}</code></pre>
        </u-card>
    </div>
</template>

<script lang="ts" setup>
const items = ref(listGenerate(5, (i) => `Element ${i}`));
function addItem() {
    items.value.push(`Element ${items.value.length}`);
}
function removeItem(index: number) {
    items.value.splice(index, 1);
}
</script>

<style></style>
