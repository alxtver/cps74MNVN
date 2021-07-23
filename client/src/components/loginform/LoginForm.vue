<template>
  <div class="login">
    <v-card elevation="24">
      <v-form
        width="500"
        class="login-form"
        :model="authData"
        ref="form"
        @submit.prevent="login"
      >
        <v-text-field
          v-model="authData.username"
          light
          prepend-icon="mdi-account"
          label="Имя пользователя"
          :rules="userRules"
        />
        <v-text-field
          v-model="authData.password"
          light
          prepend-icon="mdi-lock"
          label="Пароль"
          type="password"
          :rules="passRules"
        />
        <v-btn
          elevation="2"
          :disabled="!validate"
          :loading="loading"
          type="submit"
        >
          Войти
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script src="./LoginForm.ts" lang="ts"></script>

<style lang="scss">
.snack {
  text-align: center !important;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  padding: 20px;
  width: 400px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
