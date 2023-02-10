import { ref } from "vue";
import type Pki from "@/models/Pki";
import TextCell from "@/components/table/inputcell/TextCell.vue";

export const EditableCell = function (
    updatePromise: (row: Pki) => void,
    onEnterPromise: (row: Pki, evt: KeyboardEvent) => void,
    onTabPromise: (row: Pki) => void
) {
    return ({ rowData, column }: { rowData: any; column: any }) => {
        const onInput = (value: string) => {
            rowData[column.dataKey!] = value;
        };
        const onEnterEditMode = (): void => {
            rowData.editing = column.dataKey;
        };
        const onExitEditMode = (): void => {
            rowData.editing = null;
            updatePromise(rowData);
        };

        const onEnter = (evt: KeyboardEvent): void => {
            onExitEditMode();
            onEnterPromise(rowData, evt)
        };

        const input = ref();
        const setRef = (el: any) => {
            input.value = el;
            if (el) {
                el.focus();
            }
        };
        return rowData.editing === column.dataKey ? (
            <TextCell
                forwardRef={setRef}
                value={rowData[column.dataKey]}
                onChange={onExitEditMode}
                onBlur={onExitEditMode}
                onInput={onInput}
                onEnter={onEnter}
            />
        ) : (
            <div class="table-trigger" onDblclick={onEnterEditMode}>
                {rowData[column.dataKey]}
            </div>
        );
    };
};
