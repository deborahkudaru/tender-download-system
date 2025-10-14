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

function goToSignUp() {
  router.push({ name: 'signup' });
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm mt-2">
        <i class="pi pi-check-circle"></i>
        Trusted Procurement Platform
      </div>

      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
        <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
          {{ title }}
        </span>
      </h1>

      <p class="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        {{ subtitle }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button @click="goToSignUp"
          class="group relative px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden">
          <span class="relative z-10 flex items-center gap-2">
            Get Started
            <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>