import { Injectable } from '@nestjs/common';
import { Pki } from '../interfaces/pki.interface';

@Injectable()
export class SnModify {
  /**
   * Ищем серийник который мог быть модифицирован на фронте
   * @param serialNumber - серийник по которому ищем
   * @param part - тема
   * @param me
   */
  public async reModify(serialNumber, part, me): Promise<Pki> {
    //перевод русских букв в английские

    // проверка на сидюки
    let pki = await me.pki.findOne({
      part: part,
      serial_number: serialNumber.split(' ').reverse().join(' '),
    });
    if (pki) {
      return pki;
    }

    // проверка на левый серийник Gigabyte
    const regex = /SN\w*/g;
    if (serialNumber.match(regex)) {
      pki = await me.pki.findOne({
        part: part,
        serial_number: serialNumber.match(regex)[0],
      });
      if (pki) {
        return pki;
      }
    }

    // серийники APC удаление буквы S
    pki = await me.pki.findOne({
      part: part,
      serial_number: serialNumber.substr(1),
    });
    if (pki) {
      return pki;
    }

    // серийники Canon
    pki = await me.pki.findOne({
      part: part,
      serial_number: serialNumber.substring(3, 12),
    });
    if (pki) {
      return pki;
    }
    return;
  }
}

const modify = new SnModify();
export default modify;
