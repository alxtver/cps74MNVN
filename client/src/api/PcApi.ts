import { AxiosInstance } from 'axios';
import { axiosFactory } from '@/api/AxiosFactory';
import { dataToArrayClass } from '@/api/ClassFactory';
import Pc from "@/models/Pc";

class PcApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance,
    ) {}

    /**
     * Получить все ПЭВМ за тему
     */
    public async getAllPc(): Promise<Pc[]> {
        const response = await this.axiosInstance.get('/pc');
        return dataToArrayClass(Pc, response.data);
    }
}

const pcApi = new PcApi();

export default pcApi;
