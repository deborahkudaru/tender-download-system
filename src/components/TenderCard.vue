<script setup>
import { jsPDF } from "jspdf";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
  tender: {
    type: Object,
    required: true,
  },
});

const downloadTender = (tender) => {
  try {
    toast.info(`Downloading "${tender.title}"...`);

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("Tender Document", 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    // Line divider
    doc.line(20, 35, 190, 35);

    // Tender details
    doc.setFontSize(14);
    doc.text(`Title: ${tender.title}`, 20, 50);
    doc.text("Description:", 20, 65);

    // Wrapped description text
    doc.setFontSize(12);
    doc.text(tender.description || "No description provided.", 20, 75, {
      maxWidth: 160,
    });

    // More details
    doc.text(`Budget: ${tender.budget || "N/A"}`, 20, 110);
    doc.text(
      `Deadline: ${
        tender.deadline
          ? new Date(tender.deadline).toLocaleDateString()
          : "N/A"
      }`,
      20,
      120
    );

    // Footer
    doc.setFontSize(10);
    doc.text("Tender Download System", 20, 280);

    // Save as real PDF
    doc.save(`${tender.title}.pdf`);

    toast.success("Tender PDF downloaded successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to generate tender PDF.");
  }
};
</script>

<template>
  <div class="p-4 border rounded-xl bg-white shadow-md w-full sm:w-1/2">
    <h3 class="text-lg font-semibold mb-2">{{ tender.title }}</h3>
    <p class="text-gray-600 mb-4 line-clamp-2">
      {{ tender.description }}
    </p>
    <p class="text-sm text-gray-500 mb-3">
      <strong>Deadline:</strong>
      {{ new Date(tender.deadline).toLocaleDateString() }}
    </p>

    <button
      @click="downloadTender(tender)"
      class="bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Download PDF
    </button>
  </div>
</template>
