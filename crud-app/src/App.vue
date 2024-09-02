<script setup>
import Navbar from "@/components/Navbar.vue";
import useAuthUser from "./stores/authStore";
import { onMounted } from "vue";
const authUser = useAuthUser();

onMounted(() => {
  authUser.getUser();
});


</script>

<template>
  <Navbar v-if="$route.name != 'login' && $route.name != 'register'"></Navbar>
  <RouterView />
</template>

<style scoped></style>
