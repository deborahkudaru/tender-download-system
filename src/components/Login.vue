<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { validateUsername, validatePassword, validateForm } from '../utils/validation'

const username = ref('')
const password = ref('')
const usernameError = ref('')
const passwordError = ref('')

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const handleLogin = () => {
    if (!validateForm(username, password, usernameError, passwordError)) return

    if (auth.login(username.value, password.value)) {
        toast.success('Login successful!')
        router.push('/tenders')
    } else {
        toast.error('Invalid credentials')
    }
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen px-4">
        <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input v-model="username" @input="validateUsername" @blur="validateUsername"
                        placeholder="Enter your username" :class="[
                            'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition',
                            usernameError ? 'border-red-500' : 'border-gray-300'
                        ]" />
                    <p v-if="usernameError" class="text-red-500 text-xs mt-1">{{ usernameError }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input v-model="password" @input="validatePassword" @blur="validatePassword"
                        placeholder="Enter your password" type="password" :class="[
                            'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition',
                            passwordError ? 'border-red-500' : 'border-gray-300'
                        ]" />
                    <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
                </div>
            </div>

            <button @click="handleLogin" :disabled="!!usernameError || !!passwordError || !username || !password"
                :class="[
                    'mt-6 px-4 py-2.5 w-full rounded-lg focus:ring-4 transition font-medium',
                    usernameError || passwordError || !username || !password
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200'
                ]">
                Log In
            </button>

            <p class="text-center text-sm text-gray-600 mt-4">
                Don't have an account?
                <router-link to="/signup" class="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Sign up
                </router-link>
            </p>
        </div>
    </div>
</template>
