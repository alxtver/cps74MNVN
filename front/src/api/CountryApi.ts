import type { AxiosInstance } from "axios";
import { axiosFactory } from "@/api/AxiosFactory";
import { dataToArrayClass, dataToClass } from "@/api/ClassFactory";
import Country from "@/models/Country";

class CountryApi {
  constructor(
    readonly axiosInstance: AxiosInstance = axiosFactory.axiosInstance
  ) {}

  /**
   * Получить все страны
   */
  public async getAllCountries(): Promise<Country[]> {
    const response = await this.axiosInstance.get(`/country`);
    return dataToArrayClass(Country, response.data);
  }

  /**
   * Создать страну
   * @param country
   */
  public async createCountry(country: string): Promise<Country> {
    const response = await this.axiosInstance.post(`/country`, country);
    return dataToClass(Country, response.data);
  }

  /**
   * Редактировать
   * @param country
   */
  public async updateCountry(country: Country): Promise<Country> {
    const response = await this.axiosInstance.put(`/country`, country);
    return dataToClass(Country, response.data);
  }

  /**
   * Удалить
   * @param countryId
   */
  public async deleteCountry(countryId: string): Promise<Country> {
    const response = await this.axiosInstance.delete(`/country/${countryId}`);
    return dataToClass(Country, response.data);
  }
}

const countryApi = new CountryApi();

export default countryApi;
