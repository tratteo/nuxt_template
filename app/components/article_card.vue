<template>
    <NuxtLink v-bind:key="article.path" :to="`${article.path}`" class="relative group article-card">
        <p class="font-bold md:text-base text-sm text-highlighted">{{ article?.title }}</p>
        <div class="flex-1 justify-end flex flex-col items-stretch gap-2">
            <div class="flex flex-wrap flex-row items-end justify-between gap-2">
                <div class="card-actions gap-4 flex flex-col items-start">
                    <u-avatar :src="article?.author_avatar" alt="author avatar" size="xl"></u-avatar>
                </div>

                <div class="flex flex-row gap-2 items-center">
                    <u-badge v-for="k in article?.tags" color="primary" variant="soft" size="sm">{{ k }}</u-badge>
                </div>
            </div>
            <div class="flex flex-row items-center justify-end gap-2">
                <u-badge v-if="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7" label="New" color="success"></u-badge>
                <p class="text-xs flex-none opacity-75">{{ dayjs(article.date).format("DD MMM YYYY") }}</p>
            </div>
        </div>
        <img class="" :src="`${article.thumbnail}`" :alt="article.title" />
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { ArticlesCollectionItem } from "@nuxt/content";
import dayjs from "dayjs";

const props = defineProps<{ article: ArticlesCollectionItem }>();
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
.article-card {
    @apply rounded-lg border gap-4 border-default shadow-lg  w-full overflow-clip flex flex-col p-4;
    img {
        transform: translate(-50%, -50%) scale(1);
        @apply z-[-1] transition-all duration-[250ms] ease-out opacity-25 object-cover h-full w-full left-[50%] top-[50%] absolute;
        &:is(:where(.group):hover *) {
            @media (hover: hover) {
                transform: translate(-50%, -50%) scale(1.1);
            }
        }
    }
}
</style>
