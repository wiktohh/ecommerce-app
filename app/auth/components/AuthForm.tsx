"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Variant = "login" | "register";

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "login") {
      signIn("credentials", { ...data, redirect: false })
        .then((cb) => {
          if (cb?.error) {
            setError(cb.error);
          } else if (cb?.ok) {
            router.back();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((cb) => {
          if (cb?.error) {
            setError(cb.error);
          } else if (cb?.ok) {
            router.back();
          }
        })
        .catch((err) => {
          setError(err.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const toggleVariant = () =>
    setVariant(variant === "login" ? "register" : "login");

  return (
    <div className="mx-auto w-full max-w-md bg-white px-4 py-8 shadow rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-xl font-semibold">
          {variant == "login"
            ? "Zaloguj się do swojego konta"
            : "Zarejestruj się"}
        </h1>
        {variant === "register" && (
          <Input
            label="Imię"
            id="name"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
        )}
        <Input
          label="Email"
          id="email"
          register={register}
          errors={errors}
          required
          type="email"
          disabled={isLoading}
        />
        <Input
          label="Hasło"
          id="password"
          register={register}
          errors={errors}
          required
          type="password"
          disabled={isLoading}
        />
        {error && (
          <div className="bg-red-200 border-1 rounded-md text-center border-red-700 p-2 text-red-700 max-w-full mb-4 ">
            {error}
          </div>
        )}
        <Button type="submit" fullWidth={true} disabled={isLoading}>
          {variant === "login" ? "Zaloguj się" : "Zarejestruj się"}
        </Button>
        <div className="mt-3 flex justify-center space-x-2">
          <p>
            {variant === "login"
              ? "Nie masz jeszcze konta?"
              : "Masz już konto na naszej platformie?"}
          </p>
          <p className="cursor-pointer underline" onClick={toggleVariant}>
            {variant === "login" ? "Stwórz konto" : "Zaloguj się"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
