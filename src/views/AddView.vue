<script setup lang="ts">
import type Snackbar from "@/components/Snackbar.vue";
import type ResponseData from "@/types/ResponseData";
import { Status } from "@/types/Status";
import { ref, type Ref } from "vue";
import HeroDataService from "../services/HeroDataService";
import Hero from "../types/Hero";


const newHero: Ref<Hero> = ref(new Hero);
const newPower = ref("");
const returnData = ref("");

const props = defineProps<{
    snackRef: InstanceType<typeof Snackbar>
}>()

let keys = Status

function addHero() {
    HeroDataService.create(newHero.value).then((response: ResponseData) => {
        console.log(response.status);
        console.log(response.data);
        returnData.value = response.data;
        props.snackRef.showMessage("New Hero Added");
        newHero.value = new Hero();
    }).catch((e: Error) => {
        console.log(e);
        props.snackRef.showError(e.message);
    });
}
function addPower() {
    newHero.value.powers.push(newPower.value);
    newPower.value = "";
}
function removePower(power: string) {
    let index = newHero.value.powers.indexOf(power);
    newHero.value.powers.splice(index, 1);
}
</script>

<template>
    <div class="container">
        <h1>Add A New Hero</h1>

        <div class="form-group">
            <label for="name">Name</label><br>
            <input type="text" name="name" id="name" v-model="newHero.name">
        </div>

        <div class="form-group">
            <label for="desc">Description</label><br>
            <textarea name="desc" id="desc" v-model="newHero.desc"></textarea>
        </div>
        <div class="form-group">
            Powers:
            <ul>
                <li v-for="power in newHero.powers">{{ power }} <span @click="removePower(power)">X</span> </li>
                <label v-if="newHero.powers.length == 0">- No Powers -</label>
            </ul>
            <label for="powers">Add Power</label><br>
            <input type="text" name="powers" id="powers" v-model="newPower">
            <button @click="addPower()">Add</button>
        </div>


        <div class="form-group">
            <label for="status">Status</label><br>
            <select name="status" id="status" v-model="newHero.status">
                <option v-for="key in keys">{{ key.toString() }}</option>
            </select>
        </div>

        <button @click="addHero()" class="btn btn-success">Submit</button>

        <pre>{{ newHero }}</pre>

    </div>
</template>

<style scoped>
pre {
    color: red;
}

/* .container {
    max-width: 300px;
    margin: auto;
} */

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