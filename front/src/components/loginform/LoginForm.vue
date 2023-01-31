<template>
  <div class="login">
    <el-card>
      <h2>Вход</h2>
      <el-form
        class="login-form"
        :model="authData"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="authData.username"
            placeholder="Имя пользователя"
            prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="authData.password"
            placeholder="Пароль"
            type="password"
            prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >
            Войти
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" src="./LoginForm.ts"></script>

<style scoped>
.login {
    max-height: 205px;
    max-width: 400px;
    left: calc(100%/2 - 200px);
    top: 30vh;
}
</style>
