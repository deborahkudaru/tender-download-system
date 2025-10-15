<script setup>

defineProps({
  tender: {
    type: Object,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="flex justify-between items-start p-6 border-b border-gray-200">
        <div class="flex-1">
          <h2 class="text-xl font-bold text-gray-900 mb-2">{{ tender.title }}</h2>
          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <span class="bg-blue-50 px-2 py-1 rounded-xl">
              Budget: {{ tender.budget || 'N/A' }}
            </span>
            <span class="bg-red-50 px-2 py-1 rounded-xl">
              Deadline: {{ new Date(tender.deadline).toLocaleDateString() }}
            </span>
          </div>
        </div>
        <button @click="closeModal" class="ml-4 text-gray-400 hover:text-gray-600 transition-colors">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Description</h3>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ tender.description || 'No description provided.' }}
          </p>
        </div>

        <div v-if="tender?.tags?.length" class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in tender.tags" :key="tag"
              class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>