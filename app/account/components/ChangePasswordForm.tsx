"use client";
import Button from "@/app/components/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    repeatCurrentPassword: "",
    newPassword: "",
  });

  const session = useSession();

  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.patch(
      "/api/change-password",
      {
        formData,
        email: session.data?.user?.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.data;

    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleButtonClick}>
      <div>
        <label
          htmlFor="current-password"
          className="block text-sm font-medium text-gray-700"
        >
          Aktualne hasło
        </label>
        <input
          value={formData.currentPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          id="current-password"
          type="password"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="repeat-current-password"
          className="block text-sm font-medium text-gray-700"
        >
          Powtórz aktualne hasło
        </label>
        <input
          value={formData.repeatCurrentPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, repeatCurrentPassword: e.target.value })
          }
          id="repeat-current-password"
          type="password"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="new-password"
          className="block text-sm font-medium text-gray-700"
        >
          Nowe hasło
        </label>
        <input
          value={formData.newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          id="new-password"
          type="password"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <Button fullWidth={true} type="submit">
          Zmień hasło
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
