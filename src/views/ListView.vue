<script setup lang="ts">
import TableComp from '@/components/TableComp.vue';
import router from '@/router/router';
import HeroDataService from '@/services/HeroDataService';
import type Hero from '@/types/Hero';
import type ResponseData from '@/types/ResponseData';
import { computed } from '@vue/reactivity';
import { onBeforeMount, ref, type Ref } from 'vue';

const heroList: Ref<Hero[]> = ref([]);
const filterStr = ref("");

const columns = ["id", "name", "desc", "powers", "status"];

const filteredList = computed(() =>
    heroList.value.filter((hero) => {
        return JSON.stringify(hero).toLowerCase().includes(filterStr.value.toLowerCase());
    })
);

function selectFunc(value: number) {
    router.push("/details/" + value);
}

onBeforeMount(() => {
    HeroDataService.getAll().then((response: ResponseData) => {
        if (response.data) {
            heroList.value = response.data;
        } else {
            heroList.value = [];
        }
    });
});
</script>

<template>
    <div>
        <h1>Hero List</h1>
        <label for="filter">Filter</label><br>
        <input type="text" v-model="filterStr">

        <TableComp :data="filteredList" :columns="columns" @select="selectFunc">
        </TableComp>
        <pre>{{ heroList }}</pre>

    </div>
</template>

<style scoped>
pre {
    color: red;
}
</style>