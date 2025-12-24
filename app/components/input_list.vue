<template>
    <div v-if="model" class="flex flex-col items-stretch w-full gap-1">
        <u-form-field v-for="(item, index) in model" class="w-full" :name="`${name}.${index}`">
            <u-field-group class="w-full">
                <u-input
                    @update:model-value="(v) => model?.splice(index, 1, v)"
                    :model-value="item"
                    color="neutral"
                    variant="outline"
                    class="w-full"
                    required
                    :placeholder="placeholder"
                >
                </u-input>
                <u-button variant="subtle" color="neutral" type="button" @click="() => removeLink(index)" icon="material-symbols:delete-outline-rounded"></u-button>
            </u-field-group>
        </u-form-field>
        <div class="flex items-center gap-2 w-full">
            <u-button
                type="button"
                v-if="model.length < max"
                icon="material-symbols:add-rounded"
                class="w-fit"
                variant="subtle"
                size="sm"
                color="neutral"
                @click="addNew"
            ></u-button>
            <p v-if="max" class="typ-sublabel ml-auto">{{ model.length }}/{{ max }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const model = defineModel<string[] | null | undefined>();
const props = withDefaults(defineProps<{ max?: number; name?: string; placeholder?: string }>(), { max: 10 });

onMounted(() => {
    model.value ??= [];
});

function removeLink(index: number) {
    model.value?.splice(index, 1);
}

function addNew() {
    model.value?.push("");
}
</script>

<style></style>
