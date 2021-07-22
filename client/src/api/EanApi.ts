import { axiosFactory } from './AxiosFactory';
import { AxiosInstance } from 'axios';
import { dataToClass } from '@/api/ClassFactory';
import Ean from '@/models/Ean';

class EanApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance,
    ) {}

    /**
     * Найти данные по штрихкоу
     */
    public async searchEan(eanCode: string): Promise<Ean> {
        const response = await this.axiosInstance.get(`/ean/${eanCode}`);
        return dataToClass(Ean, response.data);
    }
}

const eanApi = new EanApi();

export default eanApi;
