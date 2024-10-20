<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Вход</h1>
      <div class="box">
        <form @submit.prevent="handleLogin">
          <div class="field">
            <label class="label">Логин</label>
            <div class="control">
              <input
                v-model="login"
                class="input"
                type="login"
                placeholder="Введите ваш логин"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Пароль</label>
            <div class="control">
              <input
                v-model="password"
                class="input"
                type="password"
                placeholder="Введите ваш пароль"
                required
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">Войти</button>
            </div>
          </div>
          <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { login } from './api';

export default {
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      try {
        login({ password: this.password, username: this.login }).then(() => {
          this.$router.push({ name: 'Dashboard' });
        });
      } catch {
        this.errorMessage = 'Неправильный email или пароль.';
      }
    },
  },
};
</script>
