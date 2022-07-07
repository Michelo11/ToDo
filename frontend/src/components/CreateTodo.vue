<script>
import {default as axios} from "axios";

export default {
    data() {
        return {
            title: ""
        }
    },
    methods: {
        save() {
            axios.put(
                "http://localhost:3000/api/todos?title=" + encodeURIComponent(this.title),
                {},{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            ).then(res => {
                this.$parent.update();
                this.title = "";
            });
        }
    }
}
</script>

<template>
    <form class="w-[341px] max-h-[24px]" @submit.prevent="save">
        <input class="text-center w-full rounded-br bg-[#D9D9D9]" type="text" v-model="title" placeholder="Click here to add a new task" />
    </form>
</template>