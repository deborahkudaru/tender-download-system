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
  <div class="w-full flex justify-center mb-6">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search tenders by title, description, or tags..."
      class="w-full max-w-lg px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>
