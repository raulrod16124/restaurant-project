import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

describe("testing Home component", () => {
    test("should render the logo image", () => {
        render(<Home />)
        const homeLogo = screen.getByRole("img");
        expect(homeLogo).toBeInTheDocument()
    })
    test("should render home title", () => {
        render(<Home />)
        const homeTitle = screen.getByText("Restaurant");
        expect(homeTitle).toBeInTheDocument()
    })
    test("should render the Tables Link", () => {
        render(<Home />)
        const tablesLink = screen.getByText("Tables");
        expect(tablesLink).toBeInTheDocument()
    })
    test("should render the Menu Link", () => {
        render(<Home />)
        const menuLink = screen.getByText("Menu");
        expect(menuLink).toBeInTheDocument()
    })
})