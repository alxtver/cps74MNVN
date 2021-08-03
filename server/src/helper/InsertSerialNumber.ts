import { Unit } from '../interfaces/unit.interface';
import { Apkzi } from '../interfaces/apkzi.interface';
import { SystemCase } from '../system-cases/interfaces/system-case.interface';

class Insert {
  /**
   * Вводим серийник АПКЗИ
   * @param me - this
   * @param apkzi
   * @param systemCase - системный блок
   * @param unit - элемент который меняем
   * @param part - тема
   */
  public async apkzi(
    me,
    apkzi: Apkzi,
    systemCase,
    unit,
    part,
  ): Promise<{
    editableUnit: Unit;
    message: string;
    oldSystemCase: SystemCase;
  }> {
    const controllerNumber = unit.serial_number;
    const editableUnit: Unit = systemCase.systemCaseUnits.find(
      (systemCaseUnit) => systemCaseUnit.i === unit.i,
    );
    let message = '';
    // Если уже был серийный номер контроллера СЗИ
    const oldSerialNumber = editableUnit.serial_number;
    if (oldSerialNumber) {
      const oldApkzi = await me.apkzi.findOne({
        part: part,
        kontr_zav_number: oldSerialNumber,
      });
      if (oldApkzi) {
        oldApkzi.number_machine = '';
        oldApkzi.save();
      }
    }

    // если АПКЗИ был привязан к другой машине
    const oldNumberMachine = apkzi.number_machine;
    const oldSystemCase = await me.systemCaseModel.findOne({
      part: part,
      serialNumber: oldNumberMachine,
    });

    if (oldSystemCase) {
      for (const unit of oldSystemCase.systemCaseUnits) {
        if (unit.serial_number === controllerNumber) {
          unit.name = 'Н/Д';
          unit.serial_number = '';
          break;
        }
      }
      message = `Контроллер был привязан к системному блоку № ${oldSystemCase.serialNumber}`;
      oldSystemCase.markModified('systemCaseUnits');
      await oldSystemCase.save();
      // if (oldSystemCase.numberMachine) {
      //   const pc = await PC.findOne({
      //     part: part,
      //     serial_number: oldSystemCase.numberMachine,
      //   });
      //   pc.system_case_unit = oldSystemCase.systemCaseUnits;
      //   await pc.save();
      // }
    }
    // если все норм
    const controllerName = apkzi.kont_name;
    const controllerNameList = controllerName.split(' ');
    const arrEnd = controllerNameList.slice(-1).join('');
    const arrStart = controllerNameList.slice(0, -1);
    editableUnit.name = arrEnd; //меняем тип
    editableUnit.type = arrStart.join(' '); //меняем имя
    editableUnit.fdsi = 'ФДШИ.' + apkzi.fdsiKontr;
    editableUnit.serial_number = apkzi.kontr_zav_number;
    apkzi.number_machine = systemCase.serialNumber;

    await apkzi.save();

    systemCase.markModified('systemCaseUnits');
    await systemCase.save();
    return { editableUnit, message, oldSystemCase };
  }
}
const insert = new Insert();
export default insert;
