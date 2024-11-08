<template>
  <div class="project-page">
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <DashboardMenu :menu="'transactions'" />
      </div>
      <hr />
      <div class="block mb-2">
        <div v-if="status === 'pending'">Loading</div>
        <div v-else>
          <div
            class="w-full lg:max-w-full lg:flex mb-4"
            v-for="transaction in transactions.data">
            <div
              v-if="!transaction.campaign.image_url"
              class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style="background-color: #bbb"></div>
            <div
              v-else
              class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border border-gray-400"
              :style="`background-image: url(${baseUrl}${transaction.campaign.image_url})`"></div>
            <div
              class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal">
              <div>
                <div class="text-gray-900 font-bold text-xl mb-1">
                  {{ transaction.campaign.name }}
                </div>
                <p class="text-sm text-gray-600 flex items-center mb-2">
                  <Currency :number="transaction.amount" /> &middot;
                  <DateConversion :date="transaction.created_at" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>
    <Footer />
  </div>
</template>
<script setup>
const baseUrl = useRuntimeConfig().public.API_BASE_URL;
const { getTransactionUser } = useTransaction();
const { status, data: transactions } = useLazyAsyncData("transactions", () => {
  return getTransactionUser();
});
</script>
