<script setup>
import { defineProps } from 'vue';

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
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <p>
            {{ subtitle }}
        </p>
        <button>View Tenders</button>
    </div>
</template>