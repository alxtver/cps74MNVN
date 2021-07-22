import { axiosFactory } from './AxiosFactory';
import { AxiosInstance } from 'axios';
import Pki from '@/models/Pki';
import {dataToArrayClass, dataToClass} from '@/api/ClassFactory';

class PkiApi {
  constructor(
    readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
  ) {}

  /**
   * Получить входные данные
   */
  public async getPki(): Promise<Pki[]> {
      const response = await this.axiosInstance.get('/pkis');
      return dataToArrayClass(Pki, response.data);
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
  public async deletePki(id): Promise<Pki> {
      const response = await this.axiosInstance.delete('/pkis', {data: {id}});
      return dataToClass(Pki, response.data);
  }

    /**
     * Редактировать ПКИ
     */
    public async editPki(pki: Pki): Promise<Pki> {
        const response = await this.axiosInstance.put('/pkis', {pki});
        return dataToClass(Pki, response.data);
    }

    /**
     * Получить автокомплит типов ПКИ
     */
    public async autocompleteTypesPki(query: string): Promise<string[]> {
        const response = await this.axiosInstance.get('/pkis/autocompleteTypesPki', {params: {
                query
            }});
        return response.data;
    }

    /**
     * Получить автокомплит производителей
     */
    public async autocompleteVendors(query: string): Promise<string[]> {
        const response = await this.axiosInstance.get('/pkis/autocompleteVendors', {params: {
                query
            }});
        return response.data;
    }

    /**
     * Получить автокомплит стран
     */
    public async autocompleteCountries(query: string): Promise<string[]> {
        const response = await this.axiosInstance.get('/pkis/autocompleteCountries', {params: {
                query
            }});
        return response.data;
    }
}

const pkiApi = new PkiApi();

export default pkiApi;
