<template>
  <span>{{ number }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  number: {
    type: Number,
    default: 0,
  },
});

const number = computed(() => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.number);
});
</script>
