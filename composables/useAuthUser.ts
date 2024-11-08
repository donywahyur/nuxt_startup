import { useRuntimeConfig } from "#app";
import type { User, RegisterUserInput, LoginUserInput } from "~/types/user";
export const useAuthUser = () => {
  const user: Ref<User | null> = ref(null);

  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  const userCookie = useCookie("user");
  const tokenCookie = useCookie("token");

  const login = async (form: LoginUserInput) => {
    const { data: resp, error } = await useFetch(baseUrl + "api/v1/sessions", {
      method: "POST",
      body: form,
      transform: transformResponse,
    });

    if (error.value) {
      const meta = error.value?.data.meta;
      const data = error.value?.data.data;
      return {
        success: false,
        error: data?.errors,
      };
    }

    const data = resp.value?.data;
    tokenCookie.value = data.token;
    await fetchUser();
    return {
      success: true,
      error: null,
    };
  };

  const fetchUser = async () => {
    if (user.value) return;

    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/users/fetch",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
        transform: transformResponse,
      }
    );

    if (error.value) {
      const meta = error.value?.data.meta;
      const data = error.value?.data.data;
      return {
        success: false,
        error: data,
      };
    }

    const data = resp.value?.data;
    user.value = data;
    userCookie.value = JSON.stringify(data);
  };

  const checkUser = () => {
    const token = tokenCookie.value; // Get token from cookie
    if (token && !user.value) {
      fetchUser();
    }
  };

  const clean = async () => {
    tokenCookie.value = null;
    user.value = null;
    userCookie.value = null;
  };
  const emailChecker = async (email: string) => {
    const { data: resp, error } = await useFetch(
      baseUrl + "api/v1/email_checkers",
      {
        method: "POST",
        body: {
          email: email,
        },
        transform: transformResponse,
      }
    );

    if (error.value) {
      return false;
    }
    const data = resp.value?.data;

    return data.is_available;
  };

  const register = async (form: RegisterUserInput) => {
    const { data: resp, error } = await useFetch(baseUrl + "api/v1/users", {
      method: "POST",
      body: form,
      transform: transformResponse,
    });
    if (error.value) {
      const meta = error.value?.data.meta;
      const data = error.value?.data.data;
      return {
        success: false,
        error: data,
      };
    }

    const data = resp.value?.data;
    tokenCookie.value = data.token;
    await fetchUser();
    return {
      success: true,
      error: null,
    };
  };

  const uploadAvatar = async (form: FormData) => {
    const { data: resp, error } = await useFetch(baseUrl + "api/v1/avatar", {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      transform: transformResponse,
    });

    if (error.value) {
      const meta = error.value?.data.meta;
      const data = error.value?.data.data;
      return {
        success: false,
        error: data,
      };
    }

    const data = resp.value?.data;
    if (!data.is_uploaded) {
      return {
        success: false,
        error: data,
      };
    }
    await fetchUser();
    return {
      success: true,
      error: null,
    };
  };

  return {
    user,
    fetchUser,
    checkUser,
    login,
    clean,
    emailChecker,
    register,
    uploadAvatar,
    tokenCookie,
  };
};
