"use client"

import "./tables.css"
import { getTables } from "@/services/api";
import { Table } from "@/types";
import { useEffect, useState } from "react";
import { TableItem } from "./components/TableItem";

export default function Tables() {
    const [tables, setTables] = useState<Table[] | null>(null);

    useEffect(() => {
        getTables().then(setTables)
    },[])

    return (
      <div>
          Tables
          <div className="tables-container">
            {tables?.map( table => (
                <TableItem key={table.id} table={table} />
            ))}
          </div>
      </div>
    );
  }
  