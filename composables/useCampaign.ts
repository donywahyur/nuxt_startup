import { useRuntimeConfig } from "#app";
import type { Campaign, CampaignCreate } from "~/types/campaign";
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
    //get type of userCookie
    const userData: Ref<User | null> = ref(null);
    userData.value = JSON.parse(JSON.stringify(userCookie.value));

    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/campaigns?user_id=" + userData.value?.id,
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

  const createCampaign = async (form: CampaignCreate) => {
    const { data: resp, error } = await useFetch(baseUrl + "api/v1/campaigns", {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      transform: transformResponse,
    });
    if (error.value) {
      const data = error.value?.data.data;
      return {
        error: data,
        data: null,
      };
    }

    const campaign: Campaign = resp.value?.data;
    return {
      error: null,
      data: campaign,
    };
  };

  const uploadImageCampaign = async (form: FormData) => {
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/campaign-images",
      {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
        transform: transformResponse,
      }
    );

    if (error.value) {
      const data = error.value?.data.data;
      return {
        error: data,
        data: null,
      };
    }

    const campaign: Campaign = resp.value?.data;
    return {
      error: null,
      data: campaign,
    };
  };
  return { getCampaign, getCampaignUser, createCampaign, uploadImageCampaign };
};
