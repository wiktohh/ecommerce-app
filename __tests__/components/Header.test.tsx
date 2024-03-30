import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Header from "@/app/components/Header/Header";
import AuthContext from "@/app/context/AuthContext";
import StoreProvider from "@/app/providers/StoreProvider";
import React, { ReactNode } from "react";
import axios from "axios";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (path: string) => {
      window.location.pathname = path;
    },
  }),
}));

vi.mock("axios");

vi.mock("react-redux", () => ({
  Provider: ({ children }: { children: ReactNode }) => <>{children}</>, // Dodaj Provider
  useSelector: () => [
    { id: 1, name: "Item 1", quantity: 1 },
    { id: 2, name: "Item 2", quantity: 2 },
  ],
  useDispatch: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  useSession: () => [null, false],
  signOut: vi.fn(),
  SessionProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("Header", () => {
  beforeAll(() => {
    render(
      <AuthContext>
        <StoreProvider>
          <Header />
        </StoreProvider>
      </AuthContext>
    );
  });

  test("renders correctly", async () => {
    await waitFor(() => {
      const titleElement = screen.getByText("FoodieMarket");
      expect(titleElement).toBeInTheDocument();
    });

    const cart = screen.getByTestId("cart-button");
    expect(cart).toBeInTheDocument();

    const searchbar = screen.getByTestId("searchbar");
    expect(searchbar).toBeInTheDocument();

    const signInButton = screen.getByRole("link", { name: "Zaloguj się" });
    expect(signInButton).toBeInTheDocument();
  });
  test("opens mobile menu when hamburger menu is clicked", () => {
    const hamburgerMenu = screen.getByTestId("mobile-menu");
    fireEvent.click(hamburgerMenu);
    const closeIcon = screen.getByTestId("close-mobile-menu");
    expect(closeIcon).toBeInTheDocument();
  });
  test("closes mobile menu when close icon is clicked", () => {
    const closeIcon = screen.getByTestId("close-mobile-menu");
    fireEvent.click(closeIcon);
    const hamburgerMenu = screen.getByTestId("mobile-menu");
    expect(hamburgerMenu).toBeInTheDocument();
  });
  test("show cart quantity", async () => {
    await waitFor(() => {
      const cartBadge = screen.getByText("3");
      expect(cartBadge).toBeInTheDocument();
    });
  });
  test("show navigation links", () => {
    const navLinks = screen.getAllByRole("link");

    // 7 categories links + 1 link to home + 1 link to cart + 1 link to auth
    expect(navLinks).toHaveLength(10);
  });
  test("displays minimum character warning when query length is less than 3", async () => {
    const input = screen.getByPlaceholderText("Wyszukaj produkt...");
    fireEvent.change(input, { target: { value: "ab" } });
    await waitFor(() => {
      const warningMessage = screen.getByText("Wpisz co najmniej 3 litery");
      expect(warningMessage).toBeInTheDocument();
    });
  });

  test("displays searched products", async () => {
    const mockAxiosPost = vi.fn().mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "Apple",
          price: 2.5,
          image: "/apple.jpg",
        },
        {
          id: 2,
          name: "Banana",
          price: 3.5,
          image: "/banana.jpg",
        },
      ],
    });
    axios.post = mockAxiosPost;

    const input = screen.getByPlaceholderText("Wyszukaj produkt...");
    fireEvent.change(input, { target: { value: "apple" } });

    await waitFor(() => {
      const products = screen.getAllByTestId("searched-item");
      expect(products).toHaveLength(2);
    });
  });
});
