interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="w-full xl:max-w-7xl lg:max-w-5xl md:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Wrapper;
