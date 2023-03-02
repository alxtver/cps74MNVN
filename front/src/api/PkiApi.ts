import { axiosFactory } from './AxiosFactory';
import Pki from '@/models/Pki';
import { dataToArrayClass, dataToClass } from '@/api/ClassFactory';
import type { AxiosInstance } from 'axios';

class PkiApi {
    constructor(readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance) {}

    /**
     * Получить входные данные
     */
    public async getPki(part: string, query: string): Promise<Pki[]> {
        const response = await this.axiosInstance.get('/pkis', {
            params: { part, query },
        });
        return dataToArrayClass(Pki, response.data);
    }

    /**
     * Получить последний введенный ПКИ
     */
    public async getLastPki(): Promise<Pki> {
        const response = await this.axiosInstance.get('/pkis/lastPki');
        return dataToClass(Pki, response.data);
    }

    /**
     * Создать ПКИ
     */
    public async addPki(pki: Pki): Promise<Pki | string> {
        const response = await this.axiosInstance.post('/pkis/add', pki);
        return dataToClass(Pki, response.data);
    }

    /**
     * Удалить ПКИ
     */
    public async deletePki(id: string, part: string): Promise<Pki> {
        const response = await this.axiosInstance.delete('/pkis', {
            params: { id, part },
        });
        return dataToClass(Pki, response.data);
    }

    /**
     * Редактировать ПКИ
     */
    public async editPki(pki: Pki, part: string): Promise<Pki> {
        const response = await this.axiosInstance.put('/pkis', { pki, part });
        return dataToClass(Pki, response.data);
    }

    /**
     * Получить автокомплит типов ПКИ
     */
    public async autocompleteTypesPki(query: string): Promise<string[]> {
        const response = await this.axiosInstance.get('/pkis/autocompleteTypesPki', {
            params: {
                query,
            },
        });
        return response.data;
    }

    /**
     * Получить автокомплит производителей
     */
    public async autocompleteVendors(query: string): Promise<string[]> {
        const response = await this.axiosInstance.get('/pkis/autocompleteVendors', {
            params: {
                query,
            },
        });
        return response.data;
    }

    /**
     * Получить автокомплит стран
     */
    public async autocompleteCountries(query: string): Promise<string[]> {
        const response = await this.axiosInstance.get('/pkis/autocompleteCountries', {
            params: {
                query,
            },
        });
        return response.data;
    }
}

const pkiApi = new PkiApi();

export default pkiApi;
