<script setup>
import { reactive, defineProps, onMounted } from 'vue';

const state = reactive({
    tenders: [],
    isLoading: true,
    error: null,
});

onMounted(async () => {
    try {
        const response = await fetch('/tender.json');
        if (!response.ok) {
            throw new Error('Failed to fetch tenders');
        }
        state.tenders = await response.json();
        console.log(state.tenders);
    } catch (err) {
        state.error = err.message;
    } finally {
        state.isLoading = false;
    }
});
</script>

<template>
 
</template>