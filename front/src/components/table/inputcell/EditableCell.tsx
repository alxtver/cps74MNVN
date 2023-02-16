import type Pki from "@/models/Pki";
import TextCell from "@/components/table/inputcell/TextCell.vue";

export const EditableCell = function (
    updatePromise: (row: Pki) => void,
    onEnterPromise: (row: Pki, evt: KeyboardEvent) => void,
    onTabPromise: (row: Pki, evt: KeyboardEvent) => void
) {
    return ({ rowData, column }: { rowData: any; column: any }) => {
        const onChange = (value: string) => {
            rowData[column.dataKey!] = value;
            updatePromise(rowData);
        };
        const onEnterEditMode = (): void => {
            rowData.editing = column.dataKey;
        };
        const onExitEditMode = (): void => {
            rowData.editing = null;
        };

        const onEnter = (evt: KeyboardEvent): void => {
            evt.preventDefault();
            onExitEditMode();
            onEnterPromise(rowData, evt);
        };

        const onTab = (evt: KeyboardEvent): void => {
            evt.preventDefault();
            onExitEditMode();
            onTabPromise(rowData, evt);
        };

        return rowData.editing === column.dataKey ? (
            <TextCell
                value={rowData[column.dataKey]}
                onEnter={onEnter}
                onTab={onTab}
                onBlur={onExitEditMode}
                onChange={onChange}
            />
        ) : (
            <div
                class="table-trigger"
                style={{
                    width: "100%",
                    height: "100%",
                }}
                onDblclick={onEnterEditMode}
            >
                {rowData[column.dataKey]}
            </div>
        );
    };
};
