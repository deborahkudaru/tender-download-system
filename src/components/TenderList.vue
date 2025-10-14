<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import TenderCard from './TenderCard.vue'
import TenderModal from './TenderModal.vue' // Import the modal
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
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Modal state
const selectedTender = ref(null)
const showModal = ref(false)

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

// Handle show details from TenderCard
const handleShowDetails = (tender) => {
    selectedTender.value = tender
    showModal.value = true
}

// Handle modal close
const handleCloseModal = () => {
    showModal.value = false
    selectedTender.value = null
}

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

// computed paginated tenders
const paginatedTenders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredTenders.value.slice(start, end)
})

// computed total pages
const totalPages = computed(() => {
    return Math.ceil(filteredTenders.value.length / itemsPerPage.value)
})

// computed page numbers to display
const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        pages.push(1)

        if (current > 3) {
            pages.push('...')
        }

        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
            pages.push(i)
        }

        if (current < total - 2) {
            pages.push('...')
        }

        pages.push(total)
    }

    return pages
})


// search handler
const handleSearch = (query) => {
    searchQuery.value = query
    currentPage.value = 1
}

// pagination handler
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}
</script>

<template>
    <div class="px-6 pt-10">
        <div>
            <h2 class="text-2xl font-bold mb-4">Available Tenders</h2>
        </div>
        <SearchBar @search="handleSearch" />

        <!-- Tender count -->
        <div v-if="searchQuery.trim()" class="flex justify-between items-center px-4 py-2 text-gray-600">
            <p>
                Found
                <span class="font-semibold text-gray-900">{{ filteredTenders.length }}</span>
                tender<span v-if="filteredTenders.length !== 1">s</span>
            </p>
            <p class="text-sm italic text-gray-400">
                showing results for "{{ searchQuery }}"
            </p>
        </div>

        <div class="text-center text-gray-500 py-6">
            <PulseLoader v-if="state.isLoading" :loading="state.isLoading" color="#000" size="15px" />
            <div v-if="state.error" class="error">{{ state.error }}</div>
            <div v-if="!state.isLoading && filteredTenders.length === 0">No tenders found.</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TenderCard v-for="tender in paginatedTenders" :key="tender.id" :tender="tender"
                @show-details="handleShowDetails" />
        </div>

        <!-- Pagination Controls -->
        <div v-if="!state.isLoading && filteredTenders.length > 0"
            class="flex justify-center items-center gap-2 mt-8 mb-6">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors',
                currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            ]">
                <i class="pi pi-chevron-left"></i>
            </button>

            <template v-for="page in visiblePages" :key="page">
                <button v-if="page !== '...'" @click="goToPage(page)" :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                ]">
                    {{ page }}
                </button>
                <span v-else class="px-2 text-gray-500">...</span>
            </template>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors',
                currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            ]">
                <i class="pi pi-chevron-right"></i>
            </button>
        </div>

        <div v-if="!state.isLoading && filteredTenders.length > 0" class="text-center text-sm text-gray-600 mb-6">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} -
            {{ Math.min(currentPage * itemsPerPage, filteredTenders.length) }}
            of {{ filteredTenders.length }} tenders
        </div>

        <!-- Tender Modal -->
        <TenderModal :tender="selectedTender" :show="showModal" @close="handleCloseModal" />
    </div>
</template>