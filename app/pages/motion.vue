<template>
    <div class="w-full flex flex-col gap-8 items-center mt-4">
        <AsyncButton :promise="task">Execute task</AsyncButton>
        <AnimatedHeight class="w-full max-w-xl bg-primary/15 rounded-lg">
            <div class="w-full" :class="{ 'h-[20rem]': activated, 'h-[4rem]': !activated }"></div>
        </AnimatedHeight>
        <u-separator></u-separator>
        <AnimateEnter v-for="i in 10" class="max-w-2xl">
            <u-card class="h-[40rem]" variant="subtle">
                <template #header>
                    <motion.p :variants="item">Card {{ i }}</motion.p>
                </template>
                <template #default>
                    <div class="flex flex-col w-full items-stretch gap-2">
                        <motion.p :variants="item"
                            >Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                        </motion.p>
                        <motion.div :variants="item"></motion.div>
                    </div>
                </template>
            </u-card>
        </AnimateEnter>
    </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";
const item = {
    hidden: { opacity: 0, transform: "translateX(-16px)" },
    show: { opacity: 1, transform: "translateX(0px)" },
    transition: { duration: 2, type: "spring", bounce: 0.25 },
};

const activated = ref(false);
async function task() {
    activated.value = true;
    await sleep(1000);
    activated.value = false;
}
</script>

<style></style>
