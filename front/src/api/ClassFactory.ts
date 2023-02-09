import { plainToClass } from "class-transformer";

export declare type ClassType<T> = new (...args: any[]) => T;
/**
 * Трансформирует данные с сервера в СПИСОК POJO объектов
 * @param clazz
 * @param data
 * @returns {any}
 */
export function dataToArrayClass<T, V>(clazz: ClassType<T>, data: V[]): T[] {
  const result = plainToClass(clazz, data);
  if (Array.isArray(result)) {
    return result;
  }
  return [result];
}

/**
 * Трансформирует данные с сервера в POJO объект
 * @param clazz
 * @param data
 * @returns {any}
 */
export function dataToClass<T, V>(clazz: ClassType<T>, data: V[]): T {
  const result = plainToClass(clazz, data);
  if (Array.isArray(result)) {
    return result[0];
  }
  return result;
}
