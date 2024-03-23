import { FcCancel } from "react-icons/fc";

const CancelPaymentPage = () => {
  return (
    <div className="flex py-24 flex-col justify-start items-center">
      <FcCancel className="text-7xl text-red-500" />
      <h2 className="text-5xl text-red-500">Anulowano platność</h2>
    </div>
  );
};

export default CancelPaymentPage;
