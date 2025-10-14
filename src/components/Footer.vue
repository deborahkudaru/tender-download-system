<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="border-t border-gray-100 py-6 mt-32">
        <div class="max-w-7xl mx-auto px-6">
            <p class="text-center text-sm text-gray-500 font-medium">
                &copy; {{ currentYear }} Tender Download System
            </p>
        </div>
    </footer>
</template>