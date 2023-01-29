import { axiosFactory } from "./AxiosFactory";
import { dataToArrayClass, dataToClass } from "@/api/ClassFactory";
import type { AxiosInstance } from "axios";
import Part from "@/models/Part";

class PartApi {
  constructor(
    readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
  ) {}

  /**
   * Получить все темы
   */
  public async getParts(): Promise<Part[]> {
    const response = await this.axiosInstance.get("/parts");
    return dataToArrayClass(Part, response.data);
  }

  /**
   * Изменить тему
   */
  public async changePart(part: string): Promise<Part> {
    const response = await this.axiosInstance.put("/parts", { part });
    return dataToClass(Part, response.data);
  }
}

const partApi = new PartApi();

export default partApi;
