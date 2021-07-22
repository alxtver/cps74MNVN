import { axiosFactory } from './AxiosFactory';
import { AxiosInstance } from 'axios';
import {dataToArrayClass, dataToClass} from '@/api/ClassFactory';
import Apkzi from "@/models/Apkzi";
import Pki from "@/models/Pki";

class ApkziApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
    ) {}

    /**
     * Получить все АПКЗИ за тему
     */
    public async getApkzi(): Promise<Apkzi[]> {
        const response = await this.axiosInstance.get('/apkzi');
        return dataToArrayClass(Apkzi, response.data);
    }

    /**
     * Создать АПКЗИ
     */
    public async addApkzi(apkzi: Apkzi): Promise<Apkzi | string> {
        const response = await this.axiosInstance.post('/apkzi', apkzi);
        return dataToClass(Apkzi, response.data);
    }

    /**
     * Удалить АПКЗИ
     */
    public async deleteApkzi(id): Promise<Apkzi> {
        const response = await this.axiosInstance.delete('/apkzi', {data: {id}});
        return dataToClass(Apkzi, response.data);
    }

    /**
     * Редактировать АПКЗИ
     */
    public async editApkzi(apkzi: Apkzi): Promise<Apkzi> {
        const response = await this.axiosInstance.put('/apkzi', {apkzi});
        return dataToClass(Apkzi, response.data);
    }
}

const apkziApi = new ApkziApi();

export default apkziApi;
