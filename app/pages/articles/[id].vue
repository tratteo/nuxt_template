<template>
    <article v-if="data" class="relative mx-auto flex flex-col items-stretch mt-4 mb-16 gap-6 md:gap-12 max-w-5xl self-center">
        <header clas="flex flex-col">
            <u-card class="relative shadow-xl overflow-hidden min-h-[20rem] flex flex-col" variant="subtle" :ui="{ body: 'flex flex-col flex-1' }">
                <img class="z-[0] absolute inset-0 object-cover opacity-25 w-full h-full" :src="data?.thumbnail" :alt="data?.title" />
                <div class="z-[1] flex-1 flex flex-col gap-2">
                    <h1 class="typ-subtitle">{{ data?.title }}</h1>
                    <p class="hidden md:block text-sm md:text-base">{{ data?.description }}</p>
                    <div class="flex-1 flex flex-wrap flex-row items-end justify-between gap-2">
                        <div class="gap-4 flex flex-col items-start">
                            <div class="flex flex-row items-center gap-4">
                                <u-avatar :src="data.author_avatar" alt="article author avatar" icon="material-symbols:person-rounded" size="3xl"></u-avatar>
                                <div class="flex flex-col items-start">
                                    <p class="font-bold">{{ data.author }}</p>
                                    <p v-if="data.author_description" class="typ-label">{{ data.author_description }}</p>
                                    <u-link v-if="authorEl" @click="() => authorEl?.scrollIntoView()" color="neutral" class="text-sm">About the author</u-link>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 items-center flex-wrap">
                                <u-badge v-for="k in data?.tags" color="primary" variant="soft">{{ k }}</u-badge>
                            </div>
                        </div>
                        <div class="flex flex-row items-center gap-4">
                            <p class="flex flex-row items-center gap-1 typ-label">
                                <icon name="material-symbols:calendar-today-rounded" class="text-primary"></icon> {{ dayjs(data?.date).format("DD MMM YYYY") }}
                            </p>
                            <p class="flex flex-row items-center gap-1 typ-label"><icon name="material-symbols:alarm-rounded" class="text-primary"></icon> {{ readingTimeText }}</p>
                        </div>
                    </div>
                </div>
            </u-card>
        </header>
        <div ref="articleEl" class="relative w-full flex flex-row items-start gap-4">
            <ContentRenderer id="content" :value="data" class="markdown-content flex-1" />
            <ArticleMenu v-if="data?.body?.toc" :toc="data?.body.toc" :links="cast<ArticlesCollectionItem[]>(links)" />
        </div>
    </article>
</template>

<script lang="ts" setup>
import type { ArticlesCollectionItem } from "@nuxt/content";
import dayjs from "dayjs";
import l from "lodash";
import appMeta from "~/app.meta";

const { path } = useRoute();
const { data } = await useAsyncData(path, () => queryCollection("articles").path(path).first());
const { data: links } = await useAsyncData(`linked-${path}`, async () => {
    const res = await queryCollection("articles").where("path", "NOT LIKE", data.value?.path).all();
    return l.orderBy(res, (a) => l.intersection(a.tags, data.value?.tags).length, "desc").slice(0, 5);
});

updateMeta();

function updateMeta() {
    useSchemaOrg([
        defineArticle({
            headline: data.value?.title,
            description: data.value?.description,
            image: data.value?.thumbnail,
            datePublished: dayjs(data.value?.date, "YYYY-MM-DD").toDate().toString(),
            keywords: data.value?.tags,
            author: {
                name: data.value?.author,
                description: data.value?.author_description,
                image: data.value?.author_avatar,
            },
            publisher: definePerson({
                name: appMeta.author.name,
                description: appMeta.author.description,
                image: appMeta.author.image,
                url: appMeta.author.url,
            }),
        }),
    ]);

    useSeoMeta({
        title: data.value?.title,
        description: data.value?.description,
    });

    defineOgImageComponent("Article", {
        thumbnail: data.value?.thumbnail,
        title: data.value?.title,
        author: {
            name: data.value?.author,
            image: data.value?.author_avatar,
        },
    });
}

const authorEl = ref<HTMLElement | null>();
const readingTimeText = computed(() => (data.value?.meta as any).readingTime?.text);

onMounted(() => {
    const contentEl = document.getElementById("content");
    authorEl.value = contentEl?.querySelector("#author-about");
});
</script>

<style lang="css">
@reference "~/assets/css/main.css";
* {
    @apply scroll-mt-[4rem]! md:scroll-mt-[1rem]!;
}
</style>
