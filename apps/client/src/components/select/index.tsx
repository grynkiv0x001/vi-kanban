import * as styles from './select.styles';

type Option = {
  value: string;
  label: string;
}

type SelectProps = {
  value?: string;
  options?: Array<Option>;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const Select = ({ value, onChange, disabled, options }: SelectProps) => {
  return (
    <select
      css={styles.select}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {options?.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
