<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'


</script>

<template>
    <nav class="flex justify-between py-2">
        <div>
            TDS
        </div>
        <ul>
            <li>
                <RouterLink to="/">Home</RouterLink>

            </li>
            <li>
                <RouterLink to="/tenders">Tenders</RouterLink>
            </li>

        </ul>
    </nav>
</template>
