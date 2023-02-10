import type { FunctionalComponent } from "vue";
import { ElInput, type InputInstance } from "element-plus";

export type SelectionCellProps = {
  value: string;
  intermediate?: boolean;
  onChange: (value: string) => void;
  onInput: (value: string) => void;
  onBlur: (evt: FocusEvent) => void;
  forwardRef: (el: InputInstance) => void;
};

export const TextInputCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  onChange,
  forwardRef,
  onInput,
  onBlur,
}) => {
  return (
    <ElInput
      ref={forwardRef as any}
      onInput={onInput}
      modelValue={value}
      onChange={onChange}
      onBlur={onBlur}
      size="small"
    />
  );
};
