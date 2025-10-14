<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

// Error states
const usernameError = ref('')
const passwordError = ref('')

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  usernameError.value = ''
  passwordError.value = ''

  // Username validation
  if (!username.value) {
    usernameError.value = 'Username is required'
    isValid = false
  } else if (username.value.length < 3) {
    usernameError.value = 'Username must be at least 3 characters long'
    isValid = false
  } else if (username.value.length > 20) {
    usernameError.value = 'Username must be less than 20 characters'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
    usernameError.value = 'Username can only contain letters, numbers, and underscores'
    isValid = false
  }

  // Password validation
  if (!password.value) {
    passwordError.value = 'Password is required'
    isValid = false
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long'
    isValid = false
  } else if (password.value.length > 50) {
    passwordError.value = 'Password must be less than 50 characters'
    isValid = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
    passwordError.value = 'Password must contain both uppercase and lowercase letters'
    isValid = false
  } else if (!/(?=.*\d)/.test(password.value)) {
    passwordError.value = 'Password must contain at least one number'
    isValid = false
  } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password.value)) {
    passwordError.value = 'Password must contain at least one special character'
    isValid = false
  }

  return isValid
}

const handleSignup = () => {
  if (!validateForm()) {
    return
  }

  try {
    auth.signup(username.value, password.value)
    toast.success('Signup successful!')
    router.push('/login')
  } catch (error) {
    toast.error('Signup failed. Please try again.')
    console.error('Signup error:', error)
  }
}

// Real-time validation as user types (optional)
const validateUsername = () => {
  if (username.value && username.value.length < 3) {
    usernameError.value = 'Username must be at least 3 characters long'
  } else if (username.value && username.value.length > 20) {
    usernameError.value = 'Username must be less than 20 characters'
  } else if (username.value && !/^[a-zA-Z0-9_]+$/.test(username.value)) {
    usernameError.value = 'Username can only contain letters, numbers, and underscores'
  } else {
    usernameError.value = ''
  }
}

const validatePassword = () => {
  if (password.value && password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long'
  } else if (password.value && password.value.length > 50) {
    passwordError.value = 'Password must be less than 50 characters'
  } else if (password.value && !/(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
    passwordError.value = 'Password must contain both uppercase and lowercase letters'
  } else if (password.value && !/(?=.*\d)/.test(password.value)) {
    passwordError.value = 'Password must contain at least one number'
  } else if (password.value && !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password.value)) {
    passwordError.value = 'Password must contain at least one special character'
  } else {
    passwordError.value = ''
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
          <input 
            v-model="username" 
            @input="validateUsername"
            @blur="validateUsername"
            placeholder="Choose a username (3-20 characters)" 
            :class="[
              'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition',
              usernameError ? 'border-red-500' : 'border-gray-300'
            ]"
          />
          <p v-if="usernameError" class="text-red-500 text-xs mt-1">{{ usernameError }}</p>
          <p v-else class="text-gray-500 text-xs mt-1">3-20 characters, letters, numbers, and underscores only</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            v-model="password" 
            @input="validatePassword"
            @blur="validatePassword"
            placeholder="Create a strong password" 
            type="password"
            :class="[
              'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition',
              passwordError ? 'border-red-500' : 'border-gray-300'
            ]"
          />
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
          <p v-else class="text-gray-500 text-xs mt-1">
            Minimum 8 characters with uppercase, lowercase, number, and special character
          </p>
        </div>
      </div>

      <button 
        @click="handleSignup" 
        :disabled="!!usernameError || !!passwordError"
        :class="[
          'mt-6 px-4 py-2.5 w-full rounded-lg focus:ring-4 transition font-medium',
          usernameError || passwordError 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200'
        ]"
      >
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