<template>
    <div class="w-full sticky top-0 z-[50000] flex justify-center transition bg-default/50 backdrop-blur-2xl h-[var(--headline-height)] border border-default">
        <div class="max-w-[var(--content-width)] w-full flex items-center gap-2 py-4 px-4">
            <button class="flex flex-row items-center gap-2 font-semibold" @click="homeClicked">
                <u-avatar src="/assets/avatars/trat.jpg" size="xl"></u-avatar>
                <p class="text-highlighted text-nowrap">{{ appMeta.name }}</p>
            </button>
            <div class="w-full hidden md:flex items-center gap-2">
                <u-navigation-menu class="w-full justify-center" :items="navItems" :ui="{ viewport: 'max-w-[32rem]', link: 'text-toned' }"></u-navigation-menu>
                <div class="flex items-center gap-4">
                    <u-button to="https://www.youtube.com/@matteo-beltrame" icon="logos:youtube-icon" variant="link" target="_blank" color="error" label="Go to YouTube"></u-button>
                    <ColorModeButton></ColorModeButton>
                    <!-- <LocaleSelect></LocaleSelect> -->
                </div>
            </div>
            <div class="md:hidden flex ml-auto">
                <u-slideover class="" :ui="{ content: 'w-fit min-w-[16rem]' }">
                    <u-button icon="material-symbols:menu-rounded" color="neutral" variant="soft"></u-button>
                    <template #body>
                        <div class="flex flex-col items-stretch gap-4">
                            <u-navigation-menu class="w-full" orientation="vertical" :items="navItems"></u-navigation-menu>
                            <u-button
                                to="https://www.youtube.com/@matteo-beltrame"
                                icon="logos:youtube-icon"
                                variant="link"
                                target="_blank"
                                color="error"
                                label="Go to YouTube"
                                class="justify-center"
                            ></u-button>
                            <ColorModeButton class="mx-auto"> </ColorModeButton>
                        </div>
                    </template>
                </u-slideover>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { NavigationMenuChildItem, NavigationMenuItem } from "@nuxt/ui";
import appMeta from "~/app.meta";

interface NavigationSection {
    id: string;
    name: string;
    subsections: NavigationSection[];
}
const navItems = ref<NavigationMenuItem[]>([]);
const route = toRef(useRoute());
const scroll = useWindowScroll();
const transparentBar = ref(true);

watch(
    () => route.value.path,
    async () => {
        buildSectionElements();
        updateBarTransparency();
    }
);
watch(scroll.y, () => {
    updateBarTransparency();
});
onMounted(() => {
    buildSectionElements();
});

function updateBarTransparency() {
    const progress = scroll.y.value / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    transparentBar.value = isNaN(progress) || progress <= 0;
}
function homeClicked(ev: Event) {
    if (route.value.path.startsWith("/beauty")) {
        document.documentElement.scrollTo({ top: 0 });
    } else if (route.value.path !== "/") {
        navigateTo("/");
    } else {
        document.documentElement.scrollTo({ top: 0 });
    }
}
async function buildSectionElements() {
    if (!["/"].includes(route.value.path)) {
        navItems.value = [];
        return;
    }
    await nextTick();
    const sectionsElements = Array.from(document.querySelectorAll("section[navigation]:not(section[navigation] section[navigation])"));
    const newSec: NavigationSection[] = [];
    const newIts: NavigationMenuItem[] = [];
    console.log(sectionsElements);
    for (const sec of sectionsElements) {
        const s = sec.querySelectorAll("section");
        var obj = <NavigationSection>{ id: sec.id, name: sec.getAttribute("name"), subsections: Array.from(s).map((s) => ({ id: s.id, name: s.getAttribute("name") })) };
        newSec.push(obj);
        newIts.push({
            label: obj.name,
            icon: sec.getAttribute("icon") ?? undefined,
            onSelect: (e: Event) => focusNavigationSection(sec.id),
            children: Array.from(s).map(
                (s) =>
                    <NavigationMenuChildItem>{
                        label: s.getAttribute("name"),
                        icon: s.getAttribute("icon") ?? undefined,
                        onSelect: (e: Event) => focusNavigationSection(s.id),
                    }
            ),
        });
    }
    navItems.value = newIts;
}
async function logOut() {}

function focusNavigationSection(id: string | undefined) {
    const el = document.querySelector(`section#${id}[navigation]`);
    el?.scrollIntoView();
}

onMounted(() => {
    window.addEventListener("click", function (e) {
        document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
            if (!dropdown.contains(e.target as HTMLElement)) {
                dropdown.removeAttribute("open");
            }
        });
    });
});
</script>

<style lang="css" scoped></style>
