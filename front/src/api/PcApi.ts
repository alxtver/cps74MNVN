import type { AxiosInstance } from "axios";
import { axiosFactory } from "@/api/AxiosFactory";
import { dataToArrayClass, dataToClass } from "@/api/ClassFactory";
import Pc from "@/models/Pc";
import type Unit from "@/models/Unit";

class PcApi {
  constructor(
    readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
  ) {}

  /**
   * Получить все ПЭВМ за тему
   */
  public async getAllPc(): Promise<Pc[]> {
    const response = await this.axiosInstance.get("/pc");
    return dataToArrayClass(Pc, response.data);
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
    oldPc: Pc;
  }> {
    const response = await this.axiosInstance.put("/pc/editSerialNumber", {
      unit,
      id,
    });
    return response.data;
  }

  /**
   * Ввод серийного номера системного блока
   * @param unit
   * @param id
   */
  public async editSystemCaseSerialNumber(
    unit: Unit,
    id: string
  ): Promise<{
    systemCaseUnits: Unit[];
    editableUnit: Unit;
    message: string;
    oldPc: Pc;
  }> {
    const response = await this.axiosInstance.put(
      "/pc/editSystemCaseSerialNumber",
      { unit, id }
    );
    return response.data;
  }

  /**
   * Добавить ПЭВМ
   * @param pc
   */
  public async addPc(pc: Pc): Promise<Pc> {
    const response = await this.axiosInstance.post("/pc", pc);
    return dataToClass(Pc, response.data);
  }

  /**
   * Получить серийные номера ПЭВМв за тему
   */
  public async getSerialNumbers(): Promise<string[] | undefined> {
    try {
      const response = await this.axiosInstance.get("/pc/serialNumbers");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Копирование ПЭВМ
   * @param serialNumber - серийный номер копируемого ПЭВМ
   * @param firstSerialNumber
   * @param lastSerialNumber
   */
  public async copyPc(
    serialNumber: string,
    firstSerialNumber: string,
    lastSerialNumber: string
  ): Promise<Pc[]> {
    const response = await this.axiosInstance.post("/pc/copy", {
      serialNumber,
      firstSerialNumber,
      lastSerialNumber,
    });
    return dataToArrayClass(Pc, response.data);
  }

  /**
   * Редактировать ПЭВМ
   * @param pc
   */
  public async editPc(pc: Pc): Promise<Pc> {
    const response = await this.axiosInstance.put("/pc", pc);
    return dataToClass(Pc, response.data);
  }

  /**
   * Удалить ПЭВМ
   * @param id
   */
  public async removePc(id: string): Promise<string | undefined> {
    try {
      const response = await this.axiosInstance.delete(`/pc/${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Получить ПЭВМ по серийному номеру
   * @param serialNumber
   */
  public async getPcByNumber(serialNumber: string): Promise<Pc> {
    const response = await this.axiosInstance.get(`/pc/${serialNumber}`);
    return dataToClass(Pc, response.data);
  }
}

const pcApi = new PcApi();

export default pcApi;
