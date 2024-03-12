interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  onChange: (value: string) => void;
  selectedValue: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  onChange,
  selectedValue,
  options,
}) => {
  return (
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
      }}
      id="optionSelect"
      className="outline-none border-none rounded-full text-center cursor-pointer bg-gray-200 px-2 py-1 text-sm text-black font-semibold hover:bg-gray-300"
    >
      {options.map((option, index) => (
        <option
          key={index}
          selected={selectedValue === option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
