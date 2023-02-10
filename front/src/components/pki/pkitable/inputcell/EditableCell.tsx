import { ref } from 'vue'
import { TextInputCell } from '@/components/pki/pkitable/inputcell/TextInputCell'
import type Pki from '@/models/Pki'

export const EditableCell = function (updatePromise: (row: Pki) => void) {
    return ({ rowData, column }: { rowData: any; column: any }) => {
        const onInput = (value: string) => {
            rowData[column.dataKey!] = value
        }
        const onEnterEditMode = (): void => {
            rowData.editing = column.dataKey
        }
        const onExitEditMode = (): void => {
            rowData.editing = null
            updatePromise(rowData)
        }
        const input = ref()
        const setRef = (el: any) => {
            input.value = el
            if (el) {
                el.focus?.()
            }
        }
        return rowData.editing === column.dataKey ? (
            <TextInputCell
                forwardRef={setRef}
                value={rowData[column.dataKey]}
                onChange={onExitEditMode}
                onBlur={onExitEditMode}
                onInput={onInput}
            />
        ) : (
            <div
                class="table-v2-inline-editing-trigger"
                onClick={onEnterEditMode}
            >
                {rowData[column.dataKey]}
            </div>
        )
    }
}
