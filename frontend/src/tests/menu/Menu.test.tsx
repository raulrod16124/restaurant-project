import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { getMenuAction, createCategoryAction, createMenuItem, deleteCategoryAction, deleteMenuItem, updateCategoryAction } from "@/services/menu";
import { Category, MenuItem, MenuType } from "@/types";
import Menu from "@/app/menu/page";

jest.mock("@/services/menu", () => ({
  getMenuAction: jest.fn(),
  createCategoryAction: jest.fn(),
  createMenuItem: jest.fn(),
  deleteCategoryAction: jest.fn(),
  deleteMenuItem: jest.fn(),
  updateCategoryAction: jest.fn(),
}));

describe("Menu Component", () => {
    const mockData: MenuType = {
        categories: [
        { id: "1", name: "Beverages", items: [{ id: "item1", description: "Coca Cola", price: 2 }] },
        { id: "2", name: "Snacks", items: [{ id: "item2", description: "Chips", price: 1 }] },
        ],
    };

    beforeEach(() => {
        (getMenuAction as jest.Mock).mockResolvedValue(mockData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", async () => {
        (getMenuAction as jest.Mock).mockResolvedValueOnce(undefined);
        await act(async () => {
            render(<Menu />);
        });
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("displays menu categories and items after loading", async () => {
        await act(async () => {
            render(<Menu />);
        });
        render(<Menu />);
        await waitFor(() => {
            expect(screen.getByText("Beverages")).toBeInTheDocument();
            expect(screen.getByText("Coca Cola - 2€")).toBeInTheDocument();
            expect(screen.getByText("Snacks")).toBeInTheDocument();
            expect(screen.getByText("Chips - 1€")).toBeInTheDocument();
        });
    });

    test("adds a new category", async () => {
        const newCategory: Category = { id: "3", name: "Desserts", items: [] };
        (createCategoryAction as jest.Mock).mockResolvedValue(newCategory);

        await act(async () => {
            render(<Menu />);
        });

        await waitFor(() => screen.getByText("Snacks"));

        fireEvent.click(screen.getByText(/Añadir nueva categoría/i));
        const input = screen.getByPlaceholderText(/Nombre de la categoría/i);
        fireEvent.change(input, { target: { value: "Desserts" } });
        fireEvent.click(screen.getByText(/Guardar/i));
        
        await waitFor(() => {
            expect(createCategoryAction).toHaveBeenCalledWith("Desserts");
        });
    });

    test("edits an existing category", async () => {
        (updateCategoryAction as jest.Mock).mockResolvedValue(true);

        await act(async () => {
            render(<Menu />);
        });
        await waitFor(() => screen.getByText("Beverages"));
        fireEvent.click(screen.getAllByRole("button")[1]);

        const input = screen.getByDisplayValue("Beverages");
        fireEvent.change(input, { target: { value: "Soft Drinks" } });
        fireEvent.click(screen.getByText(/Guardar/i));

        await waitFor(() => {
            expect(updateCategoryAction).toHaveBeenCalledWith({ id: "1", name: "Soft Drinks" });
        });
    });

    test("deletes a category", async () => {
        (deleteCategoryAction as jest.Mock).mockResolvedValue(true);

        await act(async () => {
            render(<Menu />);
        });

        await waitFor(() => screen.getByText("Beverages"));
        fireEvent.click(screen.getAllByRole("button")[0]);

        await waitFor(() => {
            expect(deleteCategoryAction).toHaveBeenCalledWith("1");
        });
    });

    test("adds a new item to a category", async () => {
        const newItem: MenuItem = { id: "item3", description: "Cake", price: 2 };
        (createMenuItem as jest.Mock).mockResolvedValue(newItem);

        await act(async () => {
            render(<Menu />);
        });
        await waitFor(() => screen.getByText("Snacks"));
        fireEvent.click(screen.getAllByRole("button")[9]);

        const descInput = screen.getByPlaceholderText(/Descripción/i);
        const priceInput = screen.getByPlaceholderText(/Precio/i);
        fireEvent.change(descInput, { target: { value: "Cake" } });
        fireEvent.change(priceInput, { target: { value: "2" } });
        fireEvent.click(screen.getByText(/Guardar/i));

        await waitFor(() => {
            expect(createMenuItem).toHaveBeenCalledWith({ description: "Cake", price: 2, categoryId: "2" });
        });
    });

    test("deletes an item from a category", async () => {
        (deleteMenuItem as jest.Mock).mockResolvedValue(true);

        await act(async () => {
            render(<Menu />);
        });
        await waitFor(() => screen.getByText("Coca Cola - 2€"));
        fireEvent.click(screen.getAllByRole("button")[2]);

        await waitFor(() => {
            expect(deleteMenuItem).toHaveBeenCalledWith("item1");
        });
    });
});
