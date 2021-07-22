import { axiosFactory } from '../AxiosFactory';
import { AxiosInstance } from 'axios';
import User from '@/models/User';

class AuthApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
    ) {}

    /**
     * Получить все темы
     */
    public login(username: string, password: string): Promise<{message: string, user?: User}> {
        return this.axiosInstance
            .post('/auth/login', {username, password})
            .then((response) => {
                return response.data;
            })
            .then((data) => data);
    }
}

const authApi = new AuthApi();

export default authApi;
