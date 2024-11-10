import { UpdateCategoryInput, UpdateMenuItemInput } from "@/types";
import api from "./api";

export const getMenuAction = async () => {
  try {
    const response = await api.post("/", {
      query: `
      query {
        menu {
          categories {
            id
            name
            items {
              id
              description
              price
            }
          }
        }
      }
    `,
    });

    if (!response) {
      throw new Error(`HTTP error! Status: ${response}`);
    }

    return await response.data.data.menu;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};

export const createCategoryAction = async (name: string) => {
  try {
    const response = await api.post("/", {
      query: `
        mutation CreateCategory($name: String!) {
          createCategory(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name: name,
      },
    });

    if (response.data.errors) {
      console.error('Error creating category:', response.data.errors);
      return null;
    }

    return response.data.data.createCategory;
  } catch (error) {
    console.error('Network or server error:', error);
    return null;
  }
};

export async function updateCategoryAction({ id, name }: UpdateCategoryInput) {
  try {
    const response = await api.post("/", {
      query: `
        mutation UpdateCategory($id: String!, $name: String!) {
          updateCategory(id: $id, name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        id,
        name,
      },
    });

    return response.data.data.updateCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    const response = await api.post("/", {
      query: `
        mutation DeleteCategory($id: String!) {
          deleteCategory(id: $id) {
            id
            name
          }
        }
      `,
      variables: {
        id,
      },
    });

    return response.data.data.deleteCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
}


export const createMenuItem = async (input: {description: string, price: number, categoryId: string}) => {
  try {
    const {description, price, categoryId} = input;
    const response = await api.post("/", {
      query: `
        mutation CreateMenuItem($description: String!, $price: Int!, $categoryId: String!) {
          createMenuItem(description: $description, price: $price, categoryId: $categoryId) {
            id
            description
            price
          }
        }
      `,
      variables: {
        description,
        price,
        categoryId,
      },
    });

    if (response.data.errors) {
      console.error('Error creating menu item:', response.data.errors);
      return null;
    }

    return response.data.data.createMenuItem;
  } catch (error) {
    console.error('Network or server error:', error);
    return null;
  }
};

export async function updateMenuItem({ id, description, price, categoryId }: UpdateMenuItemInput) {
  try {
    const response = await api.post("/", {
      query: `
        mutation UpdateMenuItem($id: String!, $input: MenuItemInput!) {
          updateMenuItem(id: $id, input: $input) {
            id
            description
            price
            categoryId
          }
        }
      `,
      variables: {
        id,
        input: { description, price, categoryId },
      },
    });
    return response.data.data.updateMenuItem;
  } catch (error) {
    console.error("Error updating menu item:", error);
    return null;
  }
}

export async function deleteMenuItem(id: string) {
  try {
    const response = await api.post("/", {
      query: `
        mutation DeleteMenuItem($id: String!) {
          deleteMenuItem(id: $id) {
            id
            description
            price
          }
        }
      `,
      variables: {
        id,
      },
    });
    return response.data.data.deleteMenuItem;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return null;
  }
}
