<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

defineProps({
  title: {
    type: String,
    default: 'Empowering Transparent Procurement.',
  },
  subtitle: {
    type: String,
    default: 'Browse hundreds of tender opportunities, get all the details you need, and download documents instantly.',
  },
});

function goToTenders() {
  router.push({ name: 'tenders' });
}
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <p>
            {{ subtitle }}
        </p>
        <button @click="goToTenders">View Tenders</button>
    </div>
</template>