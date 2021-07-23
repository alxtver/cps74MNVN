import { Component, Vue } from "vue-property-decorator";
import AuthApi from "@/api/authapi/AuthApi";
import router from "@/router";

/**
 * Форма авторизации
 */

@Component
export default class LoginForm extends Vue {
    private authData: Person = {
        username: "",
        password: "",
    };

    private loading = false;

    private userRules = [(v) => !!v || "Введите имя"];
    private passRules = [(v) => !!v || "Введите пароль"];

    /**
     * Метод авторизации
     * @private
     */
    private async login() {
        this.loading = true;
        const response = await AuthApi.login(
            this.authData.username,
            this.authData.password
        );
        if (response.message === "loginConfirm") {
            this.$message({
                message: 'Вход разрешен',
                type: 'success',
                customClass: 'successMessage',
                center: true,
            });
            this.$store.commit("loginConfirm");
            this.$store.commit("updateUser", response.user);
            this.$store.commit("updatePart", response.user.lastPart);
            sessionStorage.setItem("isAuth", "true");
            sessionStorage.setItem("userName", response.user.username);
            sessionStorage.setItem("group", response.user.group);
            sessionStorage.setItem("part", response.user.lastPart);
            await router.push("pkis");
        } else if (response.message === "wrongName") {
            this.$message({
                message: 'Неправильное имя пользователя!',
                type: 'error',
                customClass: 'errorMessage',
                center: true,
            });
        } else if (response.message === "wrongPassword") {
            this.$message({
                message: 'Неправильный пароль!',
                type: 'error',
                customClass: 'errorMessage',
                center: true,
            });
        }
        this.loading = false;
    }

    private get validate(): boolean {
        return this.authData.username !== "" && this.authData.password !== "";
    }
}

interface Person {
    username: string;
    password: string;
}
