<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'


const router = useRouter()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

const auth = useAuthStore()

const isLoggedIn = computed(() => auth.isAuthenticated)

const handleLogout = () => {
    auth.logout()
    closeMobileMenu()
    router.push({ name: 'login' })

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
            <!-- Desktop Menu -->
            <ul class="hidden md:flex space-x-8 text-base font-medium">
                <!-- Show Sign Up only when not logged in -->
                <li v-if="!isLoggedIn">
                    <RouterLink to="/signup"
                        class="flex items-center hover:text-blue-600 transition-all duration-200 relative group py-2">
                        Sign Up
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </RouterLink>
                </li>

                <!-- Show Logout when logged in -->
                <li v-if="isLoggedIn">
                    <button @click="handleLogout"
                        class="flex items-center text-red-600 hover:text-red-700 transition-all duration-200 relative group py-2">
                        Logout
                    </button>
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
                    <li v-if="!isLoggedIn" class="overflow-hidden">
                        <RouterLink to="/signup" @click="closeMobileMenu"
                            class="flex items-center px-6 py-4 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium relative group">
                            <span class="relative z-10">Sign Up</span>
                            <span
                                class="absolute left-0 top-0 h-full w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                        </RouterLink>
                    </li>

                    <li v-if="isLoggedIn" class="overflow-hidden">
                        <button @click="handleLogout"
                            class="flex items-center px-6 py-4 hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200 font-medium relative group w-full text-left">
                            <span class="relative z-10">Logout</span>
                        </button>
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