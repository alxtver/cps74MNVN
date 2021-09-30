import { axiosFactory } from './AxiosFactory';
import { AxiosInstance } from 'axios';
import { dataToArrayClass, dataToClass } from '@/api/ClassFactory';
import Ean from '@/models/Ean';

class EanApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
    ) {}

    public async getAllEan(): Promise<Ean[]> {
        const response = await this.axiosInstance.get(`/ean`);
        return dataToArrayClass(Ean, response.data);
    }

    /**
     * Найти данные по штрихкоу
     */
    public async searchEan(eanCode: string): Promise<Ean> {
        const response = await this.axiosInstance.get(`/ean/${eanCode}`);
        return dataToClass(Ean, response.data);
    }

    public async deleteEan(id: string): Promise<Ean> {
        const response = await this.axiosInstance.delete(`/ean/${id}`);
        return dataToClass(Ean, response.data);
    }

    public async updateEan(ean: string): Promise<Ean> {
        const response = await this.axiosInstance.put(`/ean`, ean);
        return dataToClass(Ean, response.data);
    }
}

const eanApi = new EanApi();

export default eanApi;
