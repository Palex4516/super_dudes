<script setup lang="ts">
import type Snackbar from '@/components/Snackbar.vue';
import router from '@/router/router';
import HeroDataService from '@/services/HeroDataService';
import Hero from '@/types/Hero';
import type ResponseData from '@/types/ResponseData';
import { Status } from '@/types/Status';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const str = ref("");
const hero: Ref<Hero> = ref(new Hero);
const newPower = ref("");
const editable = ref(false);
const props = defineProps<{
    snackRef: InstanceType<typeof Snackbar>
}>()

let id: number;

function getHero() {
    HeroDataService.get(id).then((response: ResponseData) => {
        str.value = response.data;
        hero.value = response.data;
    }).catch((e: Error) => {
        console.error(e.message);
        props.snackRef.showError(e.message);
    });
}
function update() {
    HeroDataService.update(id, hero.value).then((response: ResponseData) => {
        str.value = response.data;
        hero.value = response.data;
        props.snackRef.showMessage("Hero Updated");
        editable.value = false;
    }).catch((e: Error) => {
        console.error(e.message);
        props.snackRef.showError(e.message);
    });
}
function remove() {
    HeroDataService.delete(id).then(() => {
        props.snackRef.showMessage("Hero Deleted");
        router.push("/list");
    }).catch((e: Error) => {
        console.error(e.message);
        props.snackRef.showError(e.message);
    });
}
function addPower() {
    hero.value.powers.push(newPower.value);
    newPower.value = "";
}
function removePower(power: string) {
    let index = hero.value.powers.indexOf(power);
    hero.value.powers.splice(index, 1);
}
function cancel() {
    editable.value = false;
    getHero();
}
onBeforeMount(() => {
    id = parseInt(route.params.id as string);
    getHero();
});
</script>


<template>
    <div>
        <h1>Hero Details: {{ $route.params.id }} </h1>
        <div class="form-group">
            <label for="name">Name</label><br>
            <input type="text" name="name" id="name" v-model="hero.name" :disabled="!editable">
        </div>

        <div class="form-group">
            <label for="desc">Description</label><br>
            <textarea name="desc" id="desc" v-model="hero.desc" :disabled="!editable"></textarea>
        </div>

        <div class="form-group">
            Powers:
            <ul>
                <li v-for="power in hero.powers">
                    {{ power }} <span v-if="editable" @click="removePower(power)">X</span>
                </li>
                <label v-if="hero.powers.length == 0">- No Powers -</label>
            </ul>
            <label for="powers">Add Power</label><br>
            <input type="text" name="powers" id="powers" v-model="newPower" :disabled="!editable">
            <button @click="addPower()" :disabled="!editable">Add</button>
        </div>

        <div class="form-group">
            <label for="status">Status</label><br>
            <select name="status" id="status" v-model="hero.status" :disabled="!editable">
                <option v-for="key in Status">{{ key.toString() }}</option>
            </select>
        </div>

        <button v-if="!editable" class="btn btn-primary" @click="editable = true">Edit</button>

        <div v-if="editable">
            <button class="btn btn-primary" @click="cancel()">Cancel</button>
            <button class="btn btn-success" @click="update()">Update</button>
            <button class="btn btn-danger" @click="remove()">Delete</button>
        </div>

        <pre>{{ str }}</pre>
    </div>
</template>


<style scoped>
pre {
    color: red;
}

.form-group {
    padding-bottom: 15px;
}

span {
    margin-left: 5px;
    cursor: pointer;
    font-weight: bold;
    /* font-size: large; */
}

span:hover {
    color: red;
}
</style>