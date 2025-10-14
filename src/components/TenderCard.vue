<script setup>

const props = defineProps({
    tender: {
        type: Object,
        required: true
    }
});

const downloadTender = (url, title) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
</script>

<template>

    <div>{{ tender.title }}
    </div>
    <!-- <div>{{ tender.description }}</div> -->
         <!-- <p class="text-gray-500 text-sm mb-3">
      <strong>Deadline:</strong> {{ new Date(tender.deadline).toLocaleDateString() }}
    </p> -->
<button
      @click="downloadTender(tender.documentUrl, tender.title)"
      class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
    >
      Download Tender PDF
    </button>
</template>