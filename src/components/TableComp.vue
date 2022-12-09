<script setup lang="ts">
import type Hero from "@/types/Hero";
import { ref, computed } from "vue";

const props = defineProps<{
    data: any[] | undefined,
    columns: string[],
    selected?: object
}>()

const sortKey = ref("")
const sortDir = ref("asc")


const sortedData = computed(() => {
    let { data } = props
    const key = sortKey.value
    if (key && data) {
        data = data.slice().sort((a, b) => {
            a = a[key]
            b = b[key]
            if (a === b) {
                return 0
            } else if (sortDir.value === "asc") {
                return a > b ? 1 : -1
            } else {
                return a < b ? 1 : -1
            }
        })
    }
    return data
})

function format(input: string) {
    return input.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
}
function superFormat(item: any, key: string) {
    if (key == "powers") {
        let str: string = "";
        item.powers.forEach((power: string) => {
            str += power + ", ";
        });
        str = str.slice(0, str.length - 2);
        return str;
    } else {
        return item[key];
    }
}

function sortBy(key: string) {
    if (sortKey.value === key) {
        sortDir.value = sortDir.value === "asc" ? "dsc" : "asc"
    } else {
        sortKey.value = key
        sortDir.value = "asc"
    }
}
</script>


<template>
    <table>
        <caption>List of all Heroes</caption>
        <thead>
            <tr>
                <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
                    {{ format(key) }}
                    <span class="arrow" :class="sortDir"></span>
                </th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in sortedData" :class="{ selected: selected == item }">
                <td v-for="key in columns">
                    {{ superFormat(item, key) }}
                </td>
                <td><button @click="$emit('select', item.id)" class="btn btn-info">Select</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    user-select: none;
}

td {
    background-color: #f9f9f9;
}

th,
td {
    /* min-width: 120px; */
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.selected {
    color: #42b983;
}
</style>