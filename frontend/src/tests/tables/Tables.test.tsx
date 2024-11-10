import { render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import Tables from "@/app/tables/page";
import { getTablesAction } from "@/services/tables";
import { Table } from "@/types";

jest.mock('@/services/tables', () => ({
  getTablesAction: jest.fn().mockResolvedValue([]),
  getTableRequestAction: jest.fn().mockResolvedValue([])
}));

const mockGetTablesAction = getTablesAction as jest.MockedFunction<typeof getTablesAction>;

describe("Tables Component", () => {
  const tables: Table[] = [
    { id: "1", state: "Empty" },
    { id: "2", state: "Waiting" },
    { id: "3", state: "Attended" }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders title", async () => {
    await act(async () => {
      render(<Tables />);
    });
    expect(screen.getByRole("heading", { name: "Mapa de las mesas:" })).toBeInTheDocument();
  });

  test("renders a list of tables", async () => {
    mockGetTablesAction.mockResolvedValueOnce(tables);

    await act(async () => {
      render(<Tables />);
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Mesa/)).toHaveLength(tables.length);
    });
  });

  test("displays no tables when `getTablesAction` returns an empty list", async () => {
    mockGetTablesAction.mockResolvedValueOnce([]);

    await act(async () => {
      render(<Tables />);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Mesa/)).not.toBeInTheDocument();
    });
  });
});
