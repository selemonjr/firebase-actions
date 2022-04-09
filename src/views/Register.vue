<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import {auth} from "../firebase/firebaseConfig"
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const FirebaseErrorMsg = ref(null);
const errorMsg = ref(null);
const registerUser = async () => {
    if(confirmPassword.value === password.value) {
        try {
            await createUserWithEmailAndPassword(auth,email.value,password.value)
            .then((data) => {
                console.log(data);
                router.push("/home")
            })
        } catch(err) {
            FirebaseErrorMsg.value = err.message;
            setTimeout(() => {
                FirebaseErrorMsg.value = null
            }, 2000)
        }
    } else {
        errorMsg.value = "Passwords do not Match!!!!";
        setTimeout(() => {
                errorMsg.value = null
        }, 2000)
    }
}
</script>

<template>
  <section  class="grid place-items-center w-full h-full">
        <div class="border border-t-gray-100 mt-20 mb-5 w-80 sm:w-full max-w-sm shadow-2xl rounded-md">
            <div class="text-center mt-2">
                <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-300">Firebase Register</h2>
            </div>
            <form class="bg-white w-full px-6 py-4 pb-5" id="form" @submit.prevent="registerUser">
                <div class="pb-4">
                    <label class="font-bold block pb-2">Email</label>
                    <input type="email" id="email" v-model="email" class="py-2 px-2 appearance-none focus:outline-none rounded-md w-full border border-gray-300 shadow-sm" placeholder="Email" required>
                </div>
                <div class="pb-6">
                    <label class="font-bold block pb-2">Password</label>
                    <input type="password" id="password" v-model="password" class="py-2 px-2 appearance-none focus:outline-none rounded-md w-full border border-gray-300 shadow-sm" placeholder="Password">
                </div>
                       <div class="pb-1">
                    <label class="font-bold block pb-2">Confirm Password</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" class="py-2 px-2 appearance-none focus:outline-none rounded-md w-full border border-gray-300 shadow-sm" placeholder="ConfirmPassword">
                </div>
                <div class="pb-2">
                    <p class="text-red-500 font-bold" id="error" v-if="FirebaseErrorMsg">{{FirebaseErrorMsg}}</p>
                     <p class="text-red-500 font-bold" id="error" v-if="errorMsg">{{errorMsg}}</p>
                    <p class="text-green-500 font-bold" id="success"></p>
                </div>
                <div class="pb-2 pt-1">
                   <button type="submit" class="py-2 font-bold hover:bg-blue-600 px-3 bg-blue-500 text-white w-full shadow-md rounded-md">Sign Up</button>
                </div>
            </form>
        </div>
</section>
</template>