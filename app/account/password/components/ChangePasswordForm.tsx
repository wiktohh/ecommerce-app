"use client";
import Button from "@/app/components/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Input from "@/app/components/Input";
import { useState } from "react";
import { SubmitHandler, useForm, FieldValues, set } from "react-hook-form";

const ChangePasswordForm = () => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const session = useSession();

  const handleButtonClick: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const response = await axios.patch(
        "/api/change-password",
        {
          currentPassword: data["current-password"],
          repeatCurrentPassword: data["repeat-current-password"],
          newPassword: data["new-password"],
          email: session.data?.user?.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.data;
      console.log(responseData);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleButtonClick)}>
      <Input
        label="Aktualne hasło"
        id="current-password"
        type="password"
        register={register}
        required
        errors={errors}
      />
      <Input
        label="Powtórz aktualne hasło"
        id="repeat-current-password"
        type="password"
        register={register}
        required
        errors={errors}
      />
      <Input
        label="Nowe hasło"
        id="new-password"
        type="password"
        register={register}
        required
        errors={errors}
      />
      {error && (
        <div className="bg-red-200 border-1 rounded-md text-center border-red-700 p-2 text-red-700 max-w-full ">
          {error}
        </div>
      )}
      <div>
        <Button fullWidth={true} type="submit">
          Zmień hasło
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
