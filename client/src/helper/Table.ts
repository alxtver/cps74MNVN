import alexa from '@/helper/Alexa';

class Table {
    /**
     * Получить строку
     * @param me
     * @param index
     * @param route
     */
    public getNextRow(me, index: number, route: string): HTMLElement {
        if (route === '/assembly') {
            return me.$el.children[0].children[0].children[2].children[index];
        }
        return me.$el.children[1].children[0].children[2].children[index];
    }

    /**
     * Получить ячейку
     * @param me
     * @param index
     * @param route
     * @private
     */
    public getNextCell(me, index: number, route: string): HTMLElement {
        const nextRow = this.getNextRow(me, index, route);
        const nextDialog =
            route === '/assembly'
                ? nextRow.children[3].children[0]
                : nextRow.children[4].children[0];
        return nextDialog.children[0].children[0] as HTMLElement;
    }

    /**
     * Получить текст ячейки
     * @param me
     * @param index
     * @param route
     */
    public getNextCellText(me, index: number, route): string {
        return this.getNextCell(me, index, route).innerText;
    }

    /**
     * Получить тип ПКИ из следующей строки
     * @param me
     * @param index
     * @param route
     */
    public getNextType(me, index: number, route: string): string {
        let td: HTMLElement | null;
        if (route === '/assembly') {
            td = this.getNextRow(me, index, route).children[0] as HTMLElement;
        } else {
            td = this.getNextRow(me, index, route).children[1] as HTMLElement;
        }
        return td.innerText;
    }

    /**
     * Переход на следующую ячейку
     * @param me - this компонента
     * @param props - переданные значения из таблицы
     * @param units - комплектующие ПЭВМ или Системного блока
     * @param serialNumber серийный номер машины или системного блока для сравнния
     * @param sound - есть ли звук
     * @param route - роут
     * @private
     */
    public goToNextCell(
        me,
        props,
        units,
        serialNumber,
        sound,
        route: string
    ): void {
        if (props.index + 1 >= units.length) {
            me.selectedRow = -1;
            return;
        }
        let idx: number = props.index + 1;
        let nextCellText = this.getNextCellText(me, idx, route);
        while (
            /[Бб].?[Нн]/g.test(nextCellText) ||
            nextCellText === serialNumber
        ) {
            idx++;
            nextCellText = this.getNextCellText(me, idx, route);
        }
        table.getNextCell(me, idx, route).click();
        alexa.say(this.getNextType(me, idx, route), 1.2, sound);
    }

    /**
     * Подсвечиваем строки в таблице у которых есть 'Н/Д'
     * @param table
     */
    public painting(table: any): void {
        if (!table) {
            return;
        }
        const element = table.$el as HTMLElement;
        const rows = element.querySelectorAll('tr');
        for (const row of rows) {
            const cells = row.querySelectorAll('td');
            for (const cell of cells) {
                row.classList.remove('highlighting');
                if (cell.innerHTML === 'Н/Д') {
                    row.classList.add('highlighting');
                    break;
                }
            }
        }
    }
}
const table = new Table();
export default table;
