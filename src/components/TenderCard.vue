<script setup>

const props = defineProps({
    tender: {
        type: Object,
        required: true
    }
});
</script>

<template>

<div>{{ tender.title }}
</div>
<!-- <div>{{ tender.description }}</div> -->
</template>