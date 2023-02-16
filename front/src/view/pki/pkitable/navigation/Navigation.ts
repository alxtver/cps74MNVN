interface Navigation {
    nextCellByEnter: (evt: KeyboardEvent) => void;
}
export default function Navigation(): Navigation {
    function nextCellByEnter(evt: KeyboardEvent): void {
        evt.preventDefault();
        const currentCell = evt.target as HTMLElement;
        const currentRow = currentCell.parentNode as HTMLElement;
        const cellIndex = Array.prototype.slice.call(currentRow.children).indexOf(currentCell);
        const nextRow = currentRow.nextSibling;
        if (!nextRow) {
            return;
        }
        const targetCell = Array.prototype.slice.call((nextRow as HTMLElement).children)[cellIndex];
        if (targetCell) {
            targetCell.focus();
        }
    }

    return { nextCellByEnter };
}
