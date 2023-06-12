type TextFieldProps = {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (event: any) => void;
  className?: string;
  name?: string;
  defaultValue?: string;
};

export function TextField({
  type,
  placeholder,
  value,
  onChange,
  className,
  name,
  defaultValue,
}: TextFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-b border-gray-400 focus:border-amber-800 py-2 px-1 outline-none ${className}`}
      name={name}
      defaultValue={defaultValue}
    />
  );
}
