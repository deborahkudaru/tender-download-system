<script setup>
import { jsPDF } from "jspdf";
import { useToast } from "vue-toastification";

const toast = useToast();
const emit = defineEmits(['show-details']);

const props = defineProps({
  tender: {
    type: Object,
    required: true,
  },
});

// pdf downloader function 
const downloadTender = (tender) => {
  try {
    toast.info(`Downloading "${tender.title}"...`);
    // pdf document 
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Tender Document", 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.text(`Title: ${tender.title}`, 20, 50);
    doc.text("Description:", 20, 65);

    doc.setFontSize(12);
    doc.text(tender.description || "No description provided.", 20, 75, {
      maxWidth: 160,
    });

    doc.text(`Budget: ${tender.budget || "N/A"}`, 20, 110);
    doc.text(
      `Deadline: ${tender.deadline
        ? new Date(tender.deadline).toLocaleDateString()
        : "N/A"
      }`,
      20,
      120
    );

    doc.setFontSize(10);
    doc.text("Tender Download System", 20, 280);
    doc.save(`${tender.title}.pdf`);

    toast.success("Tender PDF downloaded successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to generate tender PDF.");
  }
};

const showDetails = () => {
  emit('show-details', props.tender);
};
</script>

<template>
  <div class="p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
    <h3 class="text-lg font-semibold mb-3 text-gray-900">{{ tender.title }}</h3>
    <p class="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
      {{ tender.description }}
    </p>
    <p class="text-sm text-gray-500 mb-4">
      <strong>Deadline:</strong>
      {{ new Date(tender.deadline).toLocaleDateString() }}
    </p>

    <div class="flex gap-3">
      <button @click="showDetails"
        class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
        Read More
      </button>
      <button @click="downloadTender(tender)"
        class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
        Download PDF
      </button>
    </div>
  </div>
</template>