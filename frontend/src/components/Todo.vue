<script>
import {default as axios} from "axios";

export default {
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        update() {
            axios.patch(
                "http://localhost:3000/api/todos",
                {
                    id: this.id,
                    title: this.title,
                    completed: this.completed
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
        },
        delete() {
            axios.delete(
                "http://localhost:3000/api/todos?id=" + encodeURIComponent(this.id),
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            ).then(res => {
                this.$parent.update();
            });
        }
    }
}
</script>

<template>
    <div class="todo mb-[10px] items-center text-center content-center">
        <input class="mr-[10px] rounded z-10" @change="update" type="checkbox" v-model="completed" />
        <input class="rounded bg-transparent z-10" @change="update" type="text" v-model="title" />
        <button class="ml-[10px] z-10" @click="this.delete()"><font-awesome-icon icon="fa-solid fa-trash-can" /></button>
    </div>
</template>