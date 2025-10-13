<script setup>
import { reactive, onMounted, ref, computed } from 'vue';
import TenderCard from './TenderCard.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
// import { RouterLink } from 'vue-router';
// import SearchBar from './SearchBar.vue';

defineProps({
    limit: {
        type: Number,
        default: null
    },
    // showButton: {
    //     type: Boolean,
    //     default: false
    // }
});

const state = reactive({
    tenders: [],
    isLoading: true,
    error: null,
});

// const searchQuery = ref('');

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
        <!-- <SearchBar /> -->
        <div class="text-center text-gray-500 py-6">
            <PulseLoader v-if="state.isLoading" :loading="state.isLoading" color="#000" size="15px" />
            <div v-if="state.error" class="error">{{ state.error }}</div>
            <div v-if="!state.isLoading && state.tenders.length === 0">No tenders available.</div>
        </div>
        <TenderCard v-for="tender in state.tenders.slice(0, limit || state.tenders.length)" :key="tender.id"
            :tender="tender" />
    </div>


</template>