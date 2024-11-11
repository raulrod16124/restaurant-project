import ItemForm from "@/app/menu/components/ItemForm";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ItemForm Component", () => {
  test("renders initial data", () => {
    const initialData = { id: "1", description: "Pizza", price: 10 };
    
    render(<ItemForm onSave={jest.fn()} initialData={initialData} />);
    
    const descriptionInput = screen.getByPlaceholderText("Descripción del producto");
    const priceInput = screen.getByPlaceholderText("Precio del producto");
    
    expect(descriptionInput).toHaveValue("Pizza");
    expect(priceInput).toHaveValue(10);
  });

  test("updates input fields when typing", () => {
    render(<ItemForm onSave={jest.fn()} />);
    
    const descriptionInput = screen.getByPlaceholderText("Descripción del producto");
    const priceInput = screen.getByPlaceholderText("Precio del producto");

    fireEvent.change(descriptionInput, { target: { value: "Hamburguesa" } });
    fireEvent.change(priceInput, { target: { value: 15 } });

    expect(descriptionInput).toHaveValue("Hamburguesa");
    expect(priceInput).toHaveValue(15);
  });

  test("calls onSave with correct values when form is submitted", () => {
    const onSave = jest.fn();
    render(<ItemForm onSave={onSave} />);

    const descriptionInput = screen.getByPlaceholderText("Descripción del producto");
    const priceInput = screen.getByPlaceholderText("Precio del producto");
    const submitButton = screen.getByText("Guardar Producto");

    fireEvent.change(descriptionInput, { target: { value: "Tacos" } });
    fireEvent.change(priceInput, { target: { value: 12 } });

    fireEvent.click(submitButton);

    expect(onSave).toHaveBeenCalledWith({
      id: expect.any(String),
      description: "Tacos",
      price: 12,
    });
  });

  test("clears input fields after form submission", () => {
    const onSave = jest.fn();
    render(<ItemForm onSave={onSave} />);

    const descriptionInput = screen.getByPlaceholderText("Descripción del producto");
    const priceInput = screen.getByPlaceholderText("Precio del producto");
    const submitButton = screen.getByText("Guardar Producto");

    fireEvent.change(descriptionInput, { target: { value: "Nachos" } });
    fireEvent.change(priceInput, { target: { value: 8 } });

    fireEvent.click(submitButton);
    
    expect(descriptionInput).toHaveValue("");
    expect(priceInput).toHaveValue(null);
  });

  test("does not submit form if price is less than 1", () => {
    const onSave = jest.fn();
    render(<ItemForm onSave={onSave} />);

    const descriptionInput = screen.getByPlaceholderText("Descripción del producto");
    const priceInput = screen.getByPlaceholderText("Precio del producto");
    const submitButton = screen.getByText("Guardar Producto");

    fireEvent.change(descriptionInput, { target: { value: "Tacos" } });
    fireEvent.change(priceInput, { target: { value: 0 } });

    fireEvent.click(submitButton);

    const errorText = screen.getByText("El precio debe ser mayor de 0");

    expect(onSave).not.toHaveBeenCalled();
    expect(errorText).toBeInTheDocument();
  });
});
