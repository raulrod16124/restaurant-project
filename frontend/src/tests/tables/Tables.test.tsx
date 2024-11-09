import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Tables from "@/app/tables/page";

describe("testing Tables component", () => {
    test("should render the tables title", () => {
        render(<Tables />)
        const tablesTitle = screen.getByText("Mapa de las mesas:");
        expect(tablesTitle).toBeInTheDocument()
    })
})