interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="w-full max-w-7xl mx-auto">{children}</div>;
};

export default Wrapper;
