<template>
  <div class="project-page">
    <section class="project-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-56">
      <div class="flex mt-3">
        <div class="w-3/4 mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <figure class="item-image">
              <img
                :src="
                  campaign.image_url
                    ? baseUrl + campaign.image_url
                    : '/assets/images/no-image.png'
                "
                alt=""
                class="rounded-20 w-full" />
            </figure>
          </div>
          <div class="flex -mx-2">
            <div
              v-for="image in campaign.Images"
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20">
              <figure class="item-thumbnail">
                <img
                  :src="baseUrl + image.image_url"
                  alt=""
                  class="rounded-20 w-full" />
              </figure>
            </div>
          </div>
        </div>
        <div class="w-1/4">
          <div
            class="bg-white w-full p-5 border border-gray-400 rounded-20 sticky"
            style="top: 15px">
            <h3>Project Leader:</h3>

            <div class="flex mt-3">
              <div class="w-1/4">
                <img
                  src="/assets/images/testimonial-1-icon.png"
                  alt=""
                  class="w-full inline-block rounded-full" />
              </div>
              <div class="w-3/4 ml-5 mt-1">
                <div class="font-semibold text-xl text-gray-800">
                  {{ campaign.user.name }}
                </div>
                <div class="font-light text-md text-gray-400">
                  {{ campaign.backer_count }} backer
                </div>
              </div>
            </div>

            <h4 class="mt-5 font-semibold">What will you get:</h4>
            <ul class="list-check mt-3">
              <li v-for="perk in campaign.perks">{{ perk }}</li>
            </ul>
            <input
              type="number"
              class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              placeholder="Amount in Rp"
              value="" />
            <NuxtLink
              to="/fund-success"
              class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full">
              Fund Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center">
        <div class="w-full md:w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            Wireboard Fortune
          </h2>
          <p class="font-light text-xl mb-5">
            The new era of mechanical keyboard for everyone
          </p>

          <div class="relative progress-bar">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6">
              <div
                :style="'width:' + percentage + '%'"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"></div>
            </div>
          </div>
          <div class="flex progress-info mb-6">
            <div class="text-2xl">{{ percentage }}%</div>
            <div class="ml-auto font-semibold text-2xl">
              <Currency :number="campaign.goal_amount" />
            </div>
          </div>

          <p class="font-light text-xl mb-5">
            {{ campaign.short_description }}
          </p>
        </div>
        <div class="w-1/4 hidden md:block"></div>
      </div>
    </section>
    <div class="cta-clip -mt-20"></div>
    <CallToAction v-if="!user" />
    <section v-else class="call-to-action bg-purple-progress pt-64 pb-10" />
    <Footer />
  </div>
</template>
<script setup lang="ts">
const baseUrl = useRuntimeConfig().public.API_BASE_URL;
const { user, checkUser } = useAuthUser();
checkUser();
const id = parseInt(useRoute().params.id.toString());

const { getCampaign } = useCampaign();
const { error, data: campaign } = await getCampaign(id);
if (error) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const percentage = computed(() => {
  return Math.round((campaign.current_amount / campaign.goal_amount) * 100);
});
</script>
