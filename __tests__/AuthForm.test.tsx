import AuthForm from "@/app/auth/components/AuthForm";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import AuthContext from "@/app/context/AuthContext";
import { ReactNode } from "react";
import { demoAccount } from "@/app/auth/constants";

vi.mock("next-auth/react", () => ({
  useSession: () => [null, false],
  SessionProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (path: string) => {
      window.location.pathname = path;
    },
  }),
}));

describe("AuthForm", () => {
  beforeAll(() => {
    render(
      <AuthContext>
        <AuthForm />
      </AuthContext>
    );
  });
  test("renders correctly", () => {
    const titleElement = screen.getByText("Zaloguj się");
    expect(titleElement).toBeInTheDocument();

    const emailLabel = screen.getByText("Email");
    expect(emailLabel).toBeInTheDocument();

    const passwordLabel = screen.getByText("Hasło");
    expect(passwordLabel).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Zaloguj się" });
    expect(submitButton).toBeInTheDocument();
  });

  test("switches to register form", async () => {
    const loginButton = screen.getByRole("button", { name: "Zaloguj się" });
    expect(loginButton).toBeInTheDocument();

    const redirectElementToRegister = screen.getByText("Stwórz konto");
    fireEvent.click(redirectElementToRegister);

    await waitFor(() => {
      const registerButton = screen.getByRole("button", {
        name: "Zarejestruj się",
      });
      expect(registerButton).toBeInTheDocument();
    });
  });

  test("load demo account", async () => {
    const demoButton = screen.getByRole("button", { name: "Wersja demo" });
    fireEvent.click(demoButton);

    await waitFor(() => {
      const emailInput = screen.getByLabelText("Email");
      expect(emailInput).toHaveValue(demoAccount.email);
      const passwordInput = screen.getByLabelText("Hasło");
      expect(passwordInput).toHaveValue(demoAccount.password);
    });
  });
});
