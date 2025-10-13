<script setup>
import { ref } from 'vue'
import RouterLink from 'vue-router'


</script>

<template>
    <nav>
        <div>
            TDS
        </div>
        <ul>
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/about">About</RouterLink>
            </li>
            <li>
                <RouterLink to="/contact">Tender</RouterLink>
            </li>
        </ul>
    </nav>
</template>


