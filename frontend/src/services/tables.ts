import { Table } from "@/types";
import api from "./api";

export const getTablesAction = async () => {
  try {
    const response = await api.post('/', {
      query: `
        query {
          tables {
            id
            state
          }
        }
      `,
    });
    return response.data.data.tables;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

export const getTableRequestAction = async (tableId: string) => {
  try {
    const response = await api.post('/', {
      query: `
        query GetTableRequest {
          tables {
            id
            request {
              id
              description
              price
            }
          }
        }
      `,
      variables: {
        tableId,
      },
    });
    return response.data.data.tables.find((table: Table) => table.id === tableId)?.request || [];
  } catch (error) {
    console.error("Error fetching table request:", error);
    throw error;
  }
};
