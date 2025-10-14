<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])
const searchQuery = ref('')

// emit search text when user types
watch(searchQuery, (val) => {
    emit('search', val)
})
</script>

<template>
    <div class="w-full mb-8">
        <div class="relative max-w-2xl mx-auto">
            <input v-model="searchQuery" type="text" placeholder="Search tenders by title, description, or tags..."
                class="w-full px-5 py-4 pl-12 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" />
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <i class="pi pi-search text-gray-400"></i>
            </div>
        </div>
    </div>
</template>