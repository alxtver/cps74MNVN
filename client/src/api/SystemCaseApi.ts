import { axiosFactory } from './AxiosFactory';
import { AxiosInstance } from 'axios';
import { dataToArrayClass, dataToClass } from '@/api/ClassFactory';
import SystemCase from '@/models/SystemCase';
import Unit from '@/models/Unit';

class SystemCaseApi {
    constructor(
        readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance,
    ) {}

    /**
     * Получить все системные блоки за тему
     */
    public async getSystemCases(): Promise<SystemCase[]> {
        const response = await this.axiosInstance.get('/systemCase');
        return dataToArrayClass(SystemCase, response.data);
    }

    /**
     * Ввод серийного номера
     * @param unit
     * @param id - идентификатор серийного номера
     */
    public async editSerialNumber(
        unit: Unit,
        id: string,
    ): Promise<{
        editableUnit: Unit;
        message: string;
        oldSystemCase: SystemCase;
    }> {
        const response = await this.axiosInstance.put(
            '/systemCase/editSerialNumber',
            { unit, id },
        );
        return response.data;
    }

    /**
     * Добавить системный блок
     * @param systemCase
     */
    public async addSystemCase(systemCase: SystemCase): Promise<SystemCase> {
        const response = await this.axiosInstance.post(
            '/systemCase',
            systemCase,
        );
        return dataToClass(SystemCase, response.data);
    }

    /**
     * Удалить системный блок
     * @param id
     */
    public async removeSystemCase(id: string): Promise<string> {
        try {
            const response = await this.axiosInstance.delete(`/systemCase/${id}`);
            return response.data;
        } catch (e) {
            return e
        }
    }
}

const systemCaseApi = new SystemCaseApi();

export default systemCaseApi;
