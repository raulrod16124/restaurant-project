import api from "./api";

export const getMenu = async () => {
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