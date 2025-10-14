<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import TenderCard from './TenderCard.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import SearchBar from './SearchBar.vue'

defineProps({
    limit: {
        type: Number,
        default: null
    },
})

const state = reactive({
    tenders: [],
    isLoading: true,
    error: null,
})

const searchQuery = ref('')

// fetch tenders from dummy json file
onMounted(async () => {
    try {
        const response = await fetch('/tender.json')
        if (!response.ok) throw new Error('Failed to fetch tenders')
        const data = await response.json()
        state.tenders = data.tenders
    } catch (err) {
        state.error = err.message
        console.error('Error fetching tenders:', err)
    } finally {
        state.isLoading = false
    }
})

// computed filtered list
const filteredTenders = computed(() => {
    if (!searchQuery.value) return state.tenders
    const query = searchQuery.value.toLowerCase()
    return state.tenders.filter(
        (t) =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.tags.some((tag) => tag.toLowerCase().includes(query))
    )
})

const handleSearch = (query) => {
    searchQuery.value = query
}
</script>

<template>
    <div class="px-6">
        <div>
            <h2 class="text-2xl font-bold mb-4">Available Tenders</h2>
        </div>
        <SearchBar @search="handleSearch" />

        <div class="text-center text-gray-500 py-6">
            <PulseLoader v-if="state.isLoading" :loading="state.isLoading" color="#000" size="15px" />
            <div v-if="state.error" class="error">{{ state.error }}</div>
            <div v-if="!state.isLoading && filteredTenders.length === 0">No tenders found.</div>
        </div>

        <div class="grid grid-cols-3 gap-3">
            <TenderCard v-for="tender in filteredTenders.slice(0, limit || filteredTenders.length)" :key="tender.id"
                :tender="tender" />
        </div>
    </div>


</template>
