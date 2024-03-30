import Footer from "@/app/components/Footer/Footer";
import { screen, render } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Footer", () => {
  test("renders correctly", () => {
    render(<Footer />);
    const titleElement = screen.getByText("FoodieMarket");
    expect(titleElement).toBeInTheDocument();

    const locationElement = screen.getByText("Gliwice, PL");
    expect(locationElement).toBeInTheDocument();

    const socialIcons = screen.getAllByTestId("social-icon");
    expect(socialIcons).toHaveLength(3);

    const sections = [
      { title: "Sklep", links: ["Karty podarunkowe", "Mapa", "Kontakt"] },
      { title: "Sprzedaż", links: ["Zespoły", "Forum", "Partnerzy"] },
      {
        title: "Informacje",
        links: ["Polityka prywatności", "Regulamin", "Cookies"],
      },
      { title: "Pomoc", links: ["FAQ", "Dokumentacja"] },
    ];

    sections.forEach((section) => {
      const sectionTitle = screen.getByText(section.title);
      expect(sectionTitle).toBeInTheDocument();

      section.links.forEach((link) => {
        const linkElement = screen.getByText(link);
        expect(linkElement).toBeInTheDocument();
      });
    });

    const currentYear = new Date().getFullYear().toString();
    const currentYearSection = screen.getByTestId("current-year-section");
    expect(currentYearSection).toBeInTheDocument();
    expect(currentYearSection?.textContent?.includes(currentYear)).toBe(true);
  });
});
