import Button from "@/app/components/Button";
import Wrapper from "@/app/components/Wrapper";
import AccountMenu from "../components/AccountMenu";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <Wrapper>
      <div className="py-12 flex gap-12">
        <AccountMenu />
        <div>
          <h2 className="text-2xl font-bold mb-6">Zmień hasło</h2>
          <div className="max-w-md mx-auto">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ChangePasswordPage;
