<script>
import { default as axios } from "axios";
import LoginView from "./views/LoginView.vue";
import TodoView from "./views/TodoView.vue";

export default {
  data() {
    return {
      user: null,
      loading: true
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.loading = false;
    }

    axios
      .get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.user = res.data.user;
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
      });
  },
  components: { LoginView, TodoView },
};
</script>

<template>
  <div id="loading" v-if="loading">
    <h1>Loading</h1>
  </div>
  <div v-else>
    <div id="login" v-if="!user">
      <LoginView />
    </div>
    <div v-else>
      <TodoView />
    </div>
  </div>
</template>

<style>
body {
  background-color: #1F1F1F;
}
* {
  color: white;
}
*, body, html {
  overflow-x: hidden !important;
}
</style>