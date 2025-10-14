<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="flex justify-between py-2">
        <div>
            <RouterLink to="/">
            TDS
            </RouterLink>
        </div>
        <ul class="flex space-x-4">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/tenders">Tenders</RouterLink>
            </li>

        </ul>
    </nav>
</template>
