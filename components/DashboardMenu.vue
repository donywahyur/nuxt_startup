<template>
  <div class="w-3/4 mr-6">
    <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
    <ul class="flex mt-2">
      <li class="mr-6">
        <NuxtLink
          to="/dashboard"
          :class="
            props.menu === 'dashboard'
              ? 'text-gray-800 font-bold'
              : 'text-gray-500 hover:text-gray-800'
          ">
          Your Projects
        </NuxtLink>
      </li>
      <li class="mr-6">
        <NuxtLink
          :class="
            props.menu === 'transactions'
              ? 'text-gray-800 font-bold'
              : 'text-gray-500 hover:text-gray-800'
          "
          to="/dashboard/transactions">
          Your Transactions
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  menu: String,
});
</script>
