<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

defineProps({
  title: {
    type: String,
    default: 'Empowering Transparent Procurement.',
  },
  subtitle: {
    type: String,
    default: 'Browse hundreds of tender opportunities, get all the details you need, and download documents instantly.',
  },
});

function goToTenders() {
  router.push({ name: 'tenders' });
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <h1 class="text-3xl sm:text-5xl font-bold mb-4 text-center">{{ title }}</h1>
    <p class="text-lg sm:text-xl text-gray-600 mb-8 text-center">{{ subtitle }}</p>
    <button @click="goToTenders"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow">
      View Tenders
    </button>
  </div>
</template>