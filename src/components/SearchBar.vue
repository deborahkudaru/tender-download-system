<script setup>
import { ref, watch } from 'vue';

defineProps({
    modelValue: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const query = ref(modelValue);

const updateQuery = () => {
    emit("update:modelValue", query.value);
};

watch(
    () => modelValue,
    (newVal) => {
        query.value = newVal;
    }
);
</script>

<template>
    <div class="bg-gray-100 p-4 rounded">
        <input v-model="query" @input="updateQuery" type="text" placeholder="Search tenders..."
            class="w-full p-2 border border-gray-300 rounded" />
    </div>
</template>