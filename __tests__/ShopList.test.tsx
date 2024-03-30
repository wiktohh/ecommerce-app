import { test, expect, beforeAll, describe } from "vitest";
import ShopList from "@/app/components/ShopList/ShopList";
import { screen, render } from "@testing-library/react";
import React from "react";

describe("ShopList", () => {
  beforeAll(() => {
    render(<ShopList />);
  });
  test("renders without crashing", () => {
    const headingElements = screen.getAllByTestId("shop-list-header");
    expect(headingElements).not.toBeNull();
    for (const headingElement of headingElements) {
      expect(headingElement.textContent).toBe("Dostępne sklepy");
    }
  });
  test("renders 3 shops", () => {
    const shopElements = screen.getAllByTestId("shop");
    expect(shopElements).toHaveLength(3);
  });
  test("renders correct shop names in links", () => {
    const shopLinks = screen.getAllByRole("link");
    const shopNames = ["biedronka", "lidl", "kaufland"];
    shopLinks.forEach((link, index) => {
      expect(link.getAttribute("href")).toBe(
        `/products?shop=${shopNames[index]}`
      );
    });
  });
});
