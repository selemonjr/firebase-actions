<script setup>
import { onMounted } from 'vue';
import {auth} from "../firebase/firebaseConfig.js";
import {ref} from "vue";
import { useRouter } from 'vue-router';
import { onAuthStateChanged,signOut } from '@firebase/auth';
const isLoggedIn = ref(false);
const router = useRouter();
onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        user ? isLoggedIn.value = true : isLoggedIn.value = false;
    })
});
const LogOut = async () => {
    await signOut(auth);
    router.push("/")
}
</script>

<template>
    <div class="flex items-center justify-between h-14 w-full p-2 bg-gray-100">
        <div class="pl-2">
            <h1 class="md:text-2xl text-sm text-orange-500 font-bold">Firebase Actions</h1>
        </div>
          <div class="pl-2">
            <ul class="flex">
                <li class="padding"><router-link to="/home">Home</router-link></li>
                 <li class="padding" v-if="!isLoggedIn"><router-link to="/">Login</router-link></li>
                 <li class="padding" v-if="isLoggedIn" @click="LogOut">Log Out</li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.padding {
    @apply  font-bold md:text-lg text-sm cursor-pointer p-2
}
</style>