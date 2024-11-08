<template>
  <span>{{ newDate }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  date: {
    type: String,
    default: "",
  },
});

const newDate = computed(() => {
  const date = new Date(props.date);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
</script>
