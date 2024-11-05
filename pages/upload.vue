<template>
  <div class="container mx-auto h-screen flex justify-center items-center">
    <div class="w-full lg:w-1/3 px-10 lg:px-0">
      <div class="flex justify-center items-center mx-auto mb-4 w-40">
        <div class="relative">
          <div class="cursor-pointer" @click="$refs.fileInput.click()">
            <img
              :src="imageUrl"
              alt=""
              class="rounded-full border-white border-4"
            />
            <img
              src="/assets/images/icon-avatar-add.svg"
              alt=""
              class="absolute right-0 bottom-0 pb-2"
            />
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="onFileChange"
            />
          </div>
        </div>
      </div>
      <h2 class="font-normal mb-3 text-3xl text-white text-center">
        Hi, {{ user?.name }}
      </h2>
      <p class="text-white text-center font-light">Please upload your selfie</p>
      <div class="mb-4 mt-6">
        <div class="mb-3">
          <button
            @click="userUpload"
            :disabled="!selectedFile"
            :class="{
              'cursor-not-allowed opacity-50': selectedFile === undefined,
            }"
            class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
          >
            Sign Up Now
          </button>
        </div>
      </div>
      <div>
        <div class="mb-4">
          <button
            @click="$router.push({ path: '/register-success' })"
            class="block w-full bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light px-6 py-4 text-lg rounded-full"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const { user, checkUser, uploadAvatar } = useAuthUser();
checkUser();

const selectedFile = ref(undefined);
const imageUrl = ref("/assets/images/avatar.jpg");

const onFileChange = (e: any) => {
  selectedFile.value = e.target.files[0];
  if (selectedFile.value) {
    imageUrl.value = URL.createObjectURL(selectedFile.value);
  }
};

const userUpload = async () => {
  const formData = new FormData();
  if (!selectedFile.value) {
    console.log("No file selected");
    return;
  }
  formData.append("avatar", selectedFile.value);

  const { success, error } = await uploadAvatar(formData);

  if (!success) {
    console.log(error);
    return;
  }

  navigateTo("/register-success");
};
</script>
