<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

</script>

<template>
  <div class="container mx-auto p-4">
<Navbar />
<RouterView />
  </div>

</template>
