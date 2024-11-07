import { useRuntimeConfig } from "#app";
import type { Campaign } from "~/types/campaign";

export const useCampaign = () => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;

  const getCampaign = async (id: number) => {
    const campaign: Ref<Campaign | null> = ref(null);
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/campaigns/" + id,
      {
        transform: transformResponse,
      }
    );
    if (error.value) {
      return {
        error: error.value?.data.data,
        data: null,
      };
    }

    const data = resp.value?.data;
    campaign.value = data;
    if (campaign.value?.id == 0) {
      return {
        error: "campaign not found",
        data: null,
      };
    }

    return {
      error: null,
      data: data,
    };
  };

  return { getCampaign };
};
