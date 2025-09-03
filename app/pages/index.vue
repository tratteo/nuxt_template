<template>
    <div class="flex flex-col gap-8 items-stretch mt-4 max-w-2xl w-full mx-auto">
        <u-form-field label="Integrations and packages" description="Here you find all the packages integrated into this template">
            <div class="flex items-stretch gap-2 w-full justify-start flex-wrap">
                <u-button to="/leaflet" variant="soft" label="Nuxt + Leaflet" icon="simple-icons:leaflet"></u-button>
                <u-button to="/chartjs" variant="soft" label="Nuxt + Chartjs" icon="file-icons:chartjs"></u-button>
                <u-button to="/motion" variant="soft" label="Nuxt + Motion" icon="tabler:brand-framer-motion"></u-button>
            </div>
        </u-form-field>
        <u-form-field label="Components" description="Here you find all implemented components">
            <div class="flex items-stretch gap-2 w-full justify-start flex-wrap">
                <u-button to="/modal" variant="soft" label="Nuxt + Modals" icon="material-symbols-light:select-window-2"></u-button>
            </div>
        </u-form-field>
        <u-form-field label="Blog" description="Your blog, already implemented!">
            <div class="flex items-stretch gap-2 w-full justify-start flex-wrap">
                <u-button to="/articles" variant="soft" label="Go to blog" icon="material-symbols-light:article-rounded"></u-button>
            </div>
        </u-form-field>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
