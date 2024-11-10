export type Table = {
    id: string,
    state: TableState
}

export type TableState = "Empty" | "Waiting" | "Attended"

export interface MenuItem {
  id: string;
  description: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  items?: MenuItem[]
}

export interface MenuType {
  categories: Category[]
}

export interface UpdateMenuItemInput {
  id: string;
  description?: string;
  price?: number;
  categoryId?: string;
}

export interface UpdateCategoryInput {
  id: string;
  name: string;
}
