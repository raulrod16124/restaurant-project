import CategoryForm from '@/app/menu/components/CategoryForm';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

describe('CategoryForm Component', () => {
    afterEach(cleanup);

    test('renders CategoryForm with initial state', () => {
        render(<CategoryForm onSave={jest.fn()} />);

        expect(screen.getByPlaceholderText(/Nombre de la categoría/i)).toBeInTheDocument();
        expect(screen.getByText(/Guardar Categoría/i)).toBeInTheDocument();
    });

    test('input field updates when typing', () => {
        render(<CategoryForm onSave={jest.fn()} />);

        const input = screen.getByPlaceholderText(/Nombre de la categoría/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Desserts' } });

        expect(input.value).toBe('Desserts');
    });

    test('calls onSave with input value when form is submitted', () => {
        const onSaveMock = jest.fn();
        render(<CategoryForm onSave={onSaveMock} />);

        const input = screen.getByPlaceholderText(/Nombre de la categoría/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Desserts' } });

        const button = screen.getByText(/Guardar Categoría/i);
        fireEvent.click(button);

        expect(onSaveMock).toHaveBeenCalledWith('Desserts');
    });

    test('resets the input after form submission', () => {
        const onSaveMock = jest.fn();
        render(<CategoryForm onSave={onSaveMock} />);

        const input = screen.getByPlaceholderText(/Nombre de la categoría/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Desserts' } });

        const button = screen.getByText(/Guardar Categoría/i);
        fireEvent.click(button);

        expect(input.value).toBe('');
    });

    test('renders with initial data', () => {
        render(<CategoryForm onSave={jest.fn()} initialData="Beverages" />);

        const input = screen.getByPlaceholderText(/Nombre de la categoría/i) as HTMLInputElement;
        expect(input.value).toBe('Beverages');
    });
});
