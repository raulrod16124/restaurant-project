const API_URL = 'http://localhost:4000/graphql';

export const getTables = async () => {
  try{
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
                tables {
                    id
                    state
                }
            }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const { data } = await response.json();
    return data.tables;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

export const getMenu = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.data.menu;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};