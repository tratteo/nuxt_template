<template>
    <div class="w-full flex flex-col gap-4 items-center mt-4">
        <div class="flex justify-between gap-4 w-full items-center flex-wrap">
            <u-form-field>
                <template #label> Make your users addicted with Microinteractions using <u-link to="https://motion.dev/docs/vue" target="_blank">Motion</u-link>. </template>
                <template #description>
                    In this example we have multiple components. <br />
                    • The first is a button with microinteractions that responds to async tasks and can be used to give feedback to the user. <br />
                    • The second component can wrap any element and dynamically adjusts its height based on the status of the children. <br />
                    • The final one is a component that smoothly animates in children with some staggering, perfect for landing pages!
                </template>
            </u-form-field>
            <u-button label="Check out the video" icon="logos:youtube-icon" color="neutral" to="https://youtu.be/CIemLLeImjE" target="_blank"></u-button>
        </div>
        <u-separator></u-separator>
        <async-button :promise="task">Expand container</async-button>
        <animated-height class="w-full bg-muted max-w-2xl border border-default rounded-lg">
            <div class="w-full" :class="{ 'h-80': activated, 'h-16': !activated }"></div>
        </animated-height>
        <animate-enter v-for="i in 10" class="max-w-2xl">
            <u-card class="" variant="subtle">
                <template #header>
                    <motion.p :variants="item">Card {{ i }}</motion.p>
                </template>
                <template #default>
                    <div class="flex flex-col w-full items-stretch gap-2">
                        <motion.p :variants="item"
                            >Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                        </motion.p>
                        <motion.div :variants="item" class="bg-muted h-40 w-full rounded-md"></motion.div>
                    </div>
                </template>
            </u-card>
        </animate-enter>
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
