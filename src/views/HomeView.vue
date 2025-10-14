<script setup>
import Hero from '../components/Hero.vue';
import TenderList from '../components/TenderList.vue';
</script>

<template>
 <Hero />   
 <TenderList :limit="6" />
</template>