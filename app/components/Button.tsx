type ButtonType = "submit" | "reset" | "button" | undefined;

interface ButtonProps {
  type?: ButtonType;
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      className={`${
        fullWidth && "w-full"
      } rounded-lg text-white flex justify-center items-center px-4 py-2 font-semibold bg-orange-400 hover:bg-orange-500 focus-visible:outline-orange-600`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
