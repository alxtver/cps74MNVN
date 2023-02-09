import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import AuthApi from "@/api/authapi/AuthApi";
import router from "@/router";

interface Person {
  username: string;
  password: string;
}
export default defineComponent({
  name: "loginForm",
  data() {
    return {
      authData: {
        username: "",
        password: "",
      } as Person,
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Введите имя пользователя",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Введите пароль", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async login() {
      const valid = await (this.$refs.form as any).validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      try {
        const response = await AuthApi.login(
          this.authData.username,
          this.authData.password
        );
        this.loading = false;
        if (response.message === "loginConfirm" && response.user) {
          this.$store.dispatch("loginConfirm");
          this.$store.dispatch("updateUser", response.user);
          this.$store.dispatch("updatePart", response.user.lastPart);
          sessionStorage.setItem("isAuth", "true");
          sessionStorage.setItem("userName", response.user.username);
          sessionStorage.setItem("group", response.user.group);
          sessionStorage.setItem("part", response.user.lastPart);
          sessionStorage.setItem("user", JSON.stringify(response.user));
          await router.push("pki");
          ElMessage({
            message: "Вход разрешен",
            type: "success",
            center: true,
          });
        } else {
          ElMessage.error("Не правильный логин или пароль.");
        }
      } catch (e) {
        return;
      }
    },
  },
});
