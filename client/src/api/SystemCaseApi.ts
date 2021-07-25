import { axiosFactory } from './AxiosFactory';
import { AxiosInstance } from 'axios';
import {dataToArrayClass, dataToClass} from '@/api/ClassFactory';
import SystemCase from "@/models/SystemCase";

class SystemCaseApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
    ) {}

    /**
     * Получить все системные блоки за тему
     */
    public async getSystemCases(): Promise<SystemCase[]> {
        const response = await this.axiosInstance.get('/systemCase');
        return dataToArrayClass(SystemCase, response.data);
    }
}

const systemCaseApi = new SystemCaseApi();

export default systemCaseApi;
