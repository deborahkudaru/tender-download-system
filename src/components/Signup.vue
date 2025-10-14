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

const handleSignup = () => {
    if (!username.value || !password.value) {
        toast.warning('Please fill in both fields')
        return
    }
    auth.signup(username.value, password.value)
    toast.success('Signup successful!')
    router.push('/login')
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                        v-model="username" 
                        placeholder="Choose a username" 
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        v-model="password" 
                        placeholder="Create a password" 
                        type="password"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>
            </div>

            <button 
                @click="handleSignup" 
                class="mt-6 bg-blue-600 text-white px-4 py-2.5 w-full rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition font-medium"
            >
                Sign Up
            </button>

            <p class="text-center text-sm text-gray-600 mt-4">
                Already have an account? 
                <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Sign in
                </router-link>
            </p>
        </div>
    </div>
</template>