<template>
    <div class="flex justify-center w-full">
        <div class="flex flex-col gap-6 items-start w-full">
            <div class="flex justify-between gap-4 w-full items-center flex-wrap">
                <u-form-field>
                    <template #label> A complete, responsive, aesthetic and SEO optimized Blog. </template>
                    <template #description>
                        <p>
                            In this series of tutorials, we implemented a blog from scratch. We added cool features such as responsive Table of Content with microinteractions and
                            made the blog SEO ready. <br />
                        </p>
                    </template>
                </u-form-field>
                <u-button
                    label="Check out the playlist"
                    icon="logos:youtube-icon"
                    color="neutral"
                    to="https://www.youtube.com/playlist?list=PLy6JsnZbXr8wztuwuDfNZmfKziSDVy9CM"
                    target="_blank"
                ></u-button>
            </div>
            <u-separator></u-separator>
            <u-field-group class="w-full">
                <u-input type="text" placeholder="Search by title" class="w-full" v-model.trim="titleQuery"></u-input>
                <u-button icon="material-symbols:close-rounded" @click="(): any => (titleQuery = '')" color="neutral" variant="subtle"></u-button>
                <u-button icon="material-symbols:database-search-rounded" @click="modalEl?.open" color="neutral" variant="subtle"></u-button>
            </u-field-group>
            <section class="articles-grid">
                <ArticleCard v-for="article in filteredArticles" :article="article" class="aspect-2/1"> </ArticleCard>
            </section>
        </div>
        <Modal
            ref="modalEl"
            title="Advanced indexed search"
            description="You can search inside all the contents of the blog to find what you are looking for."
            :ui-box-variants="{ content: 'max-w-3xl' }"
        >
            <template #body>
                <u-input v-model="query" placeholder="Search anything!" class="w-full" />
                <ul class="h-[75svh] md:h-[25svh] overflow-y-auto">
                    <li v-for="link of result" :key="link.item.id" class="mt-2">
                        <u-button variant="ghost" color="neutral" class="w-full" :to="link.item.id">
                            <div class="flex flex-col w-full">
                                {{ link.item.title }}
                                <span class="typ-sublabel block w-full whitespace-nowrap overflow-hidden text-ellipsis"> {{ link.item.content }}... </span>
                            </div>
                        </u-button>
                    </li>
                </ul>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import Fuse from "fuse.js";
import type { ModalElement } from "~/components/modal.vue";

const { data: articles } = await useAsyncData("articles-home", () => queryCollection("articles").all());
const query = ref("");
const titleQuery = ref("");
const modalEl = useTemplateRef<ModalElement>("modalEl");

const { data } = await useAsyncData("search-data", () => queryCollectionSearchSections("articles"));

const fuse = new Fuse(data.value!, {
    keys: ["title", "description"],
});

const titleFuse = new Fuse(articles.value!, {
    keys: ["title"],
});

const filteredArticles = computed(() => {
    if (isNullOrEmpty(titleQuery.value)) return articles.value;
    const match = titleFuse.search(toValue(titleQuery));
    return match.map((m) => m.item);
});

const result = computed(() => fuse.search(toValue(query)).slice(0, 10));
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.articles-grid {
    grid-template-columns: repeat(auto-fit, minmax(100%, 0.5fr));
    gap: 1rem;
    @apply grid w-full;
}
@variant md {
    .articles-grid {
        grid-template-columns: repeat(auto-fit, minmax(22rem, 0.5fr));
    }
}
</style>
