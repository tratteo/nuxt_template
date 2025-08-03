<template>
    <div class="w-full flex flex-col gap-4 items-center mt-4">
        <AsyncButton :promise="task">Execute Task</AsyncButton>
        <AnimatedHeight class="bg-primary/25 rounded-md">
            <div class="flex flex-col gap-2 items-center p-4">
                <div>Evvai Lorem ipsum</div>
                <div v-if="activated" class="w-full h-[16rem]"></div>
            </div>
        </AnimatedHeight>
    </div>
</template>

<script lang="ts" setup>
const activated = ref(false);
async function task() {
    activated.value = true;
    await sleep(1000);
    activated.value = false;
}
</script>

<style></style>
