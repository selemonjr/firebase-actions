<script setup>
import {ref,onMounted,computed} from "vue";
import {TrashIcon} from "@heroicons/vue/solid";
import {db} from "../firebase/firebaseConfig.js";
import { collection, getDocs,addDoc,doc,deleteDoc} from "@firebase/firestore";
const todos = ref([]);
const task = ref("")
const docRef = collection(db,"todos");
onMounted( async () => {
    const data = await getDocs(docRef);
    data.docs.forEach((doc) => (
        todos.value.push ({
        ...doc.data(), id: doc.id
    })
    ));
  console.log(todos.value);
});

const handleAddTodo = async () => {
    if(!task.value) {
        console.log('Enter task')
    } else {
        await addDoc(docRef, {todo: task.value})
    }
    task.value = "";
    console.log("Successful");
    location.reload();
};

const deleteTodo = async (id) => {
    const deletedTodo = doc(db,"todos", id);
    await deleteDoc(deletedTodo);
    location.reload()
};

const noTasks = computed(() => {
    return todos.value.length === 0;
})
</script>
<template>
    <div class="grid place-items-center">
        <div class="w-[35rem] min-h-scren mt-10">
            <div class="pt-4 px-4">
                <input class="md:w-[330px] w-[170px] px-3 py-3 mr-5 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-700
      focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" type="text" placeholder="Add Task" v-model="task">
                <button @click="handleAddTodo" class="mr-10 h-10 w-[5rem] md:w-[7rem] bg-orange-500 rounded-md text-white shadow-md hover:bg-orange-600">Add Task</button>
            </div>
            <div class="ml-5 mt-5 md:w-[420px] w-[250px]">
                <div class="text-center font-bold text-lg">
                    <h2 v-if="noTasks">You have no Tasks</h2>
                </div>
            <div v-for="todo in todos" :key="todo.id">
            <div class="flex justify-between items-center">
                <p class="pl-1 font-bold text-md text-lg py-3">
                    {{todo.todo}}
                </p>
                <button @click="deleteTodo(todo.id)">
                <TrashIcon class="h-7 text-red-500"/>
                </button>
            </div>
            </div>
            </div>
        </div>
     </div>
</template> 