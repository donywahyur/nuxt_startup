import type {
  CampaignTransaction,
  CreateTransaction,
  PaymentTransaction,
  Transaction,
} from "~/types/transaction";
import { useRuntimeConfig } from "#app";

export function useTransaction() {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  const { tokenCookie } = useAuthUser();

  const createTransaction = async (form: CreateTransaction) => {
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/transactions",
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

    const payment: PaymentTransaction = resp.value?.data;
    return {
      data: payment,
      error: null,
    };
  };

  const getTransactionUser = async () => {
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/transactions",
      {
        method: "GET",
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

    const transaction: [Transaction] = resp.value?.data;
    return {
      data: transaction,
      error: null,
    };
  };
  const getCampaignTransaction = async (id: number) => {
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/campaigns/" + id + "/transactions",
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

    const transaction: [CampaignTransaction] = resp.value?.data;
    return {
      data: transaction,
      error: null,
    };
  };

  return { createTransaction, getTransactionUser, getCampaignTransaction };
}
