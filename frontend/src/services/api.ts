export const getTables = async () => {
    const response = await fetch("http://localhost:4000/graphql", {
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
    const { data } = await response.json();
    return data.tables;
};
  