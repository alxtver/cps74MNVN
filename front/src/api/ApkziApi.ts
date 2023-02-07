import { axiosFactory } from './AxiosFactory';
import {dataToArrayClass, dataToClass} from '@/api/ClassFactory';
import type { AxiosInstance } from "axios";
import Apkzi from "@/models/Apkzi";

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
     * Получить последний введенный АПКЗИ
     */
    public async getLastApkzi(): Promise<Apkzi> {
        const response = await this.axiosInstance.get('/apkzi/lastApkzi');
        return dataToClass(Apkzi, response.data);
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
    public async deleteApkzi(id: string): Promise<Apkzi> {
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
