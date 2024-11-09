import { useRuntimeConfig } from "#app";
import type { Campaign } from "~/types/campaign";
import type { User } from "~/types/user";

export const useCampaign = () => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  const { tokenCookie, userCookie } = useAuthUser();

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

  const getCampaignUser = async () => {
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/campaigns?user_id=",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
        transform: transformResponse,
      }
    );
    if (error.value) {
      return {
        error: error.value?.data.data,
        data: null,
      };
    }

    const campaigns: [Campaign] = resp.value?.data;
    return {
      error: null,
      data: campaigns,
    };
  };

  return { getCampaign, getCampaignUser };
};
