import LoadingSpinner from "./components/LoadingSpinner";

const Loading = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="w-screen py-36 flex justify-center items-center"
    >
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
