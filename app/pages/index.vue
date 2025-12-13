<template>
    <div class="flex flex-col gap-8 items-stretch mt-4 w-full mx-auto">
        <u-form-field label="Integrations and packages" description="Here you find all the packages integrated into this template">
            <div class="flex items-stretch gap-2 w-full justify-start flex-wrap">
                <u-button to="/leaflet" variant="soft" label="Nuxt + Leaflet" icon="simple-icons:leaflet"></u-button>
                <u-button to="/charts" variant="soft" label="Nuxt + Echarts" icon="simple-icons:apacheecharts"></u-button>
                <u-button to="/motion" variant="soft" label="Nuxt + Motion" icon="tabler:brand-framer-motion"></u-button>
            </div>
        </u-form-field>
        <u-form-field label="Components & Systems" description="Here you find all implemented components and different systems">
            <div class="flex items-stretch gap-2 w-full justify-start flex-wrap">
                <u-button to="/modal" variant="soft" label="Nuxt + Modals" icon="material-symbols-light:select-window-2"></u-button>
                <u-button to="/components" variant="soft" label="Implemented UI components" icon="mynaui:click-solid"></u-button>
            </div>
        </u-form-field>

        <u-form-field label="Nuxt UI Pro Blog">
            <template #hint>
                <u-button variant="link" size="sm" class="group" to="https://nuxt.com/blog/nuxt-ui-v4" target="_blank">
                    Read the blog post
                    <animated-arrow></animated-arrow>
                </u-button>
            </template>
            <template #description>
                <p>Nuxt UI Pro has become 100% free! This blog is implemented using the new Nuxt UI components.</p>
            </template>
            <div class="flex items-stretch gap-2 w-full justify-start flex-wrap">
                <u-button to="/articles" variant="soft" label="Go to NuxtUI blog" icon="material-symbols-light:article-rounded"></u-button>
            </div>
        </u-form-field>
    </div>
</template>

<script lang="ts" setup>
const mounted = useMounted();
</script>

<style></style>
