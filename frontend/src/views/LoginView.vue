<script>
import {default as axios} from "axios";

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submit(action) {
            if (!this.username || !this.password || this.username == "" || this.password == "") {
                this.$toast.error('Please enter your username and password.');
                return;
            }


            axios.post("http://localhost:3000/api/users/" + action, {
                username: this.username,
                password: this.password
            }).then(res => {
                if (res.data.token) {
                    this.$toast.success('Login successful.');
                    localStorage.setItem("token",res.data.token);

                    location.reload();
                } else {
                    this.$toast.error('Login failed.');
                }
            }).catch(err => {
                if (err.response) this.$toast.error(err.response.data.message);
                else this.$toast.error('Login failed.');
            });
        }
    }
}
</script>

<template>
  <main>
    <form @submit.prevent class="text-black text-center items-center content-center block pl-[30px] pr-[30px] pt-[50px] pb-[50px] border-2 border-black left-0 top-0 right-0 bottom-0 m-auto bg-[#393939] rounded-[30px] w-[500px] h-[400px] absolute sm:bg-red">
        <div class="login-content">
        <div class="m-auto mb-[10px] flex item-1">
            <img src="assets/login.png" width="122" />
            <h1 class="font-bold font-roboto text-[80px] mb-[20px] login">Account</h1>
        </div>
        <input type="username" v-model="username" class="text-sm rounded-[10px] w-[300px] h-[30px] mb-[20px] bg-[#D9D9D9] text-center" placeholder="Username" required>
        <input type="password" v-model="password" class="text-sm rounded-[10px] w-[300px] h-[30px] mb-[20px] bg-[#D9D9D9] text-center" placeholder="Password" required>
        <div class="flex items-center text-center content-center max-w-[320px] mr-auto ml-auto">
            <button @click="this.submit('login')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-[150px] max-w-[150px] w-[150px] mr-[20px]">Login</button>
            <button @click="this.submit('register')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-[150px] max-w-[150px] w-[150px]">Register</button>
        </div>
        </div>
    </form>
  </main>
</template>

<style>
@media (max-width: 768px) { 
    .login::after {
        display: block;
        content: "";
        width: 187px;
        height: 0px;
        margin-left: 10px;

        border: 3px solid #00A3FF;
        filter: blur(2px);
    }
    form {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        border-radius: 0 !important;
    }
    h1 {
        font-size: 3rem !important;
    }
    .login-content {
        margin-top: 50% !important;
    }
}
</style>