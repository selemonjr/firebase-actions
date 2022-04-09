<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import { signInWithEmailAndPassword } from "@firebase/auth";
import {auth} from "../firebase/firebaseConfig"
const email = ref("");
const password = ref("");
const router = useRouter();
const FirebaseErrorMsg = ref(null);
const loginUser = async () => {
    if(email && password) {
        try {
            await signInWithEmailAndPassword(auth,email.value,password.value)
           .then((data) => {
               console.log(data);
               router.push("/home")
           });
       } catch(err) {
           FirebaseErrorMsg.value = err.message;
           console.log(FirebaseErrorMsg)
           setTimeout(() => {
               FirebaseErrorMsg.value = null;
           }, 2000);
       }
    }
}
</script>
<template>
  <section  class="grid place-items-center w-full h-full">
        <div class="border border-t-gray-100 mt-20 mb-5 w-80 sm:w-full max-w-sm shadow-2xl rounded-md">
            <div class="text-center mt-2">
                <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-300">Firebase Login</h2>
            </div>
            <form class="bg-white w-full px-6 py-4 pb-5" id="form" @submit.prevent="loginUser">
                <div class="pb-4">
                    <label class="font-bold block pb-2">Email</label>
                    <input type="email" id="email" v-model="email" class="py-2 px-2 appearance-none focus:outline-none rounded-md w-full border border-gray-300 shadow-sm" placeholder="Email" required>
                </div>
                <div class="pb-3">
                    <label class="font-bold block pb-2">Password</label>
                    <input type="password" id="password" v-model="password" class="py-2 px-2 appearance-none focus:outline-none rounded-md w-full border border-gray-300 shadow-sm" placeholder="Password">
                </div>
                <div class="pb-1">
                    <p class="text-red-500 font-bold" id="error"></p>
                    <p class="text-green-500 font-bold" id="success"></p>
                </div>
                <div class="py-2">
                  <h3 class="font-bold text-md">Don't have an account yet? <router-link to="/register" class="text-sky-500">Register</router-link></h3>
                </div>
                <div class="pb-2 pt-1">
                   <button type="submit" class="py-2 font-bold hover:bg-blue-600 px-3 bg-blue-500 text-white w-full shadow-md rounded-md">Login</button>
                </div>
            </form>
        </div>
</section>
</template>