import { axiosFactory } from "./AxiosFactory";
import { dataToArrayClass, dataToClass } from "@/api/ClassFactory";
import SystemCase from "@/models/SystemCase";
import type Unit from "@/models/Unit";
import type { AxiosInstance } from "axios";

class SystemCaseApi {
  constructor(
    readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
  ) {}

  /**
   * Получить все системные блоки за тему
   */
  public async getSystemCases(): Promise<SystemCase[]> {
    const response = await this.axiosInstance.get("/systemCase");
    return dataToArrayClass(SystemCase, response.data);
  }

  /**
   * Ввод серийного номера
   * @param unit
   * @param id - идентификатор серийного номера
   */
  public async editSerialNumber(
    unit: Unit,
    id: string
  ): Promise<{
    editableUnit: Unit;
    message: string;
    oldSystemCase: SystemCase;
  }> {
    const response = await this.axiosInstance.put(
      "/systemCase/editSerialNumber",
      { unit, id }
    );
    return response.data;
  }

  /**
   * Добавить системный блок
   * @param systemCase
   */
  public async addSystemCase(systemCase: SystemCase): Promise<SystemCase> {
    const response = await this.axiosInstance.post("/systemCase", systemCase);
    return dataToClass(SystemCase, response.data);
  }

  /**
   * Копирование системного блока
   * @param serialNumber - серийный номер копируемого системного блока
   * @param firstSerialNumber
   * @param lastSerialNumber
   */
  public async copySystemCase(
    serialNumber: string,
    firstSerialNumber: string,
    lastSerialNumber: string
  ): Promise<SystemCase[]> {
    const response = await this.axiosInstance.post("/systemCase/copy", {
      serialNumber,
      firstSerialNumber,
      lastSerialNumber,
    });
    return dataToArrayClass(SystemCase, response.data);
  }

  /**
   * Редактировать системный блок
   * @param systemCase
   */
  public async editSystemCase(systemCase: SystemCase): Promise<SystemCase> {
    const response = await this.axiosInstance.put("/systemCase", systemCase);
    return dataToClass(SystemCase, response.data);
  }

  /**
   * Удалить системный блок
   * @param id
   */
  public async removeSystemCase(id: string): Promise<string | undefined> {
    try {
      const response = await this.axiosInstance.delete(`/systemCase/${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Получить серийные номера системных блоков за тему
   */
  public async getSerialNumbers(): Promise<string[] | undefined> {
    try {
      const response = await this.axiosInstance.get(
        "/systemCase/serialNumbers"
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Получить системный блок по серийному номеру
   * @param serialNumber
   */
  public async getSystemCaseByNumber(
    serialNumber: string
  ): Promise<SystemCase> {
    const response = await this.axiosInstance.get(
      `/systemCase/${serialNumber}`
    );
    return dataToClass(SystemCase, response.data);
  }
}

const systemCaseApi = new SystemCaseApi();

export default systemCaseApi;
