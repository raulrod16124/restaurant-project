import api from "./api";

export const getTables = async () => {
    try{
      const response = await api.post("/", {
          query: `
              query {
                  tables {
                      id
                      state
                  }
              }
          `,
      });

      if (!response) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
    
      return await response.data.data.tables;
    } catch (error) {
      console.error("Error fetching tables:", error);
      throw error;
    }
  };