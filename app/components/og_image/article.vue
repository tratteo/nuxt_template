<template>
    <div class="relative h-full w-full flex flex-row items-start gap-4 bg-slate-900 text-white">
        <div class="w-[60%] h-full">
            <div class="p-12 flex flex-col items-stretch h-full justify-start gap-10">
                <div class="flex flex-row items-center gap-2">
                    <!-- <img :src="appMeta.icon" width="64" height="64" alt="" /> -->
                    <h1 class="text-3xl font-bold text-left m-0 text-[#00dc82]">{{ appMeta.name }}</h1>
                </div>
                <div class="flex-1 flex flex-col gap-4 justify-between">
                    <p class="text-5xl font-bold">{{ title }}</p>
                    <div v-if="author" class="flex flex-row items-center justify-start gap-3">
                        <img class="rounded-full" :src="author.image" width="100" height="100" alt="" />
                        <p class="font-bold text-2xl opacity-75">{{ author.name }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[40%] flex flex-col items-center justify-center h-full">
            <div class="flex h-[80%] w-full border-2 border-white/20 rounded-l-2rem overflow-hidden pl-12 py-12 relative">
                <div class="absolute right-0 top-0 bottom-0 left-0">
                    <!-- <img src="/assets/articles/hero_1.jpeg" class="w-full h-full object-cover" /> -->
                </div>
                <img :src="thumbnail" class="w-full h-full object-cover rounded-l-2rem" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import appMeta from "~/app.meta";
defineProps<{
    title?: string;
    thumbnail?: string | undefined;
    author?:
        | {
              image: string;
              name: string;
          }
        | undefined;
}>();
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
</style>
