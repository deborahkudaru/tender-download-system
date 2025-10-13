<script setup>
import { reactive, defineProps, onMounted } from 'vue';
import TenderCard from './TenderCard.vue';

defineProps({
    limit: {
        type: Number,
        default: null
    }
});

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
        const data = await response.json();
        state.tenders = data.tenders;
        console.log(state.tenders);
    } catch (err) {
        state.error = err.message;
        console.error('Error fetching tenders:', err);
    } finally {
        state.isLoading = false;
    }
});
</script>

<template>
 <div>
    <TenderCard v-for="tender in state.tenders.slice(0, limit || state.tenders.length)" :key="tender.id" :tender="tender" />
 </div>
</template>