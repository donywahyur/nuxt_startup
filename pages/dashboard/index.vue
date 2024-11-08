<template>
  <div class="project-page">
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <DashboardMenu :menu="'dashboard'" />
        <div class="w-1/4 text-right">
          <NuxtLink
            to="/dashboard/create"
            class="bg-orange-button hover:bg-green-button text-white font-bold py-4 px-4 rounded inline-flex items-center">
            + Create Campaign
          </NuxtLink>
        </div>
      </div>
      <hr />
      <div v-if="status === 'pending'"></div>
      <div v-else class="block mb-2">
        <div
          class="w-full lg:max-w-full lg:flex mb-4"
          v-for="campaign in campaigns.data">
          <div
            class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border border-gray-400"
            :style="`background-image: url(${imageUrl(
              campaign.image_url
            )})`"></div>
          <div
            class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal">
            <div class="mb-8">
              <div class="text-gray-900 font-bold text-xl mb-1">
                {{ campaign.name }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                <Currency :number="campaign.goal_amount" /> &middot;
                {{
                  Math.floor(
                    (campaign.current_amount / campaign.goal_amount) * 100
                  )
                }}%
              </p>
              <p class="text-gray-700 text-base">
                {{ campaign.short_description }}
              </p>
            </div>
            <div class="flex items-center">
              <NuxtLink
                to="/dashboard/detail"
                class="bg-green-button text-white py-2 px-4 rounded">
                Detail
              </NuxtLink>
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
const { getCampaignUser } = useCampaign();
const { status, data: campaigns } = useLazyAsyncData("campaigns", () => {
  return getCampaignUser();
});

const imageUrl = (image) => {
  return image ? baseUrl + image : "https://tailwindcss.com/img/card-left.jpg";
};

if (campaigns.error) {
  throw createError({
    statusCode: 404,
    statusMessage: "Data Not Found",
  });
}
</script>
