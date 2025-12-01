<template>
    <u-app>
        <u-header mode="slideover">
            <template #left>
                <u-user name="Nuxt template" to="/" :avatar="{ src: 'https://tratteo.it/favicon.svg' }"></u-user>
            </template>
            <template #right>
                <color-mode-button></color-mode-button>
            </template>
            <u-navigation-menu :items="navItems"></u-navigation-menu>
            <template #body>
                <u-navigation-menu :items="navItems"></u-navigation-menu>
            </template>
        </u-header>
        <u-main>
            <u-container>
                <nuxt-page></nuxt-page>
            </u-container>
        </u-main>
        <u-footer class="border-t border-t-default">
            <template #bottom>
                <u-container>
                    <u-footer-columns></u-footer-columns>
                </u-container>
            </template>
            <template #left>
                <div class="flex flex-col items-stretch gap-4">
                    <u-user name="Created by Matteo Beltrame" :avatar="{ src: 'https://tratteo.it/favicon.svg' }"></u-user>
                    <copyable-text class="h-8 text-nowrap" :content="appMeta.author.email"></copyable-text>
                </div>
            </template>
        </u-footer>
    </u-app>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import appMeta from "~/app.meta";

const navItems: NavigationMenuItem[] = [
    { label: "YouTube channel", icon: "logos:youtube-icon", target: "_blank", to: "https://www.youtube.com/@matteo-beltrame" },
    { label: "Repository", icon: "mdi:github", target: "_blank", to: "https://github.com/tratteo/nuxt_template" },
];
</script>

<style></style>
