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

const handleUsernameInput = () => {
  usernameError.value = validateUsername(username.value)
}

const handlePasswordInput = () => {
  passwordError.value = validatePassword(password.value)
}

const handleSignup = () => {
  if (!validateForm(username, password, usernameError, passwordError)) return

  try {
    auth.signup(username.value, password.value)
    toast.success('Signup successful!')
    router.push('/login')
  } catch (error) {
    toast.error('Signup failed. Please try again.')
    console.error('Signup error:', error)
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input v-model="username" @input="handleUsernameInput" @blur="handleUsernameInput"
            placeholder="Choose a username (3-20 characters)" :class="[
              'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition',
              usernameError ? 'border-red-500' : 'border-gray-300'
            ]" />
          <p v-if="usernameError" class="text-red-500 text-xs mt-1">{{ usernameError }}</p>
          <p v-else class="text-gray-500 text-xs mt-1">
            3-20 characters, letters, numbers, and underscores only
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" @input="handlePasswordInput" @blur="handlePasswordInput" type="password"
            placeholder="Create a strong password" :class="[
              'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition',
              passwordError ? 'border-red-500' : 'border-gray-300'
            ]" />
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
          <p v-else class="text-gray-500 text-xs mt-1">
            Minimum 8 characters with uppercase, lowercase, number, and special character
          </p>
        </div>
      </div>

      <button @click="handleSignup" :disabled="!!usernameError || !!passwordError" :class="[
        'mt-6 px-4 py-2.5 w-full rounded-lg font-medium focus:ring-4 transition',
        usernameError || passwordError
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200'
      ]">
        Sign Up
      </button>

      <p class="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>
