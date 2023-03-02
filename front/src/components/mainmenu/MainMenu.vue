<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a
                                v-for="item in navigation"
                                :key="item.name"
                                :href="item.href"
                                :class="[
                                    item.href === currentUrl
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium',
                                ]"
                                :aria-current="item.href === currentUrl"
                            >
                                {{ item.name }}
                            </a>
                        </div>

                        <PartComboBox :items="parts" v-if='showParts' class="fixed top-2 w-72 right-2" />

                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <DisclosureButton
                        v-for="item in navigation"
                        :key="item.name"
                        as="a"
                        :href="item.href"
                        :class="[
                            item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium',
                        ]"
                        :aria-current="item.href === currentUrl"
                        >{{ item.name }}</DisclosureButton
                    >
                </div>
            </DisclosurePanel>
        </Disclosure>
    </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PartComboBox from '@/components/mainmenu/partcombobox/PartComboBox.vue';
import PartApi from '@/api/PartApi';

const route = useRoute();

const parts = ref([]);
const showParts = ref(false);

const navigation = [
    { name: 'ПКИ', href: 'pki' },
    { name: 'АПКЗИ', href: 'apkzi' },
    { name: 'СБ', href: 'systemCases' },
    { name: 'ПЭВМ', href: 'pc' },
];
const currentUrl = computed(() => {
    return route.name;
});

onMounted(() => {
    loadParts();
});

async function loadParts() {
    parts.value = await PartApi.getParts();
    showParts.value = true
}
</script>
