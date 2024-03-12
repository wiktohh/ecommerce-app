import {
  Field,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
            block 
            text-sm 
            font-medium 
            leading-6 
            text-gray-900
          "
      >
        {label}
      </label>
      <div className="mb-4">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`
              form-input
              block 
              w-full 
              rounded-md 
              border-0 
              py-1.5 
              px-3
              text-gray-900 
              shadow-sm 
              ring-1 
              ring-inset 
              ring-gray-300 
              placeholder:text-gray-400 
              focus:ring-2 
              focus:ring-inset 
              focus:outline-none
              focus:ring-sky-400 
              sm:text-sm 
              ${errors[id] && "focus:ring-rose-500"},
              ${disabled && "opacity-50 cursor-default"}
            `}
        />
      </div>
    </div>
  );
};

export default Input;
