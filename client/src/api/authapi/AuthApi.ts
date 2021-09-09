import { axiosFactory } from '../AxiosFactory';
import { AxiosInstance } from 'axios';
import User from '@/models/User';
import { dataToClass } from '@/api/ClassFactory';

class AuthApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance,
    ) {}

    /**
     * Авторизация
     */
    public login(
        username: string,
        password: string,
    ): Promise<{ message: string; user?: User }> {
        return this.axiosInstance
            .post('/auth/login', { username, password })
            .then((response) => {
                return response.data;
            })
            .then((data) => data);
    }

    /**
     * Обновление пользователя
     */
    public async updateUser(user: User): Promise<User> {
        const response = await this.axiosInstance.post(
            '/auth/updateUser',
            user,
        );
        return dataToClass(User, response.data);
    }
}

const authApi = new AuthApi();

export default authApi;
