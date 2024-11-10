import { render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Table, TableRequestItem } from "@/types";
import { getTableRequestAction } from "@/services/tables";
import { TableItem } from "@/app/tables/components/TableItem";

jest.mock('@/services/tables', () => ({
  getTableRequestAction: jest.fn(),
}));

const mockGetTableRequestAction = getTableRequestAction as jest.MockedFunction<typeof getTableRequestAction>;

describe("TableItem Component", () => {
    const table: Table = {
      id: "1",
      state: "Waiting",
    };

    const tableRequest: TableRequestItem[] = [
      { description: "Pizza", price: 10 },
      { description: "Pasta", price: 8 },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("renders table image and text based on table state", () => {
        render(<TableItem table={{ ...table, state: "Empty" }} />);
        expect(screen.getByText("Mesa libre")).toBeInTheDocument();

        render(<TableItem table={{ ...table, state: "Waiting" }} />);
        expect(screen.getByText("Mesa ocupada")).toBeInTheDocument();

        render(<TableItem table={{ ...table, state: "Attended" }} />);
        expect(screen.getByText("Mesa atendida")).toBeInTheDocument();
    });

    test("displays table requests and total price when there are requests", async () => {
        mockGetTableRequestAction.mockResolvedValueOnce(tableRequest);

        await act(async () => {
            render(<TableItem table={table} />);
        });

        await waitFor(() => {
            expect(screen.getByText("Pizza:")).toBeInTheDocument();
            expect(screen.getByText("10€")).toBeInTheDocument();
            expect(screen.getByText("Pasta:")).toBeInTheDocument();
            expect(screen.getByText("8€")).toBeInTheDocument();
        });

        expect(screen.getByText("Precio total:")).toBeInTheDocument();
        expect(screen.getByText("18€")).toBeInTheDocument();
    });

    test("displays 'No hay pedidos' when there are no requests", async () => {
        mockGetTableRequestAction.mockResolvedValueOnce([]);

        await act(async () => {
            render(<TableItem table={table} />);
        });

        await waitFor(() => {
            expect(screen.getByText("No hay pedidos")).toBeInTheDocument();
        });
    });
});
