import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
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
    private snackbar = false;
    private snackbarText: string | null = null;
    private snackbarColor: string | null = null;

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
            this.snackbar = true;
            this.snackbarText = "Вход разрешен";
            this.snackbarColor = "teal accent-3";
            this.$store.commit("loginConfirm");
            this.$store.commit("updateUser", response.user);
            this.$store.commit("updatePart", response.user.lastPart);
            sessionStorage.setItem("isAuth", "true");
            sessionStorage.setItem("userName", response.user.username);
            sessionStorage.setItem("group", response.user.group);
            sessionStorage.setItem("part", response.user.lastPart);
            await router.push("pkis");
        } else if (response.message === "wrongName") {
            this.snackbar = true;
            this.snackbarText = "Неправильное имя пользователя!";
            this.snackbarColor = "deep-orange";
        } else if (response.message === "wrongPassword") {
            this.snackbar = true;
            this.snackbarText = "Неправильный пароль!";
            this.snackbarColor = "deep-orange";
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
