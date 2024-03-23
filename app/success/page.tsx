import { IoMdCheckmarkCircle } from "react-icons/io";
const SuccessPaymentPage = () => {
  return (
    <div className="flex py-24 flex-col justify-start items-center">
      <IoMdCheckmarkCircle className="text-7xl text-green-500" />
      <h2 className="text-5xl text-green-500">Płatność zaakceptowana</h2>
    </div>
  );
};

export default SuccessPaymentPage;
