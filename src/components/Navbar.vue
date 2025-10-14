<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="flex justify-between py-4 px-6 shadow-md items-center">
        <div class="font-bold text-xl">
            <RouterLink to="/">
                TDS
            </RouterLink>
        </div>
        <ul class="flex space-x-4  text-lg ">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/tenders">Tenders</RouterLink>
            </li>

        </ul>
    </nav>
</template>
