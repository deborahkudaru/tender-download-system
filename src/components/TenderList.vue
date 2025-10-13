<script setup>
import { reactive, defineProps, onMounted } from 'vue';
import TenderCard from './TenderCard.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

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
        <div class="text-center text-gray-500 py-6">
            <PulseLoader v-if="state.isLoading" :loading="state.isLoading" color="#000" size="15px" />
            <div v-if="state.error" class="error">{{ state.error }}</div>
            <div v-if="!state.isLoading && state.tenders.length === 0">No tenders available.</div>
        </div>
        <TenderCard v-for="tender in state.tenders.slice(0, limit || state.tenders.length)" :key="tender.id"
            :tender="tender" />
    </div>
</template>