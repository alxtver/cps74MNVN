import alex from "@/helper/Alex";

class Table {

    /**
     * Получить строку
     * @param me
     * @param index
     */
    public getNextRow(me, index: number): HTMLElement {
        return me.$el.children[1].children[0].children[2].children[index];
    }

    /**
     * Получить ячейку
     * @param me
     * @param index
     * @private
     */
    public getNextCell(me, index: number): HTMLElement {
        const nextRow = this.getNextRow(me, index)
        const nextDialog = nextRow.children[4].children[0] as HTMLElement;
        return nextDialog.children[0].children[0] as HTMLElement;
    }

    /**
     * Получить текст ячейки
     * @param me
     * @param index
     */
    public getNextCellText(me, index: number): string {
        return this.getNextCell(me, index).innerText;
    }

    /**
     * Получить тип ПКИ из следующей строки
     * @param me
     * @param index
     */
    public getNextType(me, index: number): string {
        const td = this.getNextRow(me, index).children[1] as HTMLElement
        return td.innerText
    }

    /**
     * Переход на следующую ячейку
     * @param me - this компонента
     * @param props - переданные значения из таблицы
     * @param units - комплектующие ПЭВМ или Системного блока
     * @param serialNumber серийный номер машины или системного блока для сравнния
     * @param sound - есть ли звук
     * @private
     */
    public goToNextCell(me, props, units, serialNumber, sound): void {
        if (props.index + 1 >= units.length) {
            me.selectedRow = -1;
            return;
        }
        let idx: number = props.index + 1;
        let nextCellText = this.getNextCellText(me, idx)
        while (
            /[Бб].?[Нн]/g.test(nextCellText) ||
            nextCellText === serialNumber
            ) {
            idx++;
            nextCellText = this.getNextCellText(me, idx)
        }
        table.getNextCell(me, idx).click();
        alex.say(this.getNextType(me, idx), 1.2, sound);
    }
}
const table = new Table();
export default table;
