<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Snackbar from './components/Snackbar.vue';

const snackRef = ref<InstanceType<typeof Snackbar>>();
</script>

<template>
    <div id="app">
        <header>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <router-link to="/" class="navbar-brand">Super Hero Site</router-link>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/list" class="nav-link">Hero List</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/add" class="nav-link">Add Hero</router-link>
                    </li>
                </ul>
            </nav>
        </header>
        <main class="container mt-3">
            <router-view :snack-ref="snackRef" />

            <Snackbar ref="snackRef" />
        </main>
    </div>
</template>

<style scoped>
.navbar-brand {
    margin-left: 25px;
    /* line-height: 1.5; */
    /* max-height: 100vh; */
}
</style>
