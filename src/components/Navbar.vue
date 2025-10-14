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
    <nav class="bg-white border-b border-gray-200 relative z-50">
        <div class="flex justify-between py-5 px-6 items-center max-w-7xl mx-auto">
            <div class="font-bold text-2xl bg-blue-800 bg-clip-text text-transparent">
                <RouterLink to="/" @click="closeMobileMenu" class="hover:opacity-80 transition-opacity">
                    TDS
                </RouterLink>
            </div>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex space-x-8 text-base font-medium">
                <li>
                    <RouterLink to="/"
                        class="flex items-center hover:text-blue-600 transition-all duration-200 relative group py-2">
                        Home
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/tenders"
                        class="flex items-center hover:text-blue-600 transition-all duration-200 relative group py-2">
                        Tenders
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/signup"
                        class="flex items-center hover:text-blue-600 transition-all duration-200 relative group py-2">
                        Sign Up
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </RouterLink>
                </li>
            </ul>

            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu"
                class="md:hidden text-2xl focus:outline-none transition-transform duration-200 hover:scale-110 text-gray-700"
                aria-label="Toggle menu">
                <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
            </button>
        </div>

        <!-- Mobile Menu -->
        <Transition name="backdrop">
            <div v-if="isMobileMenuOpen" @click="closeMobileMenu"
                class="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"></div>
        </Transition>

        <Transition name="slide">
            <div v-if="isMobileMenuOpen"
                class="fixed top-[73px] right-0 w-64 h-[calc(100vh-73px)] bg-white shadow-2xl md:hidden z-50 overflow-y-auto">
                <ul class="flex flex-col py-6">
                    <li class="overflow-hidden">
                        <RouterLink to="/" @click="closeMobileMenu"
                            class="flex items-center px-6 py-4 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium relative group">
                            <span class="relative z-10">Home</span>
                            <span
                                class="absolute left-0 top-0 h-full w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                        </RouterLink>
                    </li>
                    <li class="overflow-hidden">
                        <RouterLink to="/tenders" @click="closeMobileMenu"
                            class="flex items-center px-6 py-4 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium relative group">
                            <span class="relative z-10">Tenders</span>
                            <span
                                class="absolute left-0 top-0 h-full w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </Transition>
    </nav>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
    transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.router-link-active {
    color: #2563eb;
}

.router-link-active .group span {
    width: 100%;
}
</style>