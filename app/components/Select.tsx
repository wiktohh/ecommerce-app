interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  onChange: (value: string) => void;
  selectedValue: string;
  options: Option[];
  roundedFull?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  onChange,
  selectedValue,
  options,
  roundedFull,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="optionSelect">{label}</label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.value);
        }}
        id="optionSelect"
        className={`outline-none border-none ${
          roundedFull ? "rounded-full" : "rounded-md"
        } text-center cursor-pointer bg-gray-200 px-2 py-1 text-sm text-black font-semibold hover:bg-gray-300`}
      >
        {options.map((option, index) => (
          <option
            className="text-center"
            key={index}
            defaultValue={selectedValue}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
