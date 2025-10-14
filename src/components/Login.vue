<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const toast = useToast();

const handleLogin = () => {
    if (!username.value || !password.value) {
        toast.error('Please enter both username and password')
    } else {
        if (auth.login(username.value, password.value)) {
            toast.success('Login successful!')
            router.push('/tenders')
        } else {
            toast.error('Invalid credentials')
        }
    }

}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-8 w-96">
            <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
            <input v-model="username" placeholder="Username" class="w-full mb-3 px-3 py-2 border rounded" />
            <input v-model="password" placeholder="Password" type="password"
                class="w-full mb-3 px-3 py-2 border rounded" />
            <button @click="handleLogin" class="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700">
                Login
            </button>
        </div>
    </div>
</template>
