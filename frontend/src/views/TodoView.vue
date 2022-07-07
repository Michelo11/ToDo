<script>
import {default as axios} from "axios";
import Todo from "../components/Todo.vue";
import CreateTodo from "../components/CreateTodo.vue";

export default {
    data() {
        return {
            todos: []
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            axios.get("http://localhost:3000/api/todos", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                this.todos = res.data.todos;
            })
                .catch(e => {
                console.log(e);
            });
        }  
    },
    components: { Todo, CreateTodo }
}
</script>

<template>
  <div class="content absolute m-auto left-0 right-0 top-0 bottom-0 flex bg-[#393939] w-[720px] h-[500px] rounded-3xl">
    <div class="block text-center border-r-4 border-r-black pr-[20px] bordered">
        <img src="assets/todo.png" width="300" class="m-[50px]" />
        <h1 class="font-bold text-[30px] ml-[20px]">Welcome back {{this.$root.user}}</h1>
        <h2 class="text-[15px] ">It’s time to focus on your work</h2>
    </div>
    <div class="block w-[400px] items-center content-center text-center m-auto">
        <div v-for="todo in todos" :key="todo._id">
            <Todo :id="todo._id" :completed="todo.completed" :title="todo.title" />
        </div>
        <CreateTodo class="bottom-0 absolute text-black" />
    </div>
  </div>
</template>

<style>
@media (max-width: 768px) { 

    .content {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        border-radius: 0 !important;
        display: block !important;
    }
    .bordered {
        border-right: none !important;
        border-bottom-width: 4px !important;
        border-bottom-color: black !important;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

}
</style>