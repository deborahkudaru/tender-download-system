<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
    <nav class="flex justify-between py-4 px-6 shadow-md items-center relative">
        <div class="font-bold text-xl">
            <RouterLink to="/" @click="closeMobileMenu">
                TDS
            </RouterLink>
        </div>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex space-x-6 text-lg">
            <li>
                <RouterLink to="/" class="flex items-center hover:text-blue-600 transition-colors">
                    Home
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/tenders" class="flex items-center hover:text-blue-600 transition-colors">
                    Tenders
                </RouterLink>
            </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button 
            @click="toggleMobileMenu"
            class="md:hidden text-2xl focus:outline-none"
            aria-label="Toggle menu"
        >
            <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>

        <!-- Mobile Menu -->
        <div 
            v-if="isMobileMenuOpen"
            class="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50"
        >
            <ul class="flex flex-col py-4">
                <li class="">
                    <RouterLink 
                        to="/" 
                        @click="closeMobileMenu"
                        class="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors"
                    >
                        Home
                    </RouterLink>
                </li>
                <li>
                    <RouterLink 
                        to="/tenders" 
                        @click="closeMobileMenu"
                        class="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors"
                    >
                        Tenders
                    </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>